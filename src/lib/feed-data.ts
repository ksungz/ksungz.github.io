import { createClient } from "@/lib/supabase-server";

export interface FeedArticle {
  id: number;
  source_id: number;
  title: string;
  url: string;
  source_url: string | null;
  content: string | null;
  summary: string | null;
  importance_score: number;
  points: number;
  status: string;
  tags: string[];
  published_at: string | null;
  collected_at: string;
  read_at: string | null;
  analyzed_at: string | null;
  posted_at: string | null;
  source_name: string;
  source_category: string;
}

// Supabase join 결과: feed_sources는 배열로 옴
interface RawArticleRow {
  id: number;
  source_id: number;
  title: string;
  url: string;
  source_url: string | null;
  content: string | null;
  summary: string | null;
  importance_score: number | null;
  points: number | null;
  status: string;
  tags: string[] | null;
  published_at: string | null;
  collected_at: string;
  read_at: string | null;
  analyzed_at: string | null;
  posted_at: string | null;
  feed_sources: { name: string; category: string }[];
}

function toFeedArticle(a: RawArticleRow): FeedArticle {
  const src = a.feed_sources?.[0];
  return {
    id: a.id,
    source_id: a.source_id,
    title: a.title,
    url: a.url,
    source_url: a.source_url,
    content: a.content,
    summary: a.summary,
    importance_score: a.importance_score || 0,
    points: a.points || 0,
    status: a.status,
    tags: a.tags || [],
    published_at: a.published_at,
    collected_at: a.collected_at,
    read_at: a.read_at,
    analyzed_at: a.analyzed_at,
    posted_at: a.posted_at,
    source_name: src?.name || "",
    source_category: src?.category || "dev",
  };
}

export async function fetchArticles(
  statusFilter: string = "all",
  catFilter: string = "all",
  searchQuery: string = ""
): Promise<FeedArticle[]> {
  const supabase = createClient();

  let query = supabase
    .from("feed_articles")
    .select(
      `
      id, source_id, title, url, source_url, content, summary, importance_score, points,
      status, tags, published_at, collected_at, read_at, analyzed_at, posted_at,
      feed_sources!inner(name, category)
    `
    )
    .order("importance_score", { ascending: false })
    .limit(50);

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[feed] fetchArticles error:", error.message);
    return [];
  }

  let articles = (data as unknown as RawArticleRow[] || []).map(toFeedArticle);

  if (catFilter !== "all") {
    articles = articles.filter((a) => a.source_category === catFilter);
  }

  // 검색 — title, summary, content에서 매칭
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    articles = articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.summary?.toLowerCase().includes(q) ||
        a.content?.toLowerCase().includes(q)
    );
  }

  return articles;
}

export async function fetchArticleById(
  id: number
): Promise<FeedArticle | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feed_articles")
    .select(
      `
      id, source_id, title, url, source_url, content, summary, importance_score, points,
      status, tags, published_at, collected_at, read_at, analyzed_at, posted_at,
      feed_sources!inner(name, category)
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return toFeedArticle(data as unknown as RawArticleRow);
}

export async function fetchAnalyzedArticles(): Promise<FeedArticle[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feed_articles")
    .select(
      `
      id, title, url,
      feed_sources!inner(name, category)
    `
    )
    .eq("status", "analyzed")
    .order("analyzed_at", { ascending: false });

  if (error) return [];

  return (data as unknown as RawArticleRow[] || []).map(toFeedArticle);
}

// ════════════════════════════════════════════════════════════════
// M1 추가 데이터 함수
// ════════════════════════════════════════════════════════════════

export interface FeedSourceWithCount {
  id: number;
  name: string;
  category: string;
  article_count: number;
  latest_collected: string | null;
}

/** feed_sources 테이블에서 매체별 기사 수 집계 */
export async function fetchSources(): Promise<FeedSourceWithCount[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feed_sources")
    .select(
      `
      id, name, category,
      feed_articles(id, collected_at)
    `
    )
    .order("name", { ascending: true });

  if (error) {
    console.error("[feed] fetchSources error:", error.message);
    return [];
  }

  if (!data) return [];

  const sources = (data as unknown as Array<{
    id: number;
    name: string;
    category: string;
    url: string | null;
    feed_articles: Array<{ id: number; collected_at: string }> | null;
  }>) || [];

  return sources
    .map((s) => {
      const articles = s.feed_articles || [];
      const latestCollected = articles.reduce<string | null>((max, a) => {
        if (!max || (a.collected_at && a.collected_at > max)) {
          return a.collected_at;
        }
        return max;
      }, null);
      return {
        id: s.id,
        name: s.name,
        category: s.category,
        url: s.url,
        article_count: articles.length,
        latest_collected: latestCollected,
      };
    })
    .sort((a, b) => b.article_count - a.article_count);
}

export interface CategoryCount {
  category: string;
  count: number;
}

/** category별 기사 수 집계 */
export async function fetchCategories(): Promise<CategoryCount[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feed_articles")
    .select(
      `
      id,
      feed_sources!inner(category)
    `
    );

  if (error) {
    console.error("[feed] fetchCategories error:", error.message);
    return [];
  }

  if (!data) return [];

  const rows = (data as unknown as Array<{
    id: number;
    feed_sources: Array<{ category: string }> | null;
  }>) || [];

  const counts = new Map<string, number>();
  for (const row of rows) {
    const cat = row.feed_sources?.[0]?.category || "dev";
    counts.set(cat, (counts.get(cat) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export interface TopicCount {
  tag: string;
  count: number;
}

/** feed_articles.tags 배열에서 top 8 태그 추출 (archived 제외) */
export async function fetchTopics(): Promise<TopicCount[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feed_articles")
    .select("tags")
    .neq("status", "archived");

  if (error) {
    console.error("[feed] fetchTopics error:", error.message);
    return [];
  }

  if (!data) return [];

  const tagCounts = new Map<string, number>();
  for (const row of data) {
    const tags = row.tags as string[] | null;
    if (!tags) continue;
    for (const tag of tags) {
      if (!tag) continue;
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

/** 전체 아카이브 (status 무관, 최신순, feed_sources join) */
export async function fetchArchivedArticles(
  limit: number = 100,
  offset: number = 0
): Promise<FeedArticle[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("feed_articles")
    .select(
      `
      id, source_id, title, url, source_url, content, summary, importance_score, points,
      status, tags, published_at, collected_at, read_at, analyzed_at, posted_at,
      feed_sources!inner(name, category)
    `
    )
    .order("collected_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[feed] fetchArchivedArticles error:", error.message);
    return [];
  }

  return (data as unknown as RawArticleRow[] || []).map(toFeedArticle);
}