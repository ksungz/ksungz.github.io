"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CategoryCount,
  FeedArticle,
  FeedArticlePage,
  FeedCounts,
  TopicCount,
} from "@/lib/feed-data";
import { FeedList } from "./FeedList";
import "./feed.css";

interface FeedClientProps {
  initialPage: FeedArticlePage;
  initialTopics: TopicCount[];
  categories: CategoryCount[];
  counts: FeedCounts;
  initialCategory: string;
  initialSearch: string;
  initialTag: string | null;
}

export function FeedClient({
  initialPage,
  initialTopics,
  categories,
  counts,
  initialCategory,
  initialSearch,
  initialTag,
}: FeedClientProps) {
  const [articles, setArticles] = useState<FeedArticle[]>(initialPage.articles);
  const [total, setTotal] = useState(initialPage.total);
  const [hasMore, setHasMore] = useState(initialPage.hasMore);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
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
        category: categoryFilter,
        q: searchQuery,
        limit: "20",
        offset: String(offset),
      });
      if (activeTag) params.set("tag", activeTag);

      try {
        const response = await fetch(`/api/feed-articles?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("피드를 불러오지 못했습니다.");

        const page: FeedArticlePage = await response.json();
        setArticles((current) =>
          append ? [...current, ...page.articles] : page.articles
        );
        setTotal(page.total);
        setHasMore(page.hasMore);

        const urlParams = new URLSearchParams();
        if (categoryFilter !== "all") urlParams.set("category", categoryFilter);
        if (searchQuery.trim()) urlParams.set("q", searchQuery.trim());
        if (activeTag) urlParams.set("tag", activeTag);
        const nextUrl = urlParams.size > 0 ? `/feed?${urlParams}` : "/feed";
        window.history.replaceState(null, "", nextUrl);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : "피드를 불러오지 못했습니다."
        );
      } finally {
        if (abortController.current === controller) setLoading(false);
      }
    },
    [activeTag, categoryFilter, searchQuery]
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const timer = window.setTimeout(() => loadArticles(0, false), 250);
    return () => window.clearTimeout(timer);
  }, [loadArticles]);

  return (
    <FeedList
      articles={articles}
      totalCount={total}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      hasMore={hasMore}
      onLoadMore={() => loadArticles(articles.length, true)}
      topics={initialTopics}
      categories={categories}
      counts={counts}
      activeTag={activeTag}
      setActiveTag={setActiveTag}
      loading={loading}
      error={error}
    />
  );
}
