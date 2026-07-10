import { createClient } from "@/lib/supabase-server";

export interface FeedAnalysis {
  summary: string;
  key_insights: string[];
  blog_angle: string;
  tags: string[];
  relevant_projects: string[];
  applicable_ideas: string[];
  created_at: string;
}

export interface FeedPost {
  pr_url: string | null;
  branch_name: string | null;
  mdx_path: string | null;
  created_at: string;
}

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
  analysis: FeedAnalysis | null;
  post: FeedPost | null;
}

export interface FeedCounts {
  total: number;
  analyzed: number;
  posted: number;
  sourceCount: number;
  categoryCount: number;
}

interface SourceRelation {
  name: string;
  category: string;
  active?: boolean;
}

interface RawAnalysisRelation {
  summary: string | null;
  key_insights: string[] | null;
  blog_angle: string | null;
  tags: string[] | null;
  relevant_projects: string[] | null;
  applicable_ideas: string[] | null;
  created_at: string;
}

interface RawPostRelation {
  pr_url: string | null;
  branch_name: string | null;
  mdx_path: string | null;
  created_at: string;
}

interface RawArticleRow {
  id: number;
  source_id: number;
  title: string;
  url: string;
  source_url: string | null;
  content?: string | null;
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
  feed_sources: SourceRelation | SourceRelation[] | null;
  feed_analyses?: RawAnalysisRelation | RawAnalysisRelation[] | null;
  feed_posts?: RawPostRelation | RawPostRelation[] | null;
}

const ARTICLE_LIST_SELECT = `
  id, source_id, title, url, source_url, summary, importance_score, points,
  status, tags, published_at, collected_at, read_at, analyzed_at, posted_at,
  feed_sources!inner(name, category, active),
  feed_analyses(summary, key_insights, blog_angle, tags, relevant_projects, applicable_ideas, created_at),
  feed_posts(pr_url, branch_name, mdx_path, created_at)
`;

const ARTICLE_DETAIL_SELECT = `
  id, source_id, title, url, source_url, content, summary, importance_score, points,
  status, tags, published_at, collected_at, read_at, analyzed_at, posted_at,
  feed_sources!inner(name, category, active),
  feed_analyses(summary, key_insights, blog_angle, tags, relevant_projects, applicable_ideas, created_at),
  feed_posts(pr_url, branch_name, mdx_path, created_at)
`;

function firstRelation<T>(relation: T | T[] | null | undefined): T | null {
  if (!relation) return null;
  return Array.isArray(relation) ? relation[0] || null : relation;
}

function toFeedArticle(row: RawArticleRow): FeedArticle {
  const source = firstRelation(row.feed_sources);
  const analysis = firstRelation(row.feed_analyses);
  const post = firstRelation(row.feed_posts);

  return {
    id: row.id,
    source_id: row.source_id,
    title: row.title,
    url: row.url,
    source_url: row.source_url,
    content: row.content ?? null,
    summary: row.summary,
    importance_score: row.importance_score || 0,
    points: row.points || 0,
    status: row.status,
    tags: row.tags || analysis?.tags || [],
    published_at: row.published_at,
    collected_at: row.collected_at,
    read_at: row.read_at,
    analyzed_at: row.analyzed_at,
    posted_at: row.posted_at,
    source_name: source?.name || "알 수 없는 출처",
    source_category: source?.category || "dev",
    analysis: analysis
      ? {
          summary: analysis.summary || "",
          key_insights: analysis.key_insights || [],
          blog_angle: analysis.blog_angle || "",
          tags: analysis.tags || [],
          relevant_projects: analysis.relevant_projects || [],
          applicable_ideas: analysis.applicable_ideas || [],
          created_at: analysis.created_at,
        }
      : null,
    post: post
      ? {
          pr_url: post.pr_url,
          branch_name: post.branch_name,
          mdx_path: post.mdx_path,
          created_at: post.created_at,
        }
      : null,
  };
}

export interface FetchArticlesOptions {
  status?: string;
  category?: string;
  search?: string;
  tag?: string | null;
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
  order?: "latest" | "importance";
}

export interface FeedArticlePage {
  articles: FeedArticle[];
  total: number;
  hasMore: boolean;
}

export function toPublicFeedArticle(article: FeedArticle): FeedArticle {
  return {
    ...article,
    content: null,
    read_at: null,
    analysis: article.analysis
      ? {
          ...article.analysis,
          blog_angle: "",
          relevant_projects: [],
          applicable_ideas: [],
        }
      : null,
    post: article.post
      ? {
          ...article.post,
          branch_name: null,
          mdx_path: null,
        }
      : null,
  };
}

export function toPublicFeedPage(page: FeedArticlePage): FeedArticlePage {
  return {
    ...page,
    articles: page.articles.map(toPublicFeedArticle),
  };
}

function cleanSearchTerm(value: string): string {
  return value.replace(/[%_*,()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

export async function fetchArticlesPage({
  status = "all",
  category = "all",
  search = "",
  tag = null,
  limit = 20,
  offset = 0,
  includeArchived = false,
  order = "latest",
}: FetchArticlesOptions = {}): Promise<FeedArticlePage> {
  const supabase = createClient();
  const safeLimit = Math.min(Math.max(limit, 1), 50);
  const safeOffset = Math.max(offset, 0);

  let taggedArticleIds: number[] | null = null;
  if (tag) {
    const { data: tagRows, error: tagError } = await supabase
      .from("feed_analyses")
      .select("article_id")
      .contains("tags", [tag]);

    if (tagError) {
      console.error("[feed] tag lookup error:", tagError.message);
      return { articles: [], total: 0, hasMore: false };
    }

    taggedArticleIds = (tagRows || []).map((row) => row.article_id as number);
    if (taggedArticleIds.length === 0) {
      return { articles: [], total: 0, hasMore: false };
    }
  }

  let query = supabase
    .from("feed_articles")
    .select(ARTICLE_LIST_SELECT, { count: "exact" });

  if (!includeArchived) query = query.neq("status", "archived");

  if (status === "inbox") {
    query = query.in("status", ["unread", "read"]);
  } else if (status !== "all") {
    query = query.eq("status", status);
  }

  if (category !== "all") {
    query = query.eq("feed_sources.category", category);
  }

  if (taggedArticleIds) {
    query = query.in("id", taggedArticleIds);
  }

  const cleanSearch = cleanSearchTerm(search);
  if (cleanSearch) {
    query = query.or(
      `title.ilike.%${cleanSearch}%,summary.ilike.%${cleanSearch}%`
    );
  }

  query =
    order === "importance"
      ? query
          .order("importance_score", { ascending: false, nullsFirst: false })
          .order("collected_at", { ascending: false })
      : query
          .order("published_at", { ascending: false, nullsFirst: false })
          .order("collected_at", { ascending: false });

  const { data, error, count } = await query.range(
    safeOffset,
    safeOffset + safeLimit - 1
  );

  if (error) {
    console.error("[feed] fetchArticlesPage error:", error.message);
    return { articles: [], total: 0, hasMore: false };
  }

  const articles = ((data as unknown as RawArticleRow[]) || []).map(toFeedArticle);
  const total = count || 0;
  return {
    articles,
    total,
    hasMore: safeOffset + articles.length < total,
  };
}

export async function fetchArticles(
  statusFilter: string = "all",
  catFilter: string = "all",
  searchQuery: string = ""
): Promise<FeedArticle[]> {
  const page = await fetchArticlesPage({
    status: statusFilter,
    category: catFilter,
    search: searchQuery,
    limit: 50,
    order: "importance",
  });
  return page.articles;
}

export async function fetchArticleById(id: number): Promise<FeedArticle | null> {
  if (!Number.isInteger(id) || id <= 0) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("feed_articles")
    .select(ARTICLE_DETAIL_SELECT)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return toFeedArticle(data as unknown as RawArticleRow);
}

export async function fetchAnalyzedArticles(): Promise<FeedArticle[]> {
  const page = await fetchArticlesPage({
    status: "analyzed",
    limit: 50,
    order: "latest",
  });
  return page.articles;
}

export async function fetchFeedCounts(): Promise<FeedCounts> {
  const supabase = createClient();
  const [totalResult, analyzedResult, postedResult, sourcesResult, categoriesResult] =
    await Promise.all([
      supabase
        .from("feed_articles")
        .select("id", { count: "exact", head: true })
        .neq("status", "archived"),
      supabase
        .from("feed_articles")
        .select("id", { count: "exact", head: true })
        .in("status", ["analyzed", "posted"]),
      supabase
        .from("feed_articles")
        .select("id", { count: "exact", head: true })
        .eq("status", "posted"),
      supabase
        .from("feed_sources")
        .select("id", { count: "exact", head: true })
        .eq("active", true),
      supabase.from("feed_sources").select("category").eq("active", true),
    ]);

  const errors = [
    totalResult.error,
    analyzedResult.error,
    postedResult.error,
    sourcesResult.error,
    categoriesResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    console.error(
      "[feed] fetchFeedCounts error:",
      errors.map((error) => error?.message).join("; ")
    );
  }

  const categoryCount = new Set(
    (categoriesResult.data || []).map((row) => row.category).filter(Boolean)
  ).size;

  return {
    total: totalResult.count || 0,
    analyzed: analyzedResult.count || 0,
    posted: postedResult.count || 0,
    sourceCount: sourcesResult.count || 0,
    categoryCount,
  };
}

export interface FeedSourceWithCount {
  id: number;
  name: string;
  category: string;
  type: string;
  feed_url: string | null;
  active: boolean;
  article_count: number;
  latest_collected: string | null;
}

interface RawSourceCountRow {
  id: number;
  name: string;
  category: string;
  type: string;
  feed_url: string | null;
  active: boolean;
  article_count: Array<{ count: number }> | null;
  latest_articles: Array<{ collected_at: string }> | null;
}

export async function fetchSources(
  includeInactive: boolean = false
): Promise<FeedSourceWithCount[]> {
  const supabase = createClient();
  let query = supabase
    .from("feed_sources")
    .select(
      `
      id, name, category, type, feed_url, active,
      article_count:feed_articles(count),
      latest_articles:feed_articles(collected_at)
    `
    )
    .order("name", { ascending: true })
    .order("collected_at", {
      ascending: false,
      referencedTable: "latest_articles",
    })
    .limit(1, { referencedTable: "latest_articles" });

  if (!includeInactive) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) {
    console.error("[feed] fetchSources error:", error.message);
    return [];
  }

  return (((data as unknown as RawSourceCountRow[]) || []).map((source) => ({
    id: source.id,
    name: source.name,
    category: source.category,
    type: source.type,
    feed_url: source.feed_url,
    active: source.active,
    article_count: source.article_count?.[0]?.count || 0,
    latest_collected: source.latest_articles?.[0]?.collected_at || null,
  })) as FeedSourceWithCount[]).sort(
    (left, right) => right.article_count - left.article_count
  );
}

export interface CategoryCount {
  category: string;
  count: number;
}

export async function fetchCategories(): Promise<CategoryCount[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("feed_sources")
    .select("category, article_count:feed_articles(count)")
    .eq("active", true);

  if (error) {
    console.error("[feed] fetchCategories error:", error.message);
    return [];
  }

  const counts = new Map<string, number>();
  for (const row of (data || []) as unknown as Array<{
    category: string;
    article_count: Array<{ count: number }> | null;
  }>) {
    counts.set(
      row.category,
      (counts.get(row.category) || 0) + (row.article_count?.[0]?.count || 0)
    );
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count);
}

export interface TopicCount {
  tag: string;
  count: number;
}

export async function fetchTopics(days: number = 7): Promise<TopicCount[]> {
  const supabase = createClient();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const [analysisResult, articleResult] = await Promise.all([
    supabase
      .from("feed_analyses")
      .select("article_id, tags")
      .gte("created_at", since),
    supabase
      .from("feed_articles")
      .select("id, tags")
      .gte("collected_at", since)
      .neq("status", "archived"),
  ]);

  if (analysisResult.error || articleResult.error) {
    console.error(
      "[feed] fetchTopics error:",
      analysisResult.error?.message || articleResult.error?.message
    );
    return [];
  }

  const tagsByArticle = new Map<number, Set<string>>();
  for (const row of analysisResult.data || []) {
    tagsByArticle.set(row.article_id, new Set((row.tags as string[] | null) || []));
  }
  for (const row of articleResult.data || []) {
    const tags = tagsByArticle.get(row.id) || new Set<string>();
    for (const tag of (row.tags as string[] | null) || []) tags.add(tag);
    tagsByArticle.set(row.id, tags);
  }

  const tagCounts = new Map<string, number>();
  for (const tags of tagsByArticle.values()) {
    for (const tag of tags) {
      const normalized = tag.trim();
      if (!normalized) continue;
      tagCounts.set(normalized, (tagCounts.get(normalized) || 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 8);
}

export async function fetchArchivedArticles(
  limit: number = 100,
  offset: number = 0
): Promise<FeedArticle[]> {
  const page = await fetchArticlesPage({
    limit,
    offset,
    includeArchived: true,
    order: "latest",
  });
  return page.articles;
}
