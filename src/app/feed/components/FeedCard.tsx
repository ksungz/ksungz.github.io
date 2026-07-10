"use client";

import type { FeedArticle } from "@/lib/feed-data";

interface FeedCardProps {
  article: FeedArticle;
  onClick: (id: number) => void;
}

const STATUS_LABELS: Record<string, string> = {
  unread: "안 읽음",
  read: "읽음",
  analyzed: "분석됨",
  posted: "포스팅됨",
  archived: "보관",
};

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  unread: { background: "#1c1c1c", color: "#888" },
  read: { background: "transparent", color: "#555", border: "1px solid #333" },
  analyzed: { background: "#1a2c1a", color: "#69db7c" },
  posted: { background: "#1c2a3c", color: "#4dabf7" },
  archived: { background: "#1c1c1c", color: "#555" },
};

const CAT_BADGE_STYLES: Record<string, React.CSSProperties> = {
  dev: { background: "#1a3a5c", color: "#4dabf7" },
  business: { background: "#3c2a1a", color: "#ffa94d" },
  youtube: { background: "#3c1a1a", color: "#ff6b6b" },
  social: { background: "#2a1a3c", color: "#b197fc" },
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

export function FeedCard({ article, onClick }: FeedCardProps) {
  const catStyle =
    CAT_BADGE_STYLES[article.source_category] || CAT_BADGE_STYLES.dev;
  const statusStyle =
    STATUS_STYLES[article.status] || { background: "#1c1c1c", color: "#888" };

  const summary = article.summary || article.content || "";
  const truncated =
    summary.length > 120 ? summary.slice(0, 120) + "..." : summary;

  return (
    <article
      onClick={() => onClick(article.id)}
      className="px-4 py-3.5 cursor-pointer transition-colors"
      style={{
        borderBottom: "1px solid #1a1a1a",
        background: "#0a0a0a",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap"
          style={catStyle}
        >
          {article.source_name}
        </span>
        <span className="text-xs" style={{ color: "#666" }}>
          {timeAgo(article.collected_at)}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded ml-auto whitespace-nowrap"
          style={statusStyle}
        >
          {STATUS_LABELS[article.status] || article.status}
        </span>
      </div>
      <h3
        className="text-sm font-medium mb-1"
        style={{
          color: "#e4e4e4",
          lineHeight: 1.4,
        }}
      >
        {article.title}
      </h3>
      {truncated && (
        <p
          className="text-xs overflow-hidden"
          style={{
            color: "#888",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {truncated}
        </p>
      )}
    </article>
  );
}