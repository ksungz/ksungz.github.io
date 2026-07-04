"use client";

import { useState } from "react";
import type { FeedArticle } from "@/lib/feed-data";

interface ReaderDetailProps {
  article: FeedArticle;
  onBack: () => void;
}

export function ReaderDetail({ article, onBack }: ReaderDetailProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [blogging, setBlogging] = useState(false);
  const [archived, setArchived] = useState(false);

  if (archived) {
    return (
      <div className="feed-reader">
        <span className="reader-back" onClick={onBack}>← 목록으로</span>
        <div className="feed-empty">📦 보관되었습니다.</div>
      </div>
    );
  }

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  const handleBlog = () => {
    setBlogging(true);
    setTimeout(() => setBlogging(false), 3000);
  };

  return (
    <div className="feed-reader">
      <span className="reader-back" onClick={onBack}>← 목록으로</span>

      <div className="reader-header-box">
        <h2>{article.title}</h2>
        <div className="reader-meta">
          <span className={`source-badge ${article.source_category}`}>
            {article.source_name}
          </span>
          <a href={article.source_url || article.url} target="_blank" rel="noopener noreferrer">
            원문 보기 ↗
          </a>
        </div>
      </div>

      <div className="reader-body">
        {article.content ? (
          <p>{article.content}</p>
        ) : (
          <p style={{ color: "#666" }}>
            본문 내용이 없습니다. 원문 링크에서 확인하세요.
          </p>
        )}
      </div>

      <div className="feed-actions">
        <button
          className="action-btn btn-analyze"
          onClick={handleAnalyze}
          disabled={analyzing || article.status === "analyzed" || article.status === "posted"}
        >
          {analyzing ? "⏳ 분석 중..." :
           article.status === "analyzed" || article.status === "posted" ? "✅ 분석 완료" :
           "🔍 분석"}
        </button>
        <button
          className="action-btn btn-blog"
          onClick={handleBlog}
          disabled={blogging || article.status === "posted" || article.status !== "analyzed"}
        >
          {blogging ? "⏳ 초안 작성 중..." :
           article.status === "posted" ? "✅ PR 생성됨" :
           "✍️ 블로그 초안 PR"}
        </button>
        <button
          className="action-btn btn-archive"
          onClick={() => setArchived(true)}
        >
          📦 보관
        </button>
      </div>
    </div>
  );
}