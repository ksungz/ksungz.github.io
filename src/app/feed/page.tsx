import {
  fetchArticlesPage,
  fetchCategories,
  fetchFeedCounts,
  fetchTopics,
  toPublicFeedPage,
} from "@/lib/feed-data";
import { FeedClient } from "./FeedClient";
import "./feed.css";

export const dynamic = "force-dynamic";

interface FeedPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const params = await searchParams;
  const category = firstParam(params.category) || "all";
  const search = firstParam(params.q).slice(0, 80);
  const tag = firstParam(params.tag).slice(0, 80) || null;

  const [initialPage, counts, categories, topics] = await Promise.all([
    fetchArticlesPage({
      category,
      search,
      tag,
      limit: 20,
      order: "latest",
      publicOnly: true,
    }),
    fetchFeedCounts({ publicOnly: true }),
    fetchCategories(),
    fetchTopics(),
  ]);

  return (
    <FeedClient
      initialPage={toPublicFeedPage(initialPage)}
      initialTopics={topics}
      categories={categories}
      counts={counts}
      initialCategory={category}
      initialSearch={search}
      initialTag={tag}
    />
  );
}
