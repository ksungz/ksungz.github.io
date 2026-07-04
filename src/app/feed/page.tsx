import { fetchArticles, fetchAnalyzedArticles } from "@/lib/feed-data";
import { FeedClient } from "./FeedClient";
import "./feed.css";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const [articles, analyzed] = await Promise.all([
    fetchArticles("all", "all", ""),
    fetchAnalyzedArticles(),
  ]);

  return <FeedClient initialArticles={articles} initialAnalyzed={analyzed} />;
}