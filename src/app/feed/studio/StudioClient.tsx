"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Archive,
  BrainCircuit,
  Inbox,
  LoaderCircle,
  LogOut,
  Search,
  Send,
} from "lucide-react";
import type {
  CategoryCount,
  FeedArticle,
  FeedArticlePage,
  FeedCounts,
} from "@/lib/feed-data";
import { CategorySidebar } from "../components/CategorySidebar";
import { FeedCard } from "../components/FeedCard";
import { FeedSidebar } from "../components/FeedSidebar";

interface StudioClientProps {
  initialPage: FeedArticlePage;
  categories: CategoryCount[];
  counts: FeedCounts;
}

const STATUS_FILTERS = [
  { key: "inbox", label: "Inbox", icon: Inbox },
  { key: "analyzed", label: "분석됨", icon: BrainCircuit },
  { key: "posted", label: "PR 생성", icon: Send },
  { key: "archived", label: "보관", icon: Archive },
];

export function StudioClient({
  initialPage,
  categories,
  counts,
}: StudioClientProps) {
  const [articles, setArticles] = useState<FeedArticle[]>(initialPage.articles);
  const [total, setTotal] = useState(initialPage.total);
  const [hasMore, setHasMore] = useState(initialPage.hasMore);
  const [status, setStatus] = useState("inbox");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(false);
  const abortController = useRef<AbortController | null>(null);

  const loadArticles = useCallback(
    async (offset: number, append: boolean) => {
      abortController.current?.abort();
      const controller = new AbortController();
      abortController.current = controller;
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        status,
        category,
        q: search,
        limit: "20",
        offset: String(offset),
      });

      try {
        const response = await fetch(`/api/feed-admin/articles?${params}`, {
          signal: controller.signal,
        });
        if (response.status === 401) {
          window.location.reload();
          return;
        }
        if (!response.ok) throw new Error("작업 목록을 불러오지 못했습니다.");

        const page: FeedArticlePage = await response.json();
        setArticles((current) =>
          append ? [...current, ...page.articles] : page.articles
        );
        setTotal(page.total);
        setHasMore(page.hasMore);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : "작업 목록을 불러오지 못했습니다."
        );
      } finally {
        if (abortController.current === controller) setLoading(false);
      }
    },
    [category, search, status]
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const timer = window.setTimeout(() => loadArticles(0, false), 200);
    return () => window.clearTimeout(timer);
  }, [loadArticles]);

  const logout = async () => {
    await fetch("/api/feed-admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="feed-layout studio-layout">
      <div className="feed-left-sidebar">
        <CategorySidebar
          activeCat={category}
          categories={categories}
          totalCount={counts.total}
          onSelect={setCategory}
          basePath="/feed/studio"
        />
      </div>

      <main className="feed-main studio-main">
        <header className="studio-header">
          <div>
            <div className="feed-hero-label">Private workspace</div>
            <h1>Feed Studio</h1>
            <p>{total.toLocaleString()}건</p>
          </div>
          <button type="button" className="icon-command" onClick={logout} title="로그아웃">
            <LogOut aria-hidden="true" size={17} />
            <span>로그아웃</span>
          </button>
        </header>

        <div className="studio-status-tabs" role="tablist" aria-label="작업 상태">
          {STATUS_FILTERS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={status === item.key}
                key={item.key}
                className={status === item.key ? "active" : ""}
                onClick={() => setStatus(item.key)}
              >
                <Icon aria-hidden="true" size={14} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="feed-search-wrap studio-search">
          <Search aria-hidden="true" size={16} />
          <input
            type="search"
            className="feed-search"
            placeholder="제목과 요약 검색"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {error && <div className="feed-error" role="alert">{error}</div>}

        <div className={`feed-list ${loading ? "loading" : ""}`} aria-busy={loading}>
          {articles.length === 0 && !loading && (
            <div className="feed-empty">대기 중인 항목이 없습니다.</div>
          )}
          {articles.map((article, index) => (
            <FeedCard
              key={article.id}
              article={article}
              index={index + 1}
              href={`/feed/studio/${article.id}`}
              showStatus
            />
          ))}
          {hasMore && (
            <button
              type="button"
              className="feed-load-more"
              onClick={() => loadArticles(articles.length, true)}
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
