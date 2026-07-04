"use client";

import type { FeedArticle } from "@/lib/feed-data";

const STATUS_LABELS: Record<string, string> = {
  unread: "안 읽음",
  read: "읽음",
  analyzed: "분석됨",
  posted: "포스팅됨",
  archived: "보관",
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

interface FeedListProps {
  articles: FeedArticle[];
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  catFilter: string;
  setCatFilter: (c: string) => void;
  onOpenReader: (id: number) => void;
}

export function FeedList({
  articles,
  statusFilter,
  setStatusFilter,
  catFilter,
  setCatFilter,
  onOpenReader,
}: FeedListProps) {
  return (
    <>
      <div className="feed-header">
        <h1>📖 Info Feed</h1>
        <div className="feed-filters">
          {[
            { key: "all", label: "전체" },
            { key: "unread", label: "안 읽음" },
            { key: "read", label: "읽음" },
            { key: "analyzed", label: "분석됨" },
            { key: "posted", label: "포스팅됨" },
          ].map((f) => (
            <button
              key={f.key}
              className={`filter-pill ${statusFilter === f.key ? "active" : ""}`}
              onClick={() => setStatusFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="feed-cats">
          {[
            { key: "all", label: "전체 소스" },
            { key: "dev", label: "개발" },
            { key: "business", label: "비즈니스" },
            { key: "youtube", label: "YouTube" },
          ].map((c) => (
            <button
              key={c.key}
              className="cat-pill"
              data-cat={c.key}
              onClick={() => setCatFilter(c.key)}
              style={
                catFilter === c.key
                  ? { outline: "2px solid #fff", outlineOffset: "1px" }
                  : {}
              }
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="feed-list">
        {articles.length === 0 && (
          <div className="feed-empty">필터 조건에 맞는 글이 없습니다.</div>
        )}
        {articles.map((a) => (
          <div
            key={a.id}
            className="feed-card"
            onClick={() => onOpenReader(a.id)}
          >
            <div className="feed-card-meta">
              <span className={`source-badge ${a.source_category}`}>
                {a.source_name}
              </span>
              <span className="card-time">{timeAgo(a.collected_at)}</span>
              <span className={`status-badge status-${a.status}`}>
                {STATUS_LABELS[a.status] || a.status}
              </span>
            </div>
            <h3>{a.title}</h3>
            {a.content && (
              <p className="feed-card-summary">
                {a.content.slice(0, 120)}
                {a.content.length > 120 ? "..." : ""}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}