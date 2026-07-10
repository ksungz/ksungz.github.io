"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { FeedArticle, TopicCount } from "@/lib/feed-data";
import { FeedList, type FeedCounts } from "./FeedList";
import { AnalyzedList } from "./AnalyzedList";
import { CategorySidebar } from "./components/CategorySidebar";
import { FeedSidebar } from "./components/FeedSidebar";
import "./feed.css";

interface FeedClientProps {
  initialArticles: FeedArticle[];
  initialAnalyzed: FeedArticle[];
  initialTopics: TopicCount[];
  counts: FeedCounts;
}

type TabView = "feed" | "analyzed" | "settings";

function TabBar({ tab, setTab }: { tab: TabView; setTab: (t: TabView) => void }) {
  return (
    <div className="feed-tabbar">
      <Link
        href="/feed"
        className={`feed-tab ${tab === "feed" ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setTab("feed");
        }}
      >
        <span className="feed-tab-icon">📰</span>피드
      </Link>
      <button
        className={`feed-tab ${tab === "analyzed" ? "active" : ""}`}
        onClick={() => setTab("analyzed")}
      >
        <span className="feed-tab-icon">📝</span>대기
      </button>
      <button
        className={`feed-tab ${tab === "settings" ? "active" : ""}`}
        onClick={() => setTab("settings")}
      >
        <span className="feed-tab-icon">⚙️</span>설정
      </button>
    </div>
  );
}

export function FeedClient({
  initialArticles,
  initialAnalyzed,
  initialTopics,
  counts,
}: FeedClientProps) {
  const [tab, setTab] = useState<TabView>("feed");
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

  if (tab === "analyzed") {
    return (
      <>
        <div className="feed-layout">
          <div className="feed-left-sidebar">
            <CategorySidebar activeCat={catFilter} onSelect={setCatFilter} />
          </div>
          <main className="feed-main">
            <div className="feed-page-header">
              <div className="feed-breadcrumb">
                <Link href="/feed">홈</Link>
                <span>/</span>
                <span className="feed-breadcrumb-current">분석됨</span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 12 }}>
                📝 분석됨 · 포스팅 대기
              </h1>
              <p className="feed-page-header-desc">
                분석했지만 아직 블로그 초안 안 만든 글
              </p>
            </div>
            <AnalyzedList items={analyzed} />
          </main>
          <FeedSidebar
            totalCount={counts.total}
            analyzedCount={counts.analyzed}
            postedCount={counts.posted}
          />
        </div>
        <TabBar tab={tab} setTab={setTab} />
      </>
    );
  }

  if (tab === "settings") {
    return (
      <>
        <div className="feed-layout">
          <div className="feed-left-sidebar">
            <CategorySidebar activeCat={catFilter} onSelect={setCatFilter} />
          </div>
          <main className="feed-main">
            <div className="feed-page-header">
              <div className="feed-breadcrumb">
                <Link href="/feed">홈</Link>
                <span>/</span>
                <span className="feed-breadcrumb-current">설정</span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 12 }}>
                ⚙️ 설정
              </h1>
              <p className="feed-page-header-desc">피드 설정 (예정)</p>
            </div>
            <div className="feed-empty">설정 기능은 추후 제공됩니다.</div>
          </main>
          <FeedSidebar
            totalCount={counts.total}
            analyzedCount={counts.analyzed}
            postedCount={counts.posted}
          />
        </div>
        <TabBar tab={tab} setTab={setTab} />
      </>
    );
  }

  return (
    <>
      <FeedList
        articles={visibleArticles}
        totalCount={filtered.length}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        catFilter={catFilter}
        setCatFilter={setCatFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasMore={hasMore}
        onLoadMore={() => setDisplayCount((c) => c + 20)}
        topics={initialTopics}
        counts={counts}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <TabBar tab={tab} setTab={setTab} />
    </>
  );
}