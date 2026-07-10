import { notFound } from "next/navigation";
import { fetchArticleById } from "@/lib/feed-data";
import { ArticleDetail } from "./ArticleDetail";
import "../feed.css";

export const dynamic = "force-dynamic";

export default async function FeedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await fetchArticleById(parseInt(id, 10));
  if (!article) notFound();
  return <ArticleDetail article={article} />;
}