import { notFound } from "next/navigation";
import {
  fetchArticleById,
  fetchCategories,
  fetchFeedCounts,
  toPublicFeedArticle,
} from "@/lib/feed-data";
import { ArticleDetail } from "./ArticleDetail";
import "../feed.css";

export const dynamic = "force-dynamic";

export default async function FeedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = Number.parseInt(id, 10);
  const [article, counts, categories] = await Promise.all([
    fetchArticleById(articleId),
    fetchFeedCounts({ publicOnly: true }),
    fetchCategories(),
  ]);

  if (
    !article ||
    article.status === "archived" ||
    !article.source_active ||
    article.visibility !== "public"
  ) {
    notFound();
  }
  return (
    <ArticleDetail
      article={toPublicFeedArticle(article)}
      counts={counts}
      categories={categories}
    />
  );
}
