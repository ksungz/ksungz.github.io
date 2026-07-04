import { createClient } from "@/lib/supabase-server";

export interface FeedArticle {
  id: number;
  source_id: number;
  title: string;
  url: string;
  source_url: string | null;
  content: string | null;
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
  catFilter: string = "all"
): Promise<FeedArticle[]> {
  const supabase = createClient();

  let query = supabase
    .from("feed_articles")
    .select(
      `
      id, source_id, title, url, source_url, content, points,
      status, tags, published_at, collected_at, read_at, analyzed_at, posted_at,
      feed_sources!inner(name, category)
    `
    )
    .order("collected_at", { ascending: false })
    .limit(100);

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
      id, source_id, title, url, source_url, content, points,
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