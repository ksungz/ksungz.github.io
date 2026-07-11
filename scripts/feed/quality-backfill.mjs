import nextEnv from "@next/env";
import { loadEnvFile } from "node:process";
import { getFeedLlmProviderInfo } from "./llm-provider.mjs";
import {
  assessContentQuality,
  buildTags,
  canGenerateEditorialAnalysis,
  classifyBatch,
  createVerifiedEditorial,
  createFeedStore,
  enrichArticleContent,
  fallbackClassification,
  inferContentKind,
  isAutoPublishEvidenceEligible,
  serializeQuickFeedSummary,
} from "./lib.mjs";

nextEnv.loadEnvConfig(process.cwd());
if (process.env.FEED_SECRETS_DIR) {
  loadEnvFile(`${process.env.FEED_SECRETS_DIR}/.env`);
}
if (!getFeedLlmProviderInfo().configured) {
  throw new Error("품질 백필에는 구성된 FEED_LLM_PROVIDER가 필요합니다.");
}
const applyChanges = process.argv.includes("--apply");
const recheckTagged = process.argv.includes("--recheck-tagged");
const targetIdArg = process.argv.find((value) => value.startsWith("--id="));
const targetId = targetIdArg
  ? Number.parseInt(targetIdArg.slice("--id=".length), 10)
  : null;
if (targetIdArg && (!Number.isInteger(targetId) || targetId <= 0)) {
  throw new Error("--id에는 양의 기사 ID가 필요합니다.");
}
const store = createFeedStore();

async function qualityBackfill() {
  const [sources, articles] = await Promise.all([
    store.getAll(
      "feed_sources",
      "select=id,name,type,active&active=eq.true&order=id"
    ),
    store.getAll(
      "feed_articles",
      "select=id,source_id,title,url,source_url,content,summary,status,tags,published_at,collected_at&status=neq.archived&order=id"
    ),
  ]);
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const targets = articles
    .filter(
      (article) =>
        sourceMap.has(article.source_id) &&
        (targetId === null || article.id === targetId) &&
        (recheckTagged
          ? (article.tags || []).some((tag) => tag.startsWith("quality:"))
          : (article.tags || []).includes("visibility:public"))
    )
    .map((article) => ({
      ...article,
      source_name: sourceMap.get(article.source_id).name,
      source_type: sourceMap.get(article.source_id).type,
      content_kind: inferContentKind({
        ...article,
        source_type: sourceMap.get(article.source_id).type,
      }),
    }));

  const enriched = [];
  for (let index = 0; index < targets.length; index += 4) {
    enriched.push(
      ...(await Promise.all(
        targets.slice(index, index + 4).map(enrichArticleContent)
      ))
    );
    console.log(
      `[quality-backfill] 본문 보강 ${Math.min(index + 4, targets.length)}/${targets.length}`
    );
  }

  const analysisTargets = enriched.filter((article) =>
    canGenerateEditorialAnalysis(article.content, article.content_kind)
  );
  const classified = [];
  for (let index = 0; index < analysisTargets.length; index += 4) {
    classified.push(
      ...(await classifyBatch(analysisTargets.slice(index, index + 4)))
    );
    console.log(
      `[quality-backfill] 편집 분석 ${Math.min(index + 4, analysisTargets.length)}/${analysisTargets.length}`
    );
  }
  const resultMap = new Map(
    enriched.map((article) => [article.id, fallbackClassification(article)])
  );
  for (const result of classified) resultMap.set(result.id, result);
  for (let index = 0; index < analysisTargets.length; index += 2) {
    const batch = analysisTargets.slice(index, index + 2);
    const verified = await Promise.all(
      batch.map((article) =>
        createVerifiedEditorial(article, resultMap.get(article.id))
      )
    );
    for (let offset = 0; offset < batch.length; offset += 1) {
      resultMap.set(batch[offset].id, verified[offset]);
    }
    console.log(
      `[quality-backfill] 근거·편집 검증 ${Math.min(index + 2, analysisTargets.length)}/${analysisTargets.length}`
    );
  }

  const updates = enriched.map((article) => {
    const classification = resultMap.get(article.id);
    const quality = assessContentQuality(
      article.content,
      classification,
      article.content_kind
    );
    const editorialState =
      !classification.used_fallback &&
      quality.complete &&
      classification.verification_state === "passed"
        ? "ready"
        : "pending";
    const verificationState = classification.verification_state || "pending";
    const visibility =
      quality.complete &&
      classification.auto_publish &&
      editorialState === "ready" &&
      verificationState === "passed" &&
      isAutoPublishEvidenceEligible(article.content, article.content_kind)
        ? "public"
        : "review";
    return {
      id: article.id,
      title: article.title,
      visibility,
      score: classification.relevance_score,
      quality,
      data: {
        url: article.url,
        source_url: article.source_url,
        content: article.content || null,
        summary: serializeQuickFeedSummary(classification),
        importance_score: classification.relevance_score,
        tags: buildTags(
          classification.category,
          visibility,
          classification.topics,
          quality.quality,
          article.content_kind,
          editorialState,
          verificationState
        ),
      },
    };
  });

  console.log(
    JSON.stringify(
      {
        total: updates.length,
        public: updates.filter((item) => item.visibility === "public").length,
        review: updates.filter((item) => item.visibility === "review").length,
        incomplete: updates.filter((item) => !item.quality.complete).length,
        editorialPending: updates.filter(
          (item) => item.data.tags.includes("editorial:pending")
        ).length,
        verificationFailed: updates.filter(
          (item) => item.data.tags.includes("verification:failed")
        ).length,
        demoted: updates
          .filter((item) => item.visibility === "review")
          .map((item) => ({
            id: item.id,
            title: item.title,
            score: item.score,
            evidenceScore: item.data.summary
              ? JSON.parse(item.data.summary).evidence_score
              : 0,
            editorialScore: item.data.summary
              ? JSON.parse(item.data.summary).editorial_score
              : 0,
            reasons: item.quality.reasons,
            verificationIssues: item.data.summary
              ? JSON.parse(item.data.summary).verification_issues
              : [],
          })),
      },
      null,
      2
    )
  );

  if (!applyChanges) {
    console.log("[quality-backfill] dry-run 완료. 반영하려면 --apply를 사용하세요.");
    return;
  }
  const publicCount = updates.filter((item) => item.visibility === "public").length;
  if (publicCount === 0) {
    throw new Error(
      "검증 통과 공개 글이 0건이라 데이터 반영을 중단합니다. 기준과 검증 결과를 먼저 확인하세요."
    );
  }
  for (let index = 0; index < updates.length; index += 1) {
    await store.updateArticle(updates[index].id, updates[index].data);
    if ((index + 1) % 10 === 0 || index + 1 === updates.length) {
      console.log(`[quality-backfill] 저장 ${index + 1}/${updates.length}`);
    }
  }
}

qualityBackfill().catch((error) => {
  console.error(`[quality-backfill] 실패: ${error.message}`);
  process.exitCode = 1;
});
