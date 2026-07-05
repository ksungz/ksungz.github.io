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
  const [analysisResult, setAnalysisResult] = useState<{
    summary: string;
    keyInsights: string[];
    blogAngle: string;
    tags: string[];
    applicableIdeas: string[];
  } | null>(null);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 읽음 처리
  useState(() => {
    if (article.status === "unread") {
      fetch(`/api/feed/${article.id}/read`, { method: "POST" }).catch(() => {});
    }
  });

  if (archived) {
    return (
      <div className="feed-reader">
        <span className="reader-back" onClick={onBack}>← 목록으로</span>
        <div className="feed-empty">📦 보관되었습니다.</div>
      </div>
    );
  }

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);
    try {
      const res = await fetch(`/api/feed/${article.id}/analyze`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "분석 실패");
      } else {
        setAnalysisResult(data.analysis);
      }
    } catch {
      setError("네트워크 오류");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleBlog = async () => {
    setBlogging(true);
    setError(null);
    try {
      const res = await fetch(`/api/feed/${article.id}/blog-draft`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "블로그 초안 생성 실패");
      } else {
        setPrUrl(data.prUrl || null);
      }
    } catch {
      setError("네트워크 오류");
    } finally {
      setBlogging(false);
    }
  };

  const isAnalyzed = article.status === "analyzed" || article.status === "posted" || analysisResult !== null;
  const isPosted = article.status === "posted" || prUrl !== null;

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
        {/* AI 수집 요약 */}
        {article.summary && !analysisResult && (
          <div className="analysis-box">
            <h4>📋 AI 요약</h4>
            <p style={{ color: "#ccc", fontSize: "14px", whiteSpace: "pre-wrap" }}>
              {article.summary}
            </p>
          </div>
        )}

        {/* 분석 결과 */}
        {analysisResult && (
          <div className="analysis-box">
            <h4>🔍 상세 분석</h4>
            <p style={{ color: "#ccc", fontSize: "14px" }}>{analysisResult.summary}</p>
            {analysisResult.keyInsights?.length > 0 && (
              <>
                <p style={{ color: "#69db7c", fontSize: "13px", marginTop: "12px" }}><strong>핵심 인사이트:</strong></p>
                {analysisResult.keyInsights.map((insight, i) => (
                  <div key={i} className="analysis-insight">{insight}</div>
                ))}
              </>
            )}
            {analysisResult.blogAngle && (
              <div className="analysis-angle">
                <strong>블로그 각도:</strong> {analysisResult.blogAngle}
              </div>
            )}
          </div>
        )}

        {/* 본문 */}
        {article.content ? (
          <details className="reader-content-toggle">
            <summary>📄 본문 전체 보기</summary>
            <p className="reader-content-text">{article.content}</p>
          </details>
        ) : (
          <p style={{ color: "#666" }}>
            본문 내용이 없습니다. 원문 링크에서 확인하세요.
          </p>
        )}

        {/* PR 링크 */}
        {prUrl && (
          <div className="analysis-box" style={{ borderColor: "#2a4a5c" }}>
            <h4 style={{ color: "#4dabf7" }}>✅ 블로그 PR 생성됨</h4>
            <a href={prUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#4dabf7", fontSize: "14px" }}>
              {prUrl} ↗
            </a>
          </div>
        )}

        {/* 에러 */}
        {error && (
          <div className="analysis-box" style={{ borderColor: "#5c2a2a" }}>
            <h4 style={{ color: "#ff6b6b" }}>❌ {error}</h4>
          </div>
        )}
      </div>

      <div className="feed-actions">
        <button
          className="action-btn btn-analyze"
          onClick={handleAnalyze}
          disabled={analyzing || isAnalyzed}
        >
          {analyzing ? "⏳ 분석 중..." : isAnalyzed ? "✅ 분석 완료" : "🔍 분석"}
        </button>
        <button
          className="action-btn btn-blog"
          onClick={handleBlog}
          disabled={blogging || isPosted || !isAnalyzed}
        >
          {blogging ? "⏳ 초안 작성 중..." : isPosted ? "✅ PR 생성됨" : "✍️ 블로그 초안 PR"}
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