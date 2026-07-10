"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { FeedArticle } from "@/lib/feed-data";

const CATEGORY_COLORS: Record<string, string> = {
  dev: "#4dabf7",
  business: "#ffa94d",
  youtube: "#ff6b6b",
  social: "#b197fc",
};

const STATUS_LABELS: Record<string, string> = {
  unread: "안 읽음",
  read: "읽음",
  analyzed: "분석됨",
  posted: "포스팅됨",
  archived: "보관",
};

interface ArchiveClientProps {
  initialArticles: FeedArticle[];
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return `${Math.floor(diff / 60000)}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

function getDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "오늘";
  if (d.toDateString() === yesterday.toDateString()) return "어제";
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function ArchiveClient({ initialArticles }: ArchiveClientProps) {
  const [articles, setArticles] = useState<FeedArticle[]>(initialArticles);
  const [catFilter, setCatFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length >= 20);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (catFilter !== "all" && a.source_category !== catFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        if (
          !a.title?.toLowerCase().includes(q) &&
          !a.summary?.toLowerCase().includes(q) &&
          !a.content?.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [articles, catFilter, searchQuery]);

  // 날짜 그룹핑 (collected_at 기준)
  const grouped = useMemo(() => {
    const groups: { label: string; items: FeedArticle[] }[] = [];
    const seen = new Map<string, number>();

    for (const a of filtered) {
      const label = getDateLabel(a.collected_at);
      if (!seen.has(label)) {
        seen.set(label, groups.length);
        groups.push({ label, items: [] });
      }
      groups[seen.get(label)!].items.push(a);
    }
    return groups;
  }, [filtered]);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/feed-archive?limit=20&offset=" + articles.length);
      if (res.ok) {
        const data: FeedArticle[] = await res.json();
        if (data.length > 0) {
          setArticles((prev) => [...prev, ...data]);
          setHasMore(data.length >= 20);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [articles.length]);

  return (
    <div className="feed-root" style={{ paddingBottom: 80 }}>
      {/* 헤더 */}
      <div className="feed-header">
        <Link
          href="/feed"
          className="reader-back"
          style={{ marginBottom: 8, marginTop: 0 }}
        >
          ← 피드로 돌아가기
        </Link>
        <h1>🗂️ 전체 아카이브</h1>
        <div className="feed-header-desc">
          총 {articles.length}+개 기사
        </div>

        {/* 검색 */}
        <input
          type="text"
          placeholder="🔍 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            marginTop: 12,
            borderRadius: 8,
            border: "1px solid #2a2a2a",
            background: "#111",
            color: "#e4e4e4",
            fontSize: 14,
            outline: "none",
          }}
        />

        {/* 카테고리 필터 칩 (가로 스크롤) */}
        <div className="feed-filters" style={{ marginTop: 10 }}>
          {[
            { key: "all", label: "전체" },
            { key: "dev", label: "개발" },
            { key: "business", label: "비즈니스" },
            { key: "youtube", label: "YouTube" },
            { key: "social", label: "소셜" },
          ].map((c) => {
            const isActive = catFilter === c.key;
            const color = CATEGORY_COLORS[c.key] || "#888";
            return (
              <button
                key={c.key}
                className="filter-pill"
                onClick={() => setCatFilter(c.key)}
                style={
                  isActive
                    ? {
                        background: "#fff",
                        color: "#000",
                        borderColor: "#fff",
                      }
                    : c.key !== "all"
                    ? {
                        borderColor: `${color}44`,
                        color,
                      }
                    : {}
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 기사 리스트 */}
      <div className="feed-list">
        {filtered.length === 0 && (
          <div className="feed-empty">
            {searchQuery
              ? "검색 결과가 없습니다."
              : "아카이브된 기사가 없습니다."}
          </div>
        )}

        {grouped.map((group) => (
          <div key={group.label}>
            {/* 날짜 헤더 */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#666",
                padding: "16px 0 8px",
                borderTop: "1px solid #1f1f1f",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {group.label} · {group.items.length}개
            </div>
            {/* 기사 카드들 */}
            {group.items.map((a) => {
              const catColor =
                CATEGORY_COLORS[a.source_category] || "#888";
              return (
                <div
                  key={a.id}
                  className="feed-card"
                  onClick={() => window.open(a.url, "_blank")}
                >
                  <div className="feed-card-meta">
                    <span
                      className="source-badge"
                      style={{
                        background: `${catColor}22`,
                        color: catColor,
                      }}
                    >
                      {a.source_name || a.source_category}
                    </span>
                    <span className="card-time">
                      {timeAgo(a.collected_at)}
                    </span>
                    <span
                      className={`status-badge status-${a.status}`}
                    >
                      {STATUS_LABELS[a.status] || a.status}
                    </span>
                  </div>
                  <h3>{a.title}</h3>
                  {a.summary && (
                    <p className="feed-card-summary">
                      {a.summary.slice(0, 150)}
                      {a.summary.length > 150 ? "..." : ""}
                    </p>
                  )}
                  {!a.summary && a.content && (
                    <p className="feed-card-summary">
                      {a.content.slice(0, 120)}
                      {a.content.length > 120 ? "..." : ""}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* 더보기 버튼 */}
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 16,
              borderRadius: 8,
              border: "1px solid #2a2a2a",
              background: "#111",
              color: "#999",
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? "불러오는 중..." : "더 보기"}
          </button>
        )}
      </div>
    </div>
  );
}