"use client";

import { LoaderCircle, Search } from "lucide-react";
import type {
  CategoryCount,
  FeedArticle,
  FeedCounts,
  TopicCount,
} from "@/lib/feed-data";
import { HeroSection } from "./components/HeroSection";
import { TopicFilter } from "./components/TopicFilter";
import { CategorySidebar } from "./components/CategorySidebar";
import { FeedSidebar } from "./components/FeedSidebar";
import { FeedCard } from "./components/FeedCard";

interface FeedListProps {
  articles: FeedArticle[];
  totalCount: number;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  topics: TopicCount[];
  categories: CategoryCount[];
  counts: FeedCounts;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  loading: boolean;
  error: string | null;
}

export function FeedList({
  articles,
  totalCount,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  hasMore,
  onLoadMore,
  topics,
  categories,
  counts,
  activeTag,
  setActiveTag,
  loading,
  error,
}: FeedListProps) {
  return (
    <div className="feed-layout">
      <div className="feed-left-sidebar">
        <CategorySidebar
          activeCat={categoryFilter}
          categories={categories}
          totalCount={counts.total}
          onSelect={setCategoryFilter}
        />
      </div>

      <main className="feed-main">
        <HeroSection
          sourceCount={counts.sourceCount}
          articleCount={counts.total}
          categoryCount={counts.categoryCount}
        />

        <TopicFilter
          topics={topics}
          activeTag={activeTag}
          onSelect={setActiveTag}
        />

        <div className="feed-search-wrap">
          <Search aria-hidden="true" size={16} />
          <input
            type="search"
            className="feed-search"
            placeholder="제목과 요약 검색"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="feed-list-heading">
          <h2>최신 뉴스</h2>
          <span>{totalCount.toLocaleString()}건</span>
        </div>

        {error && <div className="feed-error" role="alert">{error}</div>}

        <div className={`feed-list ${loading ? "loading" : ""}`} aria-busy={loading}>
          {articles.length === 0 && !loading && (
            <div className="feed-empty">
              {searchQuery ? "검색 결과가 없습니다." : "표시할 기사가 없습니다."}
            </div>
          )}

          {articles.map((article, index) => (
            <FeedCard key={article.id} article={article} index={index + 1} />
          ))}

          {hasMore && (
            <button
              type="button"
              className="feed-load-more"
              onClick={onLoadMore}
              disabled={loading}
            >
              {loading && <LoaderCircle className="spin" aria-hidden="true" size={15} />}
              더 보기
            </button>
          )}
        </div>
      </main>

      <FeedSidebar counts={counts} />
    </div>
  );
}
