import { readFileSync } from "node:fs";
import { XMLParser } from "fast-xml-parser";

const taxonomy = JSON.parse(
  readFileSync(new URL("../../src/data/feed-taxonomy.json", import.meta.url), "utf8")
);

export const CATEGORIES = taxonomy.categories;
export const TOPICS = taxonomy.topics;
export const QUALITY = taxonomy.quality;

const CATEGORY_IDS = new Set(CATEGORIES.map((category) => category.id));
const TOPIC_MAP = new Map(TOPICS.map((topic) => [topic.toLowerCase(), topic]));
const TRACKING_PARAMS = new Set([
  "fbclid",
  "gclid",
  "ref",
  "ref_src",
  "si",
  "source",
]);

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: "#cdata",
  trimValues: true,
  processEntities: true,
});

function array(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function nodeText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) return value.map(nodeText).join(" ");
  if (typeof value === "object") {
    if (value["#cdata"] != null) return nodeText(value["#cdata"]);
    if (value["#text"] != null) return nodeText(value["#text"]);
    return Object.entries(value)
      .filter(([key]) => !key.startsWith("@_"))
      .map(([, item]) => nodeText(item))
      .join(" ");
  }
  return "";
}

export function stripHtml(value) {
  return nodeText(value)
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function atomLink(value) {
  for (const link of array(value)) {
    if (typeof link === "string") return link;
    if (link?.["@_rel"] === "alternate" && link?.["@_href"]) {
      return link["@_href"];
    }
    if (link?.["@_href"]) return link["@_href"];
    const text = nodeText(link).trim();
    if (text) return text;
  }
  return "";
}

function isoDate(value) {
  const date = new Date(nodeText(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function parseFeed(xml) {
  const parsed = parser.parse(xml);
  const rssItems = array(parsed?.rss?.channel?.item).map((item) => ({
    title: stripHtml(item.title),
    url: atomLink(item.link) || nodeText(item.guid),
    content: stripHtml(
      item["content:encoded"] || item.description || item.summary || ""
    ).slice(0, 6_000),
    published_at: isoDate(item.pubDate || item.published || item.updated),
  }));
  const atomItems = array(parsed?.feed?.entry).map((entry) => ({
    title: stripHtml(entry.title),
    url: atomLink(entry.link) || nodeText(entry.id),
    content: stripHtml(entry.content || entry.summary || "").slice(0, 6_000),
    published_at: isoDate(entry.published || entry.updated),
  }));

  return [...rssItems, ...atomItems].filter(
    (item) => item.title && /^https?:\/\//.test(item.url)
  );
}

export function canonicalizeUrl(value) {
  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("utm_") || TRACKING_PARAMS.has(key)) {
        url.searchParams.delete(key);
      }
    }
    url.hash = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  } catch {
    return value.trim();
  }
}

export function normalizedTitle(value) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function categoryTag(category) {
  return `category:${category}`;
}

export function visibilityTag(visibility) {
  return `visibility:${visibility}`;
}

export function qualityTag(quality) {
  return `quality:${quality}`;
}

export function displayTags(tags = []) {
  return tags.filter(
    (tag) =>
      !tag.startsWith("category:") &&
      !tag.startsWith("visibility:") &&
      !tag.startsWith("quality:")
  );
}

export function buildTags(category, visibility, topics, quality = "incomplete") {
  return [
    categoryTag(category),
    visibilityTag(visibility),
    qualityTag(quality),
    ...normalizeTopics(topics),
  ];
}

function cleanStringArray(value, limit = 6, maxLength = 500) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.replace(/\s+/g, " ").trim().slice(0, maxLength))
    .filter(Boolean)
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, limit);
}

export function normalizeTopics(topics) {
  const normalized = [];
  for (const topic of Array.isArray(topics) ? topics : []) {
    if (typeof topic !== "string") continue;
    const match = TOPIC_MAP.get(topic.trim().toLowerCase());
    if (match && !normalized.includes(match)) normalized.push(match);
  }
  return normalized.slice(0, 5);
}

export function parseClassification(value, fallback) {
  try {
    const raw = typeof value === "string" ? value : JSON.stringify(value);
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    const parsed = JSON.parse(match[0]);
    const rawScore = Number(parsed.relevance_score);
    const score = Number.isFinite(rawScore)
      ? Math.max(0, Math.min(100, Math.round(rawScore)))
      : fallback.relevance_score;
    return {
      summary:
        typeof parsed.summary === "string" && parsed.summary.trim()
          ? parsed.summary.replace(/\s+/g, " ").trim().slice(0, 1_500)
          : fallback.summary,
      category: CATEGORY_IDS.has(parsed.category)
        ? parsed.category
        : fallback.category,
      topics: normalizeTopics(parsed.topics).length
        ? normalizeTopics(parsed.topics)
        : fallback.topics,
      key_points: cleanStringArray(parsed.key_points).length
        ? cleanStringArray(parsed.key_points)
        : fallback.key_points,
      why_it_matters:
        typeof parsed.why_it_matters === "string" &&
        parsed.why_it_matters.trim()
          ? parsed.why_it_matters.replace(/\s+/g, " ").trim().slice(0, 800)
          : fallback.why_it_matters,
      relevance_score: score,
      reason:
        typeof parsed.reason === "string"
          ? parsed.reason.replace(/\s+/g, " ").trim().slice(0, 300)
          : fallback.reason,
      used_fallback:
        !Number.isFinite(rawScore) ||
        typeof parsed.summary !== "string" ||
        !CATEGORY_IDS.has(parsed.category) ||
        !Array.isArray(parsed.key_points),
    };
  } catch {
    return fallback;
  }
}

function textHas(text, words) {
  return words.some((word) => text.includes(word));
}

export function fallbackClassification(article) {
  const text = `${article.title} ${article.content || ""}`.toLowerCase();
  let category = "devtools";
  if (textHas(text, ["보안", "security", "cve", "취약점", "해킹"])) {
    category = "security";
  } else if (
    textHas(text, ["react", "next.js", "typescript", "css", "frontend", "프론트"])
  ) {
    category = "frontend";
  } else if (
    textHas(text, ["database", "데이터", "sql", "cloud", "kubernetes", "인프라"])
  ) {
    category = "data";
  } else if (
    textHas(text, ["startup", "스타트업", "saas", "매출", "비즈니스", "시장"])
  ) {
    category = "business";
  } else if (
    textHas(text, ["design", "디자인", "product", "제품", "ux", "ui"])
  ) {
    category = "product";
  } else if (
    textHas(text, ["ai", "llm", "gpt", "claude", "gemini", "에이전트", "agent"])
  ) {
    category = "ai";
  }

  const topicMatchers = [
    ["AI 에이전트", ["agent", "에이전트"]],
    ["LLM", ["llm", "gpt", "claude", "gemini"]],
    ["MCP", ["mcp"]],
    ["AI 코딩", ["ai coding", "코딩 에이전트", "claude code", "codex"]],
    ["오픈소스", ["open source", "오픈소스", "github"]],
    ["자동화", ["automation", "자동화"]],
    ["React", ["react"]],
    ["Next.js", ["next.js", "nextjs"]],
    ["TypeScript", ["typescript"]],
    ["보안", ["security", "보안", "cve"]],
    ["스타트업", ["startup", "스타트업"]],
    ["SaaS", ["saas"]],
  ];
  const topics = topicMatchers
    .filter(([, words]) => textHas(text, words))
    .map(([topic]) => topic)
    .slice(0, 5);
  const sourceBase = {
    GeekNews: 68,
    "이안의 주간실리콘밸리": 72,
    "조쉬의 뉴스레터": 68,
    조코딩: 64,
  }[article.source_name] || 58;
  const depthBonus = (article.content || "").length >= 500 ? 4 : 0;
  const keyPoints = stripHtml(article.content || "")
    .split(/(?<=[.!?。]|다\.)\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 30)
    .slice(0, 5);

  return {
    summary: stripHtml(article.summary || article.content || article.title).slice(0, 1_500),
    category,
    topics: normalizeTopics(topics),
    key_points: keyPoints,
    why_it_matters: "실무 적용 가능성과 기존 방식과의 차이를 원문에서 확인할 필요가 있다.",
    relevance_score: Math.min(74, sourceBase + depthBonus),
    reason: "LLM 분류 실패로 규칙 기반 검토 후보 처리",
    used_fallback: true,
  };
}

export async function classifyArticle(article) {
  const fallback = fallbackClassification(article);
  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) return fallback;

  const categoryGuide = CATEGORIES.map(
    (category) => `${category.id}=${category.label}`
  ).join(", ");
  const prompt = `개인 기술·비즈니스 큐레이션 후보를 평가해. 질문글, 밈, 근거 없는 의견, 단순 홍보, 내용이 빈약한 글은 40점 이하로 평가해. 원문 근거, 실무 적용성, 새로움, 개발·제품·스타트업 관련성을 종합해 0~100점으로 평가해.

카테고리: ${categoryGuide}
허용 토픽: ${TOPICS.join(", ")}

출처: ${article.source_name}
제목: ${article.title}
<untrusted_document>
${stripHtml(article.content || article.summary || "본문 없음").slice(0, 4_000)}
</untrusted_document>

JSON으로만 응답해:
{"summary":"한국어 한줄 요약 1~2문장","key_points":["원문에 근거한 핵심 포인트 3~6개"],"why_it_matters":"왜 읽을 가치가 있는지 1~2문장","category":"카테고리 id","topics":["허용 토픽 중 1~5개"],"relevance_score":0,"reason":"점수 근거 한 문장"}`;

  try {
    const response = await fetch(`${process.env.OLLAMA_HOST || "https://ollama.com"}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "kimi-k2.7-code:cloud",
        messages: [{ role: "user", content: prompt }],
        stream: false,
        format: "json",
      }),
      signal: AbortSignal.timeout(120_000),
    });
    if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
    const data = await response.json();
    return parseClassification(data.message?.content || "", fallback);
  } catch (error) {
    console.warn(`[collector] LLM 분류 실패: ${error.message}`);
    return fallback;
  }
}

export async function classifyBatch(articles) {
  const fallbacks = new Map(
    articles.map((article) => [article.id, fallbackClassification(article)])
  );
  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    return articles.map((article) => ({
      id: article.id,
      ...fallbacks.get(article.id),
    }));
  }

  const input = articles.map((article) => ({
    id: article.id,
    source: article.source_name,
    title: article.title,
    content: stripHtml(article.content || article.summary || "").slice(0, 3_500),
  }));
  const prompt = `다음 기사들을 개인 기술·비즈니스 큐레이션 관점에서 각각 평가해. 질문글, 밈, 근거 없는 의견, 단순 홍보, 내용이 빈약한 글은 40점 이하로 평가해. 원문 근거, 실무 적용성, 새로움, 개발·제품·스타트업 관련성을 종합해 0~100점으로 평가해.

카테고리: ${CATEGORIES.map((category) => `${category.id}=${category.label}`).join(", ")}
허용 토픽: ${TOPICS.join(", ")}

<untrusted_documents>
${JSON.stringify(input)}
</untrusted_documents>

모든 id를 빠짐없이 포함한 JSON으로만 응답해:
{"items":[{"id":1,"summary":"한국어 한줄 요약 1~2문장","key_points":["원문에 근거한 핵심 포인트 3~6개"],"why_it_matters":"왜 읽을 가치가 있는지 1~2문장","category":"카테고리 id","topics":["허용 토픽 중 1~5개"],"relevance_score":0,"reason":"점수 근거"}]}`;

  try {
    const response = await fetch(`${process.env.OLLAMA_HOST || "https://ollama.com"}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "kimi-k2.7-code:cloud",
        messages: [{ role: "user", content: prompt }],
        stream: false,
        format: "json",
      }),
      signal: AbortSignal.timeout(180_000),
    });
    if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
    const data = await response.json();
    const raw = data.message?.content || "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON response missing");
    const parsed = JSON.parse(match[0]);
    const classified = new Map(
      (Array.isArray(parsed.items) ? parsed.items : []).map((item) => [
        Number(item.id),
        item,
      ])
    );
    return articles.map((article) => ({
      id: article.id,
      ...parseClassification(
        classified.get(article.id) || {},
        fallbacks.get(article.id)
      ),
    }));
  } catch (error) {
    console.warn(`[feed] 배치 분류 실패: ${error.message}`);
    return articles.map((article) => ({
      id: article.id,
      ...fallbacks.get(article.id),
    }));
  }
}

export function serializeQuickFeedSummary(classification) {
  return JSON.stringify({
    version: 1,
    summary: classification.summary || "",
    key_points: cleanStringArray(classification.key_points),
    why_it_matters: classification.why_it_matters || "",
  });
}

export function assessContentQuality(content, classification) {
  const normalized = stripHtml(content || "");
  const keyPoints = cleanStringArray(classification?.key_points);
  const reasons = [];
  if (normalized.length < QUALITY.minContentLength) {
    reasons.push(`본문 ${normalized.length}/${QUALITY.minContentLength}자`);
  }
  if (/(?:\.{3}|…)$/.test(normalized)) {
    reasons.push("본문이 말줄임표로 종료됨");
  }
  if (keyPoints.length < QUALITY.minKeyPoints) {
    reasons.push(`핵심 포인트 ${keyPoints.length}/${QUALITY.minKeyPoints}개`);
  }
  return {
    complete: reasons.length === 0,
    quality: reasons.length === 0 ? "complete" : "incomplete",
    reasons,
    contentLength: normalized.length,
    keyPointCount: keyPoints.length,
  };
}

function jsonLdNodes(value) {
  if (Array.isArray(value)) return value.flatMap(jsonLdNodes);
  if (!value || typeof value !== "object") return [];
  const graph = Array.isArray(value["@graph"])
    ? value["@graph"].flatMap(jsonLdNodes)
    : [];
  return [value, ...graph];
}

function extractDiscussionPosting(html) {
  const nodes = [];
  const scriptPattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(scriptPattern)) {
    try {
      nodes.push(...jsonLdNodes(JSON.parse(match[1].trim())));
    } catch {
      // 다른 JSON-LD 블록을 계속 검사한다.
    }
  }
  return nodes.find((node) => {
    const types = Array.isArray(node["@type"])
      ? node["@type"]
      : [node["@type"]];
    return types.includes("DiscussionForumPosting");
  });
}

export async function enrichArticleContent(article) {
  const discussionUrl = article.source_url || article.url;
  let parsedUrl;
  try {
    parsedUrl = new URL(discussionUrl);
  } catch {
    return article;
  }
  if (
    parsedUrl.hostname !== "news.hada.io" ||
    parsedUrl.pathname !== "/topic"
  ) {
    return article;
  }

  try {
    const response = await fetchWithRetry(
      discussionUrl,
      { headers: { "User-Agent": "ksungz-feed-collector/3.1" } },
      article.title
    );
    if (!response.ok) return article;
    const posting = extractDiscussionPosting(await response.text());
    if (!posting) return article;

    const detailedContent = stripHtml(posting.text || "").slice(0, 12_000);
    const sharedContent = Array.isArray(posting.sharedContent)
      ? posting.sharedContent[0]
      : posting.sharedContent;
    const originalUrl =
      typeof sharedContent?.url === "string" ? sharedContent.url : article.url;

    return {
      ...article,
      url: canonicalizeUrl(originalUrl),
      source_url: canonicalizeUrl(discussionUrl),
      content:
        detailedContent.length > (article.content || "").length
          ? detailedContent
          : article.content,
    };
  } catch (error) {
    console.warn(`[feed] 본문 보강 실패 ${article.title}: ${error.message}`);
    return article;
  }
}

export function createFeedStore() {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) {
    throw new Error("Supabase environment is not configured");
  }
  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };

  async function request(path, options = {}) {
    const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
      signal: AbortSignal.timeout(options.timeoutMs || 30_000),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Supabase ${response.status}: ${body.slice(0, 300)}`);
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async function getAll(table, query) {
    const rows = [];
    const pageSize = 1_000;
    for (let offset = 0; ; offset += pageSize) {
      const page = await request(
        `${table}?${query}&limit=${pageSize}&offset=${offset}`
      );
      rows.push(...(page || []));
      if (!page || page.length < pageSize) break;
    }
    return rows;
  }

  return {
    getAll,
    insertArticle(data) {
      return request("feed_articles", {
        method: "POST",
        headers: { Prefer: "return=representation,resolution=ignore-duplicates" },
        body: JSON.stringify(data),
      });
    },
    updateArticle(id, data) {
      return request(`feed_articles?id=eq.${id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(data),
      });
    },
    updateSource(id, data) {
      return request(`feed_sources?id=eq.${id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(data),
      });
    },
  };
}

export async function fetchWithRetry(url, options = {}, label = new URL(url).hostname) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(20_000),
      });
      if (response.ok || ![408, 425, 429, 500, 502, 503, 504].includes(response.status)) {
        return response;
      }
      lastError = new Error(`HTTP ${response.status}`);
      const retryAfter = Number.parseInt(response.headers.get("retry-after") || "", 10);
      const delay = Number.isFinite(retryAfter)
        ? Math.min(retryAfter * 1_000, 120_000)
        : 2_000 * 4 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 2_000 * 4 ** (attempt - 1)));
      }
    }
  }
  throw new Error(`${label}: ${lastError?.message || "request failed"}`);
}

export function startOfTodayInSeoul() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(`${value.year}-${value.month}-${value.day}T00:00:00+09:00`).toISOString();
}
