"use client";

import type { FeedArticle, TopicCount } from "@/lib/feed-data";
import { HeroSection } from "./components/HeroSection";
import { TopicFilter } from "./components/TopicFilter";
import { CategorySidebar } from "./components/CategorySidebar";
import { FeedSidebar } from "./components/FeedSidebar";
import { FeedCard } from "./components/FeedCard";

export interface FeedCounts {
  total: number;
  analyzed: number;
  posted: number;
  sourceCount: number;
  categoryCount: number;
}

interface FeedListProps {
  articles: FeedArticle[];
  totalCount: number;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  catFilter: string;
  setCatFilter: (c: string) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  topics: TopicCount[];
  counts: FeedCounts;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}

export function FeedList({
  articles,
  totalCount,
  statusFilter,
  setStatusFilter,
  catFilter,
  setCatFilter,
  searchQuery,
  setSearchQuery,
  hasMore,
  onLoadMore,
  topics,
  counts,
  activeTag,
  setActiveTag,
}: FeedListProps) {
  return (
    <div className="feed-layout">
      {/* 좌측: 카테고리 사이드바 */}
      <div className="feed-left-sidebar">
        <CategorySidebar
          activeCat={catFilter}
          onSelect={setCatFilter}
        />
      </div>

      {/* 메인 */}
      <main className="feed-main">
        {/* 히어로 섹션 */}
        <HeroSection
          sourceCount={counts.sourceCount}
          articleCount={counts.total}
          categoryCount={counts.categoryCount}
        />

        {/* 토픽 필터 */}
        <TopicFilter
          topics={topics}
          activeTag={activeTag}
          onSelect={setActiveTag}
        />

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

        {/* 상태 필터 */}
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

        {/* 피드 리스트 — 단일 리스트 (날짜 그룹핑 없음) */}
        <div className="feed-list">
          {articles.length === 0 && (
            <div className="feed-empty">
              {searchQuery
                ? "검색 결과가 없습니다."
                : "필터 조건에 맞는 글이 없습니다."}
            </div>
          )}

          {articles.map((article, i) => (
            <FeedCard
              key={article.id}
              article={article}
              index={i + 1}
            />
          ))}

          {hasMore && (
            <button className="feed-load-more" onClick={onLoadMore}>
              더 보기 ({totalCount - articles.length}개 남음)
            </button>
          )}
        </div>
      </main>

      {/* 우측: 통계 사이드바 */}
      <FeedSidebar
        totalCount={counts.total}
        analyzedCount={counts.analyzed}
        postedCount={counts.posted}
      />
    </div>
  );
}