import { notFound, redirect } from "next/navigation";
import { hasFeedAdminSession } from "@/lib/feed-admin-auth";
import {
  fetchArticleById,
  fetchCategories,
  fetchFeedCounts,
} from "@/lib/feed-data";
import { ArticleDetail } from "../../[id]/ArticleDetail";
import "../../feed.css";

export const dynamic = "force-dynamic";

export default async function FeedStudioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await hasFeedAdminSession())) redirect("/feed/studio");

  const { id } = await params;
  const articleId = Number.parseInt(id, 10);
  const [article, counts, categories] = await Promise.all([
    fetchArticleById(articleId),
    fetchFeedCounts(),
    fetchCategories({ publicOnly: false }),
  ]);

  if (!article) notFound();
  return (
    <ArticleDetail
      article={article}
      counts={counts}
      categories={categories}
      manage
    />
  );
}
