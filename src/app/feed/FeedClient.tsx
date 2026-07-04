"use client";

import { useState } from "react";
import type { FeedArticle } from "@/lib/feed-data";
import { FeedList } from "./FeedList";
import { ReaderDetail } from "./ReaderDetail";
import { AnalyzedList } from "./AnalyzedList";
import "./feed.css";

interface FeedClientProps {
  initialArticles: FeedArticle[];
  initialAnalyzed: FeedArticle[];
}

export function FeedClient({
  initialArticles,
  initialAnalyzed,
}: FeedClientProps) {
  const [view, setView] = useState<"feed" | "reader" | "analyzed">("feed");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [articles] = useState<FeedArticle[]>(initialArticles);
  const [analyzed] = useState<FeedArticle[]>(initialAnalyzed);
  const [statusFilter, setStatusFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = articles.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (catFilter !== "all" && a.source_category !== catFilter) return false;
    return true;
  });

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
          articles={filtered}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          catFilter={catFilter}
          setCatFilter={setCatFilter}
          onOpenReader={openReader}
        />
      )}
      {view === "reader" && selectedArticle && (
        <ReaderDetail article={selectedArticle} onBack={backToList} />
      )}
      {view === "analyzed" && (
        <AnalyzedList items={analyzed} />
      )}

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