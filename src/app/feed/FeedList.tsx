"use client";

import type { FeedArticle, CategoryCount, TopicCount } from "@/lib/feed-data";
import { HeroSection } from "./components/HeroSection";
import { TopicFilter } from "./components/TopicFilter";
import { CategorySidebar } from "./components/CategorySidebar";
import { FeedSidebar } from "./components/FeedSidebar";
import { FeedCard } from "./components/FeedCard";

interface FeedCounts {
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
  onOpenReader: (id: number) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  categories: CategoryCount[];
  topics: TopicCount[];
  counts: FeedCounts;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}

function formatDateGroup(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const dateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  if (dateOnly.getTime() === today.getTime()) return "오늘";
  if (dateOnly.getTime() === yesterday.getTime()) return "어제";

  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
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
  onOpenReader,
  hasMore,
  onLoadMore,
  categories,
  topics,
  counts,
  activeTag,
  setActiveTag,
}: FeedListProps) {
  // 날짜 그룹핑 (collected_at 기준)
  const groups: { label: string; articles: FeedArticle[] }[] = [];
  let currentLabel = "";
  for (const article of articles) {
    const label = formatDateGroup(article.collected_at);
    if (label !== currentLabel) {
      groups.push({ label, articles: [] });
      currentLabel = label;
    }
    groups[groups.length - 1].articles.push(article);
  }

  return (
    <div className="feed-layout">
      {/* 좌측: 카테고리 사이드바 */}
      <div className="feed-left-sidebar">
        <CategorySidebar
          categories={categories}
          activeCat={catFilter}
          onSelect={setCatFilter}
        />
      </div>

      {/* 메인 */}
      <main className="feed-main">
        {/* 헤더: HeroSection + TopicFilter + 검색 + 상태 필터 */}
        <HeroSection
          sourceCount={counts.sourceCount}
          articleCount={counts.total}
          categoryCount={counts.categoryCount}
        />

        <div className="feed-topic-filter">
          <TopicFilter
            topics={topics}
            activeTag={activeTag}
            onSelect={setActiveTag}
          />
        </div>

        <div className="feed-search-wrap">
          <input
            type="text"
            className="feed-search"
            placeholder="🔍 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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

        {/* 피드 리스트 — 날짜 그룹핑 */}
        <div className="feed-list">
          {articles.length === 0 && (
            <div className="feed-empty">
              {searchQuery
                ? "검색 결과가 없습니다."
                : "필터 조건에 맞는 글이 없습니다."}
            </div>
          )}

          {groups.map((group, gi) => (
            <div key={`${group.label}-${gi}`} className="feed-date-group">
              <h3 className="feed-date-label">{group.label}</h3>
              {group.articles.map((article) => (
                <FeedCard
                  key={article.id}
                  article={article}
                  onClick={onOpenReader}
                />
              ))}
            </div>
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