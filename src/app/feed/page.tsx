import {
  fetchArticles,
  fetchAnalyzedArticles,
  fetchSources,
  fetchCategories,
  fetchTopics,
} from "@/lib/feed-data";
import { FeedClient } from "./FeedClient";
import "./feed.css";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const [articles, analyzed, sources, categories, topics] = await Promise.all([
    fetchArticles("all", "all", ""),
    fetchAnalyzedArticles(),
    fetchSources(),
    fetchCategories(),
    fetchTopics(),
  ]);

  const analyzedCount = articles.filter((a) => a.status === "analyzed").length;
  const postedCount = articles.filter((a) => a.status === "posted").length;

  const counts = {
    total: articles.length,
    analyzed: analyzedCount,
    posted: postedCount,
    sourceCount: sources.length,
    categoryCount: categories.length,
  };

  return (
    <FeedClient
      initialArticles={articles}
      initialAnalyzed={analyzed}
      initialTopics={topics}
      counts={counts}
    />
  );
}