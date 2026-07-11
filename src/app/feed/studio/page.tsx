import {
  hasFeedAdminSession,
  isFeedAdminConfigured,
} from "@/lib/feed-admin-auth";
import {
  fetchArticlesPage,
  fetchCategories,
  fetchFeedCounts,
} from "@/lib/feed-data";
import { StudioClient } from "./StudioClient";
import { StudioLogin } from "./StudioLogin";
import "../feed.css";

export const dynamic = "force-dynamic";

export default async function FeedStudioPage() {
  const authenticated = await hasFeedAdminSession();
  if (!authenticated) {
    return <StudioLogin configured={isFeedAdminConfigured()} />;
  }

  const [initialPage, categories, counts] = await Promise.all([
    fetchArticlesPage({ status: "inbox", limit: 20, order: "importance" }),
    fetchCategories({ publicOnly: false }),
    fetchFeedCounts(),
  ]);

  return (
    <StudioClient
      initialPage={initialPage}
      categories={categories}
      counts={counts}
    />
  );
}
