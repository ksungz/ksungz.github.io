"use client";

import { useState, useMemo } from "react";
import type { FeedArticle, CategoryCount, TopicCount } from "@/lib/feed-data";
import { FeedList } from "./FeedList";
import { ReaderDetail } from "./ReaderDetail";
import { AnalyzedList } from "./AnalyzedList";
import "./feed.css";

interface FeedCounts {
  total: number;
  analyzed: number;
  posted: number;
  sourceCount: number;
  categoryCount: number;
}

interface FeedClientProps {
  initialArticles: FeedArticle[];
  initialAnalyzed: FeedArticle[];
  initialCategories: CategoryCount[];
  initialTopics: TopicCount[];
  counts: FeedCounts;
}

export function FeedClient({
  initialArticles,
  initialAnalyzed,
  initialCategories,
  initialTopics,
  counts,
}: FeedClientProps) {
  const [view, setView] = useState<"feed" | "reader" | "analyzed">("feed");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [articles] = useState<FeedArticle[]>(initialArticles);
  const [analyzed] = useState<FeedArticle[]>(initialAnalyzed);
  const [statusFilter, setStatusFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(20);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (catFilter !== "all" && a.source_category !== catFilter) return false;
      if (activeTag && !a.tags?.includes(activeTag)) return false;
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
  }, [articles, statusFilter, catFilter, activeTag, searchQuery]);

  const visibleArticles = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;

  const openReader = (id: number) => {
    setSelectedId(id);
    setView("reader");
    window.scrollTo(0, 0);
  };

  const backToList = () => {
    setView("feed");
    setSelectedId(null);
    window.scrollTo(0, 0);
  };

  const goAnalyzed = () => {
    setView("analyzed");
    window.scrollTo(0, 0);
  };

  const goFeed = () => {
    setView("feed");
    window.scrollTo(0, 0);
  };

  const selectedArticle = articles.find((a) => a.id === selectedId) || null;

  return (
    <>
      {view === "feed" && (
        <FeedList
          articles={visibleArticles}
          totalCount={filtered.length}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          catFilter={catFilter}
          setCatFilter={setCatFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenReader={openReader}
          hasMore={hasMore}
          onLoadMore={() => setDisplayCount((c) => c + 20)}
          categories={initialCategories}
          topics={initialTopics}
          counts={counts}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      )}
      {view === "reader" && selectedArticle && (
        <ReaderDetail article={selectedArticle} onBack={backToList} />
      )}
      {view === "analyzed" && <AnalyzedList items={analyzed} />}

      <div className="feed-tabbar">
        <button
          className={`feed-tab ${view === "feed" ? "active" : ""}`}
          onClick={goFeed}
        >
          <span className="feed-tab-icon">📰</span>피드
        </button>
        <button
          className={`feed-tab ${view === "analyzed" ? "active" : ""}`}
          onClick={goAnalyzed}
        >
          <span className="feed-tab-icon">📝</span>대기
        </button>
        <button className="feed-tab" onClick={() => alert("설정 (예정)")}>
          <span className="feed-tab-icon">⚙️</span>설정
        </button>
      </div>
    </>
  );
}