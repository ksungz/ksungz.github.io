"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { FeedArticle } from "@/lib/feed-data";
import { CategorySidebar } from "../components/CategorySidebar";
import { FeedSidebar } from "../components/FeedSidebar";

const CAT_LABELS: Record<string, string> = {
  dev: "개발",
  business: "비즈니스",
  youtube: "YouTube",
  social: "소셜",
};

interface ArticleDetailProps {
  article: FeedArticle;
}

interface AnalysisResult {
  summary: string;
  keyInsights: string[];
  blogAngle: string;
  tags: string[];
  applicableIdeas: string[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [blogging, setBlogging] = useState(false);
  const [archived, setArchived] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState("all");

  // 읽음 처리
  useEffect(() => {
    if (article.status === "unread") {
      fetch(`/api/feed/${article.id}/read`, { method: "POST" }).catch(() => {});
    }
  }, [article.id, article.status]);

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

  const handleArchive = async () => {
    try {
      await fetch(`/api/feed/${article.id}/archive`, { method: "POST" });
      setArchived(true);
    } catch {
      setError("보관 실패");
    }
  };

  const isAnalyzed =
    article.status === "analyzed" ||
    article.status === "posted" ||
    analysisResult !== null;
  const isPosted = article.status === "posted" || prUrl !== null;

  const catLabel = CAT_LABELS[article.source_category] || article.source_category;

  if (archived) {
    return (
      <div className="feed-layout">
        <div className="feed-left-sidebar">
          <CategorySidebar activeCat={catFilter} onSelect={setCatFilter} />
        </div>
        <main className="feed-main">
          <div className="feed-breadcrumb">
            <Link href="/feed">홈</Link>
            <span>/</span>
            <span className="feed-breadcrumb-current">보관됨</span>
          </div>
          <div className="feed-empty">📦 보관되었습니다.</div>
        </main>
        <FeedSidebar totalCount={0} analyzedCount={0} postedCount={0} />
      </div>
    );
  }

  return (
    <div className="feed-layout">
      {/* 좌측: 카테고리 사이드바 */}
      <div className="feed-left-sidebar">
        <CategorySidebar activeCat={catFilter} onSelect={setCatFilter} />
      </div>

      {/* 메인: 기사 상세 */}
      <main className="feed-main">
        {/* Breadcrumb */}
        <div className="feed-breadcrumb">
          <Link href="/feed">홈</Link>
          <span>/</span>
          <Link href={`/feed?cat=${article.source_category}`}>{catLabel}</Link>
          <span>/</span>
          <span className="feed-breadcrumb-current">
            {article.title.length > 30
              ? article.title.slice(0, 30) + "..."
              : article.title}
          </span>
        </div>

        <article className="feed-article">
          {/* 헤더 */}
          <div className="feed-article-header">
            <h1>{article.title}</h1>
            <div className="feed-article-meta">
              <Link
                href={article.source_url || article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="feed-article-source-link"
              >
                {article.source_name} ↗
              </Link>
              <span className="feed-article-time">
                {formatDate(article.published_at || article.collected_at)}
              </span>
              <span className={`feed-card-cat ${article.source_category}`}>
                {catLabel}
              </span>
            </div>
          </div>

          {/* 핵심 요약 (doc-subtitle) */}
          {article.summary && (
            <div className="feed-doc-subtitle">{article.summary}</div>
          )}

          {/* 원문 보기 링크 */}
          <a
            href={article.source_url || article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="feed-original-link"
          >
            원문 보기 ↗
          </a>

          {/* 분석 결과 */}
          {analysisResult && (
            <div className="analysis-box">
              <h4>🔍 상세 분석</h4>
              <p style={{ color: "#ccc", fontSize: "14px" }}>{analysisResult.summary}</p>
              {analysisResult.keyInsights?.length > 0 && (
                <>
                  <p style={{ color: "#69db7c", fontSize: "13px", marginTop: "12px" }}>
                    <strong>핵심 인사이트:</strong>
                  </p>
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

          {/* 본문 토글 */}
          {article.content ? (
            <details className="reader-content-toggle">
              <summary>📄 본문 전체 보기</summary>
              <p className="reader-content-text">{article.content}</p>
            </details>
          ) : (
            <p style={{ color: "#666", fontSize: 14 }}>
              본문 내용이 없습니다. 원문 링크에서 확인하세요.
            </p>
          )}

          {/* PR 링크 */}
          {prUrl && (
            <div className="analysis-box" style={{ borderColor: "#2a4a5c" }}>
              <h4 style={{ color: "#4dabf7" }}>✅ 블로그 PR 생성됨</h4>
              <a
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4dabf7", fontSize: "14px" }}
              >
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

          {/* 액션 버튼 */}
          <div className="feed-actions">
            <button
              className="action-btn btn-analyze"
              onClick={handleAnalyze}
              disabled={analyzing || isAnalyzed}
            >
              {analyzing ? "⏳ 분석 중..." : isAnalyzed ? "✅ 분석 완료" : "🔍 AI 분석"}
            </button>
            <button
              className="action-btn btn-blog"
              onClick={handleBlog}
              disabled={blogging || isPosted || !isAnalyzed}
            >
              {blogging ? "⏳ 초안 작성 중..." : isPosted ? "✅ PR 생성됨" : "✍️ 블로그 PR"}
            </button>
            <button
              className="action-btn btn-archive"
              onClick={handleArchive}
            >
              📦 보관
            </button>
          </div>
        </article>
      </main>

      {/* 우측: 사이드바 */}
      <FeedSidebar totalCount={0} analyzedCount={0} postedCount={0} />
    </div>
  );
}