"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  BrainCircuit,
  Check,
  ExternalLink,
  FileText,
  Globe2,
  LoaderCircle,
  Send,
} from "lucide-react";
import type {
  CategoryCount,
  FeedAnalysis,
  FeedArticle,
  FeedCounts,
} from "@/lib/feed-data";
import { getCategoryLabel } from "@/lib/feed-categories";
import { CategorySidebar } from "../components/CategorySidebar";
import { FeedSidebar } from "../components/FeedSidebar";

interface ArticleDetailProps {
  article: FeedArticle;
  counts: FeedCounts;
  categories: CategoryCount[];
  manage?: boolean;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${kstDate.getUTCFullYear()}. ${pad(kstDate.getUTCMonth() + 1)}. ${pad(kstDate.getUTCDate())}. ${pad(kstDate.getUTCHours())}:${pad(kstDate.getUTCMinutes())}`;
}

export function ArticleDetail({
  article,
  counts,
  categories,
  manage = false,
}: ArticleDetailProps) {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [blogging, setBlogging] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FeedAnalysis | null>(
    article.analysis
  );
  const [prUrl, setPrUrl] = useState<string | null>(article.post?.pr_url || null);
  const [visibility, setVisibility] = useState(article.visibility);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!manage || article.status !== "unread") return;

    fetch(`/api/feed/${article.id}/read`, { method: "POST" }).catch(() => {
      // 읽음 처리는 보조 상태이므로 상세 화면을 중단하지 않는다.
    });
  }, [article.id, article.status, manage]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`/api/feed/${article.id}/analyze`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "분석에 실패했습니다.");
      setAnalysisResult(data.analysis);
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "분석에 실패했습니다."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleBlog = async () => {
    setBlogging(true);
    setError(null);

    try {
      const response = await fetch(`/api/feed/${article.id}/blog-draft`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "PR 생성에 실패했습니다.");
      setPrUrl(data.prUrl || null);
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "PR 생성에 실패했습니다."
      );
    } finally {
      setBlogging(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    setError(null);

    try {
      const response = await fetch(`/api/feed/${article.id}/publish`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "공개 승인에 실패했습니다.");
      setVisibility("public");
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "공개 승인에 실패했습니다."
      );
    } finally {
      setPublishing(false);
    }
  };

  const handleArchive = async () => {
    setArchiving(true);
    setError(null);

    try {
      const response = await fetch(`/api/feed/${article.id}/archive`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "보관에 실패했습니다.");
      router.push("/feed/studio");
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "보관에 실패했습니다."
      );
      setArchiving(false);
    }
  };

  const catLabel = getCategoryLabel(article.source_category);
  const basePath = manage ? "/feed/studio" : "/feed";
  const sourceDiscussion =
    article.source_url && article.source_url !== article.url
      ? article.source_url
      : null;

  return (
    <div className="feed-layout">
      <div className="feed-left-sidebar">
        <CategorySidebar
          activeCat={article.source_category}
          categories={categories}
          totalCount={counts.total}
          basePath={basePath}
        />
      </div>

      <main className="feed-main">
        <div className="feed-breadcrumb">
          <Link href={basePath}>{manage ? "Studio" : "피드"}</Link>
          <span>/</span>
          <Link href={`${basePath}?category=${article.source_category}`}>
            {catLabel}
          </Link>
          <span>/</span>
          <span className="feed-breadcrumb-current">{article.title}</span>
        </div>

        <article className="feed-article">
          <header className="feed-article-header">
            <h1>{article.title}</h1>
            <div className="feed-article-meta">
              <span>{article.source_name}</span>
              <span>{formatDate(article.published_at || article.collected_at)}</span>
              <span className={`feed-card-cat ${article.source_category}`}>
                {catLabel}
              </span>
            </div>
          </header>

          {article.summary && (
            <section className="feed-summary" aria-labelledby="summary-title">
              <div id="summary-title" className="feed-section-label">
                자동 요약
              </div>
              <p>{article.summary}</p>
            </section>
          )}

          <div className="feed-original-links">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-original-link"
            >
              원문 보기
              <ExternalLink aria-hidden="true" size={13} />
            </a>
            {sourceDiscussion && (
              <a
                href={sourceDiscussion}
                target="_blank"
                rel="noopener noreferrer"
                className="feed-original-link secondary"
              >
                출처 페이지
                <ExternalLink aria-hidden="true" size={13} />
              </a>
            )}
          </div>

          {analysisResult && (
            <section className="analysis-box" aria-labelledby="analysis-title">
              <div className="analysis-heading">
                <BrainCircuit aria-hidden="true" size={18} />
                <h2 id="analysis-title">상세 분석</h2>
              </div>
              <p className="analysis-summary">{analysisResult.summary}</p>

              {analysisResult.key_insights.length > 0 && (
                <div className="analysis-section">
                  <h3>핵심 포인트</h3>
                  <ul>
                    {analysisResult.key_insights.map((insight) => (
                      <li key={insight}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {manage && analysisResult.blog_angle && (
                <div className="analysis-section analysis-angle">
                  <h3>블로그 관점</h3>
                  <p>{analysisResult.blog_angle}</p>
                </div>
              )}

              {manage && analysisResult.applicable_ideas.length > 0 && (
                <div className="analysis-section">
                  <h3>적용 아이디어</h3>
                  <ul>
                    {analysisResult.applicable_ideas.map((idea) => (
                      <li key={idea}>{idea}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.tags.length > 0 && (
                <div className="analysis-tags">
                  {analysisResult.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </section>
          )}

          {manage && article.content && (
            <details className="reader-content-toggle">
              <summary>
                <FileText aria-hidden="true" size={15} />
                수집 본문 확인
              </summary>
              <p className="reader-content-text">{article.content}</p>
            </details>
          )}

          {prUrl && (
            <section className="feed-pr-result">
              <Check aria-hidden="true" size={16} />
              <a href={prUrl} target="_blank" rel="noopener noreferrer">
                생성된 PR 보기
              </a>
            </section>
          )}

          {error && <div className="feed-error" role="alert">{error}</div>}

          {manage && (
            <div className="feed-actions">
              <button
                type="button"
                className="action-btn btn-analyze"
                onClick={handleAnalyze}
                disabled={analyzing || analysisResult !== null}
              >
                {analyzing ? (
                  <LoaderCircle className="spin" aria-hidden="true" size={15} />
                ) : analysisResult ? (
                  <Check aria-hidden="true" size={15} />
                ) : (
                  <BrainCircuit aria-hidden="true" size={15} />
                )}
                {analysisResult ? "분석 완료" : "상세 분석"}
              </button>
              <button
                type="button"
                className="action-btn btn-publish"
                onClick={handlePublish}
                disabled={publishing || visibility === "public"}
              >
                {publishing ? (
                  <LoaderCircle className="spin" aria-hidden="true" size={15} />
                ) : visibility === "public" ? (
                  <Check aria-hidden="true" size={15} />
                ) : (
                  <Globe2 aria-hidden="true" size={15} />
                )}
                {visibility === "public" ? "공개됨" : "공개 승인"}
              </button>
              <button
                type="button"
                className="action-btn btn-blog"
                onClick={handleBlog}
                disabled={blogging || prUrl !== null || analysisResult === null}
              >
                {blogging ? (
                  <LoaderCircle className="spin" aria-hidden="true" size={15} />
                ) : prUrl ? (
                  <Check aria-hidden="true" size={15} />
                ) : (
                  <Send aria-hidden="true" size={15} />
                )}
                {prUrl ? "PR 생성됨" : "블로그 PR"}
              </button>
              <button
                type="button"
                className="action-btn btn-archive"
                onClick={handleArchive}
                disabled={archiving}
              >
                {archiving ? (
                  <LoaderCircle className="spin" aria-hidden="true" size={15} />
                ) : (
                  <Archive aria-hidden="true" size={15} />
                )}
                보관
              </button>
            </div>
          )}
        </article>
      </main>

      <FeedSidebar counts={counts} />
    </div>
  );
}
