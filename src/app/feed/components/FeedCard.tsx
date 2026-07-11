import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { FeedArticle } from "@/lib/feed-data";
import { getCategoryLabel } from "@/lib/feed-categories";

interface FeedCardProps {
  article: FeedArticle;
  index: number;
  href?: string;
  showStatus?: boolean;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "numeric",
  timeZone: "Asia/Seoul",
});

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime()) ? "" : DATE_FORMATTER.format(date);
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    unread: "안 읽음",
    read: "읽음",
    analyzed: "분석됨",
    posted: "PR 생성",
    archived: "보관",
  };
  return labels[status] || status;
}

export function FeedCard({
  article,
  index,
  href = `/feed/${article.id}`,
  showStatus = false,
}: FeedCardProps) {
  const summary = article.summary || "요약을 준비하고 있습니다.";
  const truncated = summary.length > 180 ? `${summary.slice(0, 180)}...` : summary;
  const originalUrl = article.url;

  return (
    <article className="feed-card">
      <span className="feed-card-number">{index}</span>
      <div className="feed-card-body">
        <Link href={href} className="feed-card-primary">
          <h2>{article.title}</h2>
          <p className="feed-card-summary">{truncated}</p>
        </Link>
        <div className="feed-card-meta">
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="feed-card-source"
          >
            {article.source_name}
            <ExternalLink aria-hidden="true" size={11} />
          </a>
          <span className="feed-card-time">
            {formatDate(article.published_at || article.collected_at)}
          </span>
          <span className={`feed-card-cat ${article.source_category}`}>
            {getCategoryLabel(article.source_category)}
          </span>
          {article.analysis && <span className="feed-card-analysis">상세 분석</span>}
          {showStatus && article.visibility && (
            <span className={`feed-card-visibility ${article.visibility}`}>
              {article.visibility === "public" ? "공개" : "검토"}
            </span>
          )}
          {showStatus && (
            <span className={`feed-card-status ${article.status}`}>
              {statusLabel(article.status)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
