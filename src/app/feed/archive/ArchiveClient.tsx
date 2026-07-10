"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { FeedArticle } from "@/lib/feed-data";
import { CategorySidebar } from "../components/CategorySidebar";
import { FeedSidebar } from "../components/FeedSidebar";
import { FeedCard } from "../components/FeedCard";

interface ArchiveClientProps {
  initialArticles: FeedArticle[];
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
    <div className="feed-layout">
      {/* 좌측: 카테고리 사이드바 */}
      <div className="feed-left-sidebar">
        <CategorySidebar activeCat={catFilter} onSelect={setCatFilter} />
      </div>

      {/* 메인 */}
      <main className="feed-main">
        {/* Breadcrumb */}
        <div className="feed-breadcrumb">
          <Link href="/feed">홈</Link>
          <span>/</span>
          <span className="feed-breadcrumb-current">아카이브</span>
        </div>

        {/* 페이지 헤더 */}
        <div className="feed-page-header">
          <h1>🗂️ 전체 아카이브</h1>
          <p className="feed-page-header-desc">
            총 {articles.length}+개 기사
          </p>
        </div>

        {/* 검색 */}
        <div className="feed-search-wrap">
          <input
            type="text"
            className="feed-search"
            placeholder="🔍 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 단일 리스트 (날짜 그룹핑 없음) — FeedCard 재사용 */}
        <div className="feed-list">
          {filtered.length === 0 && (
            <div className="feed-empty">
              {searchQuery
                ? "검색 결과가 없습니다."
                : "아카이브된 기사가 없습니다."}
            </div>
          )}

          {filtered.map((article, i) => (
            <FeedCard
              key={article.id}
              article={article}
              index={i + 1}
            />
          ))}

          {hasMore && (
            <button
              className="feed-load-more"
              onClick={loadMore}
              disabled={loading}
              style={loading ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            >
              {loading ? "불러오는 중..." : "더 보기"}
            </button>
          )}
        </div>
      </main>

      {/* 우측: 사이드바 */}
      <FeedSidebar
        totalCount={articles.length}
        analyzedCount={0}
        postedCount={0}
      />
    </div>
  );
}