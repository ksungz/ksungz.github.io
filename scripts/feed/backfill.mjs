import nextEnv from "@next/env";
import {
  QUALITY,
  assessContentQuality,
  buildTags,
  classifyBatch,
  createFeedStore,
  enrichArticleContent,
  serializeQuickFeedSummary,
} from "./lib.mjs";

nextEnv.loadEnvConfig(process.cwd());
const applyChanges = process.argv.includes("--apply");
const store = createFeedStore();

function dayInSeoul(value) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

async function backfill() {
  const [sources, articles, analyses] = await Promise.all([
    store.getAll(
      "feed_sources",
      "select=id,name,type,active&active=eq.true&order=id"
    ),
    store.getAll(
      "feed_articles",
      "select=id,source_id,title,url,source_url,content,summary,status,tags,published_at,collected_at,importance_score,analyzed_at&order=id"
    ),
    store.getAll("feed_analyses", "select=article_id,created_at"),
  ]);
  const sourceMap = new Map(
    sources
      .filter((source) => !source.name.toLowerCase().startsWith("r/"))
      .map((source) => [source.id, source])
  );
  const analysisMap = new Map(
    analyses.map((analysis) => [analysis.article_id, analysis])
  );
  const baseTargets = articles
    .filter((article) => sourceMap.has(article.source_id))
    .map((article) => ({
      ...article,
      source_name: sourceMap.get(article.source_id).name,
    }));
  const targets = [];
  for (let index = 0; index < baseTargets.length; index += 4) {
    targets.push(
      ...(await Promise.all(
        baseTargets.slice(index, index + 4).map(enrichArticleContent)
      ))
    );
  }

  const results = [];
  const batchSize = 4;
  const concurrentBatches = 2;
  for (
    let index = 0;
    index < targets.length;
    index += batchSize * concurrentBatches
  ) {
    const batches = Array.from({ length: concurrentBatches }, (_, offset) =>
      targets.slice(
        index + offset * batchSize,
        index + (offset + 1) * batchSize
      )
    ).filter((batch) => batch.length > 0);
    const classified = await Promise.all(batches.map(classifyBatch));
    results.push(...classified.flat());
    console.log(
      `[backfill] 분류 ${Math.min(index + batchSize * concurrentBatches, targets.length)}/${targets.length}`
    );
  }

  const resultMap = new Map(results.map((result) => [result.id, result]));
  const byDay = new Map();
  for (const article of targets) {
    const day = dayInSeoul(article.published_at || article.collected_at);
    const rows = byDay.get(day) || [];
    rows.push(article);
    byDay.set(day, rows);
  }

  const updates = [];
  for (const [day, rows] of byDay) {
    rows.sort((left, right) => {
      const leftAnalyzed = analysisMap.has(left.id) ? 1 : 0;
      const rightAnalyzed = analysisMap.has(right.id) ? 1 : 0;
      if (leftAnalyzed !== rightAnalyzed) return rightAnalyzed - leftAnalyzed;
      return (
        resultMap.get(right.id).relevance_score -
        resultMap.get(left.id).relevance_score
      );
    });
    let publicCount = 0;
    const publicBySource = new Map();

    for (const article of rows) {
      const result = resultMap.get(article.id);
      const analysis = analysisMap.get(article.id);
      const sourcePublic = publicBySource.get(article.source_id) || 0;
      const manuallyCurated = Boolean(analysis);
      const contentQuality = assessContentQuality(article.content, result);
      const publish =
        contentQuality.complete &&
        (manuallyCurated ||
          (result.relevance_score >= QUALITY.publicScore &&
            publicCount < QUALITY.dailyPublicLimit &&
            sourcePublic < QUALITY.perSourceLimit));
      const rejected =
        !manuallyCurated && result.relevance_score < QUALITY.reviewScore;
      const visibility = publish ? "public" : "review";
      if (publish) {
        publicCount += 1;
        publicBySource.set(article.source_id, sourcePublic + 1);
      }

      updates.push({
        id: article.id,
        day,
        source: article.source_name,
        title: article.title,
        score: Math.max(
          result.relevance_score,
          manuallyCurated ? QUALITY.publicScore : 0
        ),
        category: result.category,
        quality: contentQuality.quality,
        visibility,
        status: rejected
          ? "archived"
          : manuallyCurated && article.status !== "posted"
            ? "analyzed"
            : article.status,
        analyzed_at: manuallyCurated
          ? article.analyzed_at || analysis.created_at
          : article.analyzed_at,
        tags: buildTags(
          result.category,
          visibility,
          result.topics,
          contentQuality.quality
        ),
        summary: serializeQuickFeedSummary(result),
        content: article.content,
        url: article.url,
        source_url: article.source_url,
      });
    }
  }

  const summary = updates.reduce(
    (acc, update) => {
      acc.total += 1;
      acc.visibility[update.visibility] += 1;
      acc.status[update.status] = (acc.status[update.status] || 0) + 1;
      acc.categories[update.category] =
        (acc.categories[update.category] || 0) + 1;
      return acc;
    },
    {
      total: 0,
      visibility: { public: 0, review: 0 },
      status: {},
      categories: {},
    }
  );
  console.log(JSON.stringify(summary, null, 2));
  console.log(
    JSON.stringify(
      updates
        .filter((update) => update.visibility === "review")
        .sort((left, right) => right.score - left.score)
        .slice(0, 10),
      null,
      2
    )
  );

  if (!applyChanges) {
    console.log("[backfill] dry-run 완료. 반영하려면 --apply를 사용하세요.");
    return;
  }

  for (let index = 0; index < updates.length; index += 1) {
    const update = updates[index];
    await store.updateArticle(update.id, {
      summary: update.summary,
      content: update.content,
      url: update.url,
      source_url: update.source_url,
      importance_score: update.score,
      tags: update.tags,
      status: update.status,
      analyzed_at: update.analyzed_at,
    });
    if ((index + 1) % 20 === 0 || index + 1 === updates.length) {
      console.log(`[backfill] 저장 ${index + 1}/${updates.length}`);
    }
  }
}

backfill().catch((error) => {
  console.error(`[backfill] 실패: ${error.message}`);
  process.exitCode = 1;
});
