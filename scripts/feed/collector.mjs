import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { getFeedLlmProviderInfo } from "./llm-provider.mjs";
import {
  QUALITY,
  assessContentQuality,
  buildTags,
  canGenerateEditorialAnalysis,
  canonicalizeUrl,
  classifyBatch,
  createVerifiedEditorial,
  createFeedStore,
  enrichArticleContent,
  fallbackClassification,
  fetchWithRetry,
  isVerificationRetryReady,
  isAutoPublishEvidenceEligible,
  normalizedTitle,
  parseFeed,
  serializeQuickFeedSummary,
  startOfTodayInSeoul,
} from "./lib.mjs";

nextEnv.loadEnvConfig(process.cwd());
const store = createFeedStore();
const transcriptScript = fileURLToPath(
  new URL("./youtube-transcript.py", import.meta.url)
);

function youtubeVideoId(value) {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    return url.searchParams.get("v");
  } catch {
    return null;
  }
}

function youtubeTranscript(value) {
  const videoId = youtubeVideoId(value);
  if (!videoId) return "";
  try {
    return execFileSync(process.env.PYTHON_BIN || "python3", [transcriptScript, videoId], {
      encoding: "utf8",
      timeout: 30_000,
      env: { ...process.env, PYTHONWARNINGS: "ignore" },
    }).trim();
  } catch {
    return "";
  }
}

function verificationAttempts(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return Number.isFinite(parsed.verification_attempts)
      ? Math.max(0, Math.floor(parsed.verification_attempts))
      : 0;
  } catch {
    return 0;
  }
}

function contentKindFromTags(tags) {
  const value = (tags || [])
    .find((tag) => tag.startsWith("content:"))
    ?.slice("content:".length);
  return ["jsonld", "transcript", "rss", "missing"].includes(value)
    ? value
    : "missing";
}

async function collect() {
  const [sources, existing] = await Promise.all([
    store.getAll(
      "feed_sources",
      "select=id,name,type,feed_url,active&active=eq.true&order=id"
    ),
    store.getAll(
      "feed_articles",
      "select=id,source_id,url,source_url,title,content,summary,status,tags,published_at,collected_at&order=id"
    ),
  ]);
  const activeSources = sources.filter(
    (source) => source.feed_url && !source.name.toLowerCase().startsWith("r/")
  );
  const knownUrls = new Set();
  const knownTitles = new Set();
  for (const article of existing) {
    if (article.url) knownUrls.add(canonicalizeUrl(article.url));
    if (article.source_url) knownUrls.add(canonicalizeUrl(article.source_url));
    if (article.title) knownTitles.add(normalizedTitle(article.title));
  }

  const rawCandidates = [];
  const sourceErrors = [];
  for (const source of activeSources) {
    try {
      const response = await fetchWithRetry(
        source.feed_url,
        { headers: { "User-Agent": "ksungz-feed-collector/3.0" } },
        source.name
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const items = parseFeed(await response.text())
        .filter((item) => {
          const canonicalUrl = canonicalizeUrl(item.url);
          const titleKey = normalizedTitle(item.title);
          if (knownUrls.has(canonicalUrl) || knownTitles.has(titleKey)) {
            return false;
          }
          knownUrls.add(canonicalUrl);
          knownTitles.add(titleKey);
          return true;
        })
        .slice(0, Math.max(QUALITY.perSourceLimit * 2, 10));

      for (const item of items) {
        const transcript =
          source.type === "youtube" ? youtubeTranscript(item.url) : "";
        const content = transcript || item.content;
        const contentKind = transcript
          ? "transcript"
          : source.type === "youtube"
            ? "missing"
            : content
              ? "rss"
              : "missing";
        const candidate = await enrichArticleContent({
          ...item,
          id: rawCandidates.length + 1,
          url: canonicalizeUrl(item.url),
          source_url: canonicalizeUrl(item.url),
          content,
          content_kind: contentKind,
          source_name: source.name,
          source,
        });
        rawCandidates.push(candidate);
      }
      console.log(`[collector] ${source.name}: 신규 후보 ${items.length}개`);
    } catch (error) {
      sourceErrors.push(`${source.name}: ${error.message}`);
      console.error(`[collector] ${source.name} 실패: ${error.message}`);
    }
  }

  const sourceMap = new Map(activeSources.map((source) => [source.id, source]));
  const retryRows = existing
    .filter((article) => {
      const state = (article.tags || []).find((tag) =>
        tag.startsWith("verification:")
      );
      return (
        article.status !== "archived" &&
        sourceMap.has(article.source_id) &&
        (state === "verification:pending" || state === "verification:failed") &&
        verificationAttempts(article.summary) < QUALITY.maxVerificationRuns &&
        isVerificationRetryReady(article.summary)
      );
    })
    .sort((left, right) => right.id - left.id)
    .slice(0, QUALITY.retryPerRun);

  for (const article of retryRows) {
    const source = sourceMap.get(article.source_id);
    const transcript =
      source.type === "youtube" ? youtubeTranscript(article.url) : "";
    const content = transcript || article.content || "";
    const contentKind = transcript
      ? "transcript"
      : source.type === "youtube"
        ? "missing"
        : contentKindFromTags(article.tags);
    rawCandidates.push(
      await enrichArticleContent({
        ...article,
        id: -article.id,
        existing_id: article.id,
        existing_status: article.status,
        content,
        content_kind: contentKind,
        source_name: source.name,
        source,
        verification_attempts: verificationAttempts(article.summary),
      })
    );
  }
  if (retryRows.length > 0) {
    console.log(`[collector] 자동 재시도 후보 ${retryRows.length}개`);
  }

  const resultMap = new Map();
  const eligibleCandidates = rawCandidates.filter((candidate) =>
    canGenerateEditorialAnalysis(candidate.content, candidate.content_kind)
  );
  const candidatesBySource = new Map();
  for (const candidate of eligibleCandidates) {
    const rows = candidatesBySource.get(candidate.source.id) || [];
    rows.push(candidate);
    candidatesBySource.set(candidate.source.id, rows);
  }
  for (const rows of candidatesBySource.values()) {
    rows.sort(
      (left, right) => Number(Boolean(right.existing_id)) - Number(Boolean(left.existing_id))
    );
  }
  const analysisCandidates = [];
  while (analysisCandidates.length < QUALITY.maxAnalysisPerRun) {
    let selected = false;
    for (const source of activeSources) {
      const candidate = candidatesBySource.get(source.id)?.shift();
      if (!candidate) continue;
      analysisCandidates.push(candidate);
      selected = true;
      if (analysisCandidates.length >= QUALITY.maxAnalysisPerRun) break;
    }
    if (!selected) break;
  }
  const analysisCandidateIds = new Set(
    analysisCandidates.map((candidate) => candidate.id)
  );
  const batchSize = 2;
  const concurrentBatches = 2;
  for (
    let index = 0;
    index < analysisCandidates.length;
    index += batchSize * concurrentBatches
  ) {
    const batches = Array.from({ length: concurrentBatches }, (_, offset) =>
      analysisCandidates.slice(
        index + offset * batchSize,
        index + (offset + 1) * batchSize
      )
    ).filter((batch) => batch.length > 0);
    const classifications = await Promise.all(batches.map(classifyBatch));
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
      for (const result of classifications[batchIndex]) {
        resultMap.set(result.id, result);
      }
    }
    console.log(
      `[collector] 편집 분석 ${Math.min(index + batchSize * concurrentBatches, analysisCandidates.length)}/${analysisCandidates.length}`
    );
  }
  for (let index = 0; index < analysisCandidates.length; index += 2) {
    const batch = analysisCandidates.slice(index, index + 2);
    const verified = await Promise.all(
      batch.map((candidate) =>
        createVerifiedEditorial(candidate, resultMap.get(candidate.id))
      )
    );
    for (let offset = 0; offset < batch.length; offset += 1) {
      resultMap.set(batch[offset].id, verified[offset]);
    }
    console.log(
      `[collector] 근거·편집 검증 ${Math.min(index + 2, analysisCandidates.length)}/${analysisCandidates.length}`
    );
  }

  const candidates = rawCandidates.map((candidate) => ({
    ...candidate,
    classification: (() => {
      const result = resultMap.get(candidate.id) || fallbackClassification(candidate);
      const consumedVerificationRun =
        candidate.existing_id &&
        (analysisCandidateIds.has(candidate.id) ||
          !canGenerateEditorialAnalysis(
            candidate.content,
            candidate.content_kind
          ));
      return {
        ...result,
        verification_attempts:
          result.verification_attempts ??
          (candidate.existing_id
            ? (candidate.verification_attempts || 0) +
              (consumedVerificationRun ? 1 : 0)
            : 0),
        verification_last_attempt_at:
          result.verification_last_attempt_at ||
          (consumedVerificationRun ? new Date().toISOString() : ""),
      };
    })(),
  }));

  const today = startOfTodayInSeoul();
  const existingPublicRows = existing.filter(
    (article) =>
      article.collected_at >= today &&
      Array.isArray(article.tags) &&
      article.tags.includes("visibility:public")
  );
  const existingPublicToday = existingPublicRows.length;
  let publicSlots = Math.max(0, QUALITY.dailyPublicLimit - existingPublicToday);
  const publicBySource = new Map();
  for (const article of existingPublicRows) {
    publicBySource.set(
      article.source_id,
      (publicBySource.get(article.source_id) || 0) + 1
    );
  }
  const stats = {
    inserted: 0,
    published: 0,
    review: 0,
    rejected: 0,
    incomplete: 0,
    editorialPending: 0,
    verificationFailed: 0,
    reprocessed: 0,
  };

  candidates.sort(
    (left, right) =>
      right.classification.relevance_score - left.classification.relevance_score
  );

  for (const candidate of candidates) {
    const { classification, source } = candidate;
    const contentQuality = assessContentQuality(
      candidate.content,
      classification,
      candidate.content_kind
    );
    const editorialState =
      !classification.used_fallback &&
      contentQuality.complete &&
      classification.verification_state === "passed"
        ? "ready"
        : "pending";
    const verificationState = classification.verification_state || "pending";
    const reject =
      classification.relevance_score < QUALITY.reviewScore ||
      (classification.category === "other" &&
        classification.relevance_score < QUALITY.publicScore);
    if (reject) {
      const rejectedData = {
        source_id: source.id,
        title: candidate.title,
        url: candidate.url,
        source_url: candidate.source_url,
        content: candidate.content || null,
        summary: serializeQuickFeedSummary(classification),
        importance_score: classification.relevance_score,
        tags: buildTags(
          classification.category,
          "review",
          classification.topics,
          contentQuality.quality,
          candidate.content_kind,
          editorialState,
          verificationState
        ),
        published_at: candidate.published_at,
        status: "archived",
      };
      if (candidate.existing_id) {
        await store.updateArticle(candidate.existing_id, rejectedData);
        stats.reprocessed += 1;
      } else {
        const rejected = await store.insertArticle(rejectedData);
        if (rejected?.length) stats.inserted += 1;
      }
      stats.rejected += 1;
      console.log(
        `[collector] 제외 ${classification.relevance_score}점: ${candidate.title}`
      );
      continue;
    }

    const sourcePublicCount = publicBySource.get(source.id) || 0;
    const publish =
      classification.auto_publish &&
      verificationState === "passed" &&
      editorialState === "ready" &&
      contentQuality.complete &&
      isAutoPublishEvidenceEligible(candidate.content, candidate.content_kind) &&
      publicSlots > 0 &&
      sourcePublicCount < QUALITY.perSourceLimit;
    const visibility = publish ? "public" : "review";
    const articleData = {
      source_id: source.id,
      title: candidate.title,
      url: candidate.url,
      source_url: candidate.source_url,
      content: candidate.content || null,
      summary: serializeQuickFeedSummary(classification),
      importance_score: classification.relevance_score,
      tags: buildTags(
        classification.category,
        visibility,
        classification.topics,
        contentQuality.quality,
        candidate.content_kind,
        editorialState,
        verificationState
      ),
      published_at: candidate.published_at,
      status: candidate.existing_status || "unread",
    };
    if (candidate.existing_id) {
      await store.updateArticle(candidate.existing_id, articleData);
      stats.reprocessed += 1;
    } else {
      const inserted = await store.insertArticle(articleData);
      if (!inserted?.length) continue;
      stats.inserted += 1;
    }
    if (publish) {
      stats.published += 1;
      publicSlots -= 1;
      publicBySource.set(source.id, sourcePublicCount + 1);
    } else {
      stats.review += 1;
      if (!contentQuality.complete) stats.incomplete += 1;
      if (editorialState === "pending") stats.editorialPending += 1;
      if (verificationState === "failed") stats.verificationFailed += 1;
    }
    console.log(
      `[collector] ${visibility} ${classification.relevance_score}점 ${classification.category} ` +
        `${candidate.content_kind}/${editorialState}/${verificationState} ` +
        `근거 ${classification.evidence_score || 0} · 편집 ${classification.editorial_score || 0} ` +
        `${contentQuality.complete ? "근거완료" : contentQuality.reasons.join(", ")}: ${candidate.title}`
    );
  }

  const summary = {
    ...stats,
    sources: activeSources.length,
    llmProvider: getFeedLlmProviderInfo(),
    sourceErrors,
    completedAt: new Date().toISOString(),
  };
  console.log(JSON.stringify(summary, null, 2));
  if (sourceErrors.length === activeSources.length && activeSources.length > 0) {
    process.exitCode = 1;
  }
}

collect().catch((error) => {
  console.error(`[collector] 치명적 오류: ${error.message}`);
  process.exitCode = 1;
});
