import {
  fetchArticlesPage,
  fetchCategories,
  fetchFeedCounts,
  toPublicFeedPage,
} from "@/lib/feed-data";
import { ArchiveClient } from "./ArchiveClient";
import "../feed.css";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const [initialPage, categories, counts] = await Promise.all([
    fetchArticlesPage({ limit: 20, order: "latest" }),
    fetchCategories(),
    fetchFeedCounts(),
  ]);

  return (
    <ArchiveClient
      initialPage={toPublicFeedPage(initialPage)}
      categories={categories}
      counts={counts}
    />
  );
}
