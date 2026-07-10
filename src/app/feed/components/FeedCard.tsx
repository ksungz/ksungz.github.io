"use client";

import Link from "next/link";
import type { FeedArticle } from "@/lib/feed-data";

interface FeedCardProps {
  article: FeedArticle;
  index: number;
}

const CAT_LABELS: Record<string, string> = {
  dev: "개발",
  business: "비즈니스",
  youtube: "YouTube",
  social: "소셜",
};

function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return `${Math.floor(diff / 60000)}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export function FeedCard({ article, index }: FeedCardProps) {
  const catLabel = CAT_LABELS[article.source_category] || article.source_category;
  const summary = article.summary || article.content || "";
  const truncated = summary.length > 140 ? summary.slice(0, 140) + "..." : summary;

  return (
    <Link href={`/feed/${article.id}`} className="feed-card">
      <span className="feed-card-number">{index}</span>
      <div className="feed-card-body">
        <h2>{article.title}</h2>
        {truncated && <p className="feed-card-summary">{truncated}</p>}
        <div className="feed-card-meta">
          <a
            href={article.source_url || article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="feed-card-source"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(article.source_url || article.url, "_blank", "noopener,noreferrer");
            }}
          >
            {article.source_name}
          </a>
          <span className="feed-card-time">{timeAgo(article.collected_at)}</span>
          <span className={`feed-card-cat ${article.source_category}`}>
            {catLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}