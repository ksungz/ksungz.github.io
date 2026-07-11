import nextEnv from "@next/env";
import { loadEnvFile } from "node:process";
import {
  QUALITY,
  assessContentQuality,
  buildTags,
  classifyArticle,
  classifyBatch,
  createFeedStore,
  enrichArticleContent,
  serializeQuickFeedSummary,
} from "./lib.mjs";

nextEnv.loadEnvConfig(process.cwd());
if (process.env.FEED_SECRETS_DIR) {
  loadEnvFile(`${process.env.FEED_SECRETS_DIR}/.env`);
}
if (!process.env.OLLAMA_API_KEY) {
  throw new Error("품질 백필에는 OLLAMA_API_KEY가 필요합니다.");
}
const applyChanges = process.argv.includes("--apply");
const recheckTagged = process.argv.includes("--recheck-tagged");
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
        (recheckTagged
          ? (article.tags || []).some((tag) => tag.startsWith("quality:"))
          : (article.tags || []).includes("visibility:public"))
    )
    .map((article) => ({
      ...article,
      source_name: sourceMap.get(article.source_id).name,
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

  const classified = [];
  for (let index = 0; index < enriched.length; index += 4) {
    classified.push(...(await classifyBatch(enriched.slice(index, index + 4))));
    console.log(
      `[quality-backfill] 요약 생성 ${Math.min(index + 4, enriched.length)}/${enriched.length}`
    );
  }
  const resultMap = new Map(classified.map((result) => [result.id, result]));
  const initialFallbacks = classified.filter((result) => result.used_fallback);
  for (let index = 0; index < initialFallbacks.length; index += 2) {
    const retried = await Promise.all(
      initialFallbacks.slice(index, index + 2).map((result) =>
        classifyArticle(enriched.find((article) => article.id === result.id))
      )
    );
    for (let offset = 0; offset < retried.length; offset += 1) {
      resultMap.set(initialFallbacks[index + offset].id, retried[offset]);
    }
    console.log(
      `[quality-backfill] 단건 재시도 ${Math.min(index + 2, initialFallbacks.length)}/${initialFallbacks.length}`
    );
  }
  const fallbackResults = [...resultMap.values()].filter(
    (result) => result.used_fallback
  );
  if (fallbackResults.length > 0) {
    throw new Error(
      `LLM 구조화 분류 실패 ${fallbackResults.length}건. 데이터 반영을 중단합니다.`
    );
  }

  const updates = enriched.map((article) => {
    const classification = resultMap.get(article.id);
    const quality = assessContentQuality(article.content, classification);
    const visibility =
      quality.complete &&
      classification.relevance_score >= QUALITY.publicScore &&
      classification.category !== "other"
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
          quality.quality
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
        demoted: updates
          .filter((item) => item.visibility === "review")
          .map((item) => ({
            id: item.id,
            title: item.title,
            score: item.score,
            reasons: item.quality.reasons,
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
