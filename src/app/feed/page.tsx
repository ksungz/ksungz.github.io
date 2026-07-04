"use client";

import { useState, useEffect } from "react";
import { FeedPage } from "./FeedPage";
import { ReaderPage } from "./ReaderPage";
import { AnalyzedPage } from "./AnalyzedPage";
import "./feed.css";

export default function Feed() {
  const [view, setView] = useState<"feed" | "reader" | "analyzed">("feed");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");

  // URL 해시로 뷰 동기화 (뒤로가기 지원)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "analyzed") setView("analyzed");
  }, []);

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
    window.location.hash = "analyzed";
    window.scrollTo(0, 0);
  };

  const goFeed = () => {
    setView("feed");
    window.location.hash = "";
    window.scrollTo(0, 0);
  };

  return (
    <>
      {view === "feed" && (
        <FeedPage
          onOpenReader={openReader}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          catFilter={catFilter}
          setCatFilter={setCatFilter}
        />
      )}
      {view === "reader" && selectedId !== null && (
        <ReaderPage articleId={selectedId} onBack={backToList} />
      )}
      {view === "analyzed" && <AnalyzedPage onBack={goFeed} />}

      {/* 하단 탭바 */}
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
        <button className="feed-tab" onClick={() => alert("설정 화면 (예정)")}>
          <span className="feed-tab-icon">⚙️</span>설정
        </button>
      </div>
    </>
  );
}