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

  type ArticleRow = Record<string, unknown> & {
    feed_sources?: { name: string; category: string } | null;
  };

  let articles = (data || []).map((a: ArticleRow) => ({
    id: a.id as number,
    source_id: a.source_id as number,
    title: a.title as string,
    url: a.url as string,
    source_url: (a.source_url as string) || null,
    content: (a.content as string) || null,
    points: (a.points as number) || 0,
    status: a.status as string,
    tags: (a.tags as string[]) || [],
    published_at: (a.published_at as string) || null,
    collected_at: a.collected_at as string,
    read_at: (a.read_at as string) || null,
    analyzed_at: (a.analyzed_at as string) || null,
    posted_at: (a.posted_at as string) || null,
    source_name: a.feed_sources?.name || "",
    source_category: a.feed_sources?.category || "dev",
  })) as FeedArticle[];

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

  const a = data as Record<string, unknown> & {
    feed_sources?: { name: string; category: string } | null;
  };
  return {
    id: a.id as number,
    source_id: a.source_id as number,
    title: a.title as string,
    url: a.url as string,
    source_url: (a.source_url as string) || null,
    content: (a.content as string) || null,
    points: (a.points as number) || 0,
    status: a.status as string,
    tags: (a.tags as string[]) || [],
    published_at: (a.published_at as string) || null,
    collected_at: a.collected_at as string,
    read_at: (a.read_at as string) || null,
    analyzed_at: (a.analyzed_at as string) || null,
    posted_at: (a.posted_at as string) || null,
    source_name: a.feed_sources?.name || "",
    source_category: a.feed_sources?.category || "dev",
  } as FeedArticle;
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

  return (data || []).map((a: Record<string, unknown> & {
    feed_sources?: { name: string; category: string } | null;
  }) => ({
    id: a.id as number,
    source_id: 0,
    title: a.title,
    url: a.url,
    source_url: null,
    content: null,
    points: 0,
    status: "analyzed",
    tags: [],
    published_at: null,
    collected_at: "",
    read_at: null,
    analyzed_at: null,
    posted_at: null,
    source_name: a.feed_sources?.name || "",
    source_category: a.feed_sources?.category || "dev",
  })) as FeedArticle[];
}