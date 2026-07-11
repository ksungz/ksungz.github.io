import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import {
  QUALITY,
  buildTags,
  canonicalizeUrl,
  classifyBatch,
  createFeedStore,
  fetchWithRetry,
  normalizedTitle,
  parseFeed,
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

async function collect() {
  const [sources, existing] = await Promise.all([
    store.getAll(
      "feed_sources",
      "select=id,name,type,feed_url,active&active=eq.true&order=id"
    ),
    store.getAll(
      "feed_articles",
      "select=id,source_id,url,source_url,title,tags,collected_at&order=id"
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
        const content =
          source.type === "youtube"
            ? youtubeTranscript(item.url) || item.content
            : item.content;
        rawCandidates.push({
          ...item,
          id: rawCandidates.length + 1,
          url: canonicalizeUrl(item.url),
          content,
          source_name: source.name,
          source,
        });
      }
      console.log(`[collector] ${source.name}: 신규 후보 ${items.length}개`);
    } catch (error) {
      sourceErrors.push(`${source.name}: ${error.message}`);
      console.error(`[collector] ${source.name} 실패: ${error.message}`);
    }
  }

  const candidates = [];
  const batchSize = 12;
  const concurrentBatches = 2;
  for (
    let index = 0;
    index < rawCandidates.length;
    index += batchSize * concurrentBatches
  ) {
    const batches = Array.from({ length: concurrentBatches }, (_, offset) =>
      rawCandidates.slice(
        index + offset * batchSize,
        index + (offset + 1) * batchSize
      )
    ).filter((batch) => batch.length > 0);
    const classifications = await Promise.all(batches.map(classifyBatch));
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
      const resultMap = new Map(
        classifications[batchIndex].map((result) => [result.id, result])
      );
      for (const candidate of batches[batchIndex]) {
        candidates.push({
          ...candidate,
          classification: resultMap.get(candidate.id),
        });
      }
    }
    console.log(
      `[collector] 품질 분류 ${Math.min(index + batchSize * concurrentBatches, rawCandidates.length)}/${rawCandidates.length}`
    );
  }

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
  const stats = { inserted: 0, published: 0, review: 0, rejected: 0 };

  candidates.sort(
    (left, right) =>
      right.classification.relevance_score - left.classification.relevance_score
  );

  for (const candidate of candidates) {
    const { classification, source } = candidate;
    const reject =
      classification.relevance_score < QUALITY.reviewScore ||
      (classification.category === "other" &&
        classification.relevance_score < QUALITY.publicScore);
    if (reject) {
      const rejected = await store.insertArticle({
        source_id: source.id,
        title: candidate.title,
        url: candidate.url,
        source_url: candidate.url,
        content: candidate.content || null,
        summary: classification.summary,
        importance_score: classification.relevance_score,
        tags: buildTags(
          classification.category,
          "review",
          classification.topics
        ),
        published_at: candidate.published_at,
        status: "archived",
      });
      if (rejected?.length) stats.inserted += 1;
      stats.rejected += 1;
      console.log(
        `[collector] 제외 ${classification.relevance_score}점: ${candidate.title}`
      );
      continue;
    }

    const sourcePublicCount = publicBySource.get(source.id) || 0;
    const publish =
      classification.relevance_score >= QUALITY.publicScore &&
      publicSlots > 0 &&
      sourcePublicCount < QUALITY.perSourceLimit;
    const visibility = publish ? "public" : "review";
    const inserted = await store.insertArticle({
      source_id: source.id,
      title: candidate.title,
      url: candidate.url,
      source_url: candidate.url,
      content: candidate.content || null,
      summary: classification.summary,
      importance_score: classification.relevance_score,
      tags: buildTags(
        classification.category,
        visibility,
        classification.topics
      ),
      published_at: candidate.published_at,
      status: "unread",
    });
    if (!inserted?.length) continue;

    stats.inserted += 1;
    if (publish) {
      stats.published += 1;
      publicSlots -= 1;
      publicBySource.set(source.id, sourcePublicCount + 1);
    } else {
      stats.review += 1;
    }
    console.log(
      `[collector] ${visibility} ${classification.relevance_score}점 ${classification.category}: ${candidate.title}`
    );
  }

  const summary = {
    ...stats,
    sources: activeSources.length,
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
