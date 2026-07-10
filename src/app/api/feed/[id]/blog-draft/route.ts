import { NextRequest, NextResponse } from "next/server";
import { isFeedAdminRequest } from "@/lib/feed-admin-auth";
import {
  createDraftPullRequest,
  isGitHubDraftConfigured,
} from "@/lib/github-draft-pr";
import { createClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "https://ollama.com";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "kimi-k2.7-code:cloud";

interface GeneratedDraft {
  title: string;
  description: string;
  body: string;
}

function todayInSeoul(): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  }).format(new Date());
}

function cleanSingleLine(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

function sanitizeMarkdown(value: unknown): string {
  if (typeof value !== "string") return "";
  const body = value
    .replace(/^```(?:markdown|mdx)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim()
    .slice(0, 5_000);

  if (
    /(^|\n)\s*(import|export)\s/m.test(body) ||
    /<\/?(?:script|iframe|object|embed|[A-Z][A-Za-z0-9]*)\b/.test(body) ||
    /\{[\s\S]*\}/.test(body)
  ) {
    return "";
  }

  return body;
}

function parseDraft(raw: string): GeneratedDraft | null {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    const value = JSON.parse(match[0]) as Record<string, unknown>;
    const titleText = cleanSingleLine(value.title, 100).replace(/^GeekNews 픽:\s*/i, "");
    const description = cleanSingleLine(value.description, 180);
    const body = sanitizeMarkdown(value.body);

    if (!titleText || !description || body.length < 200) return null;
    return {
      title: `GeekNews 픽: ${titleText}`,
      description,
      body,
    };
  } catch {
    return null;
  }
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

function cleanTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .map((tag) => cleanSingleLine(tag, 30))
        .filter((tag): tag is string => Boolean(tag))
    )
  ).slice(0, 5);
}

function buildMdx(
  draft: GeneratedDraft,
  date: string,
  tags: string[],
  sourceUrl: string
): string {
  const frontmatterTags = tags.map(yamlString).join(", ");
  return `---
title: ${yamlString(draft.title)}
date: ${yamlString(date)}
category: "GeekNews 픽"
badge: digest
description: ${yamlString(draft.description)}
tags: [${frontmatterTags}]
---

${draft.body}

---

* 출처 : ${sourceUrl}
`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isFeedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  if (!isGitHubDraftConfigured()) {
    return NextResponse.json(
      { error: "GitHub publishing is not configured" },
      { status: 503 }
    );
  }

  const ollamaKey = process.env.OLLAMA_API_KEY;
  if (!ollamaKey) {
    return NextResponse.json(
      { error: "Draft provider is not configured" },
      { status: 503 }
    );
  }

  const articleId = Number.parseInt(id, 10);
  const supabase = createClient();
  const [articleResult, analysisResult, postResult] = await Promise.all([
    supabase
      .from("feed_articles")
      .select("id, title, url")
      .eq("id", articleId)
      .single(),
    supabase
      .from("feed_analyses")
      .select("summary, key_insights, blog_angle, tags, applicable_ideas")
      .eq("article_id", articleId)
      .maybeSingle(),
    supabase
      .from("feed_posts")
      .select("pr_url, branch_name, mdx_path")
      .eq("article_id", articleId)
      .maybeSingle(),
  ]);

  if (articleResult.error || !articleResult.data) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  if (analysisResult.error || !analysisResult.data) {
    return NextResponse.json(
      { error: "Analyze the article before creating a draft" },
      { status: 409 }
    );
  }
  if (postResult.data?.pr_url) {
    return NextResponse.json({
      success: true,
      reused: true,
      prUrl: postResult.data.pr_url,
      branchName: postResult.data.branch_name,
      mdxPath: postResult.data.mdx_path,
    });
  }

  const article = articleResult.data;
  const analysis = analysisResult.data;
  const prompt = `다음 분석 결과를 바탕으로 개인 기술 블로그용 짧은 글을 작성하세요.

제목: ${article.title}
요약: ${analysis.summary || ""}
핵심 포인트: ${(analysis.key_insights || []).join(" | ")}
블로그 관점: ${analysis.blog_angle || ""}
적용 아이디어: ${(analysis.applicable_ideas || []).join(" | ")}

원칙:
- 분석에 없는 사실, 수치, 경험을 만들지 않습니다.
- 기술 블로그 운영자가 읽고 자신의 판단을 덧붙이는 자연스러운 한국어 문체를 사용합니다.
- 과장된 결론과 상투적인 도입을 피합니다.
- 본문은 600~1,200자, Markdown 문단만 사용합니다.
- 제목, 소제목, HTML, JSX, import/export, 코드 펜스는 본문에 넣지 않습니다.

아래 JSON 형식으로만 답하세요.
{
  "title": "핵심 키워드가 드러나는 제목",
  "description": "독자가 읽어야 하는 이유 한 문장",
  "body": "Markdown 본문"
}`;

  try {
    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ollamaKey}`,
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: "user", content: prompt }],
        stream: false,
        format: "json",
      }),
      signal: AbortSignal.timeout(120_000),
    });

    if (!ollamaResponse.ok) {
      return NextResponse.json(
        { error: `Draft provider returned ${ollamaResponse.status}` },
        { status: 502 }
      );
    }

    const ollamaData = await ollamaResponse.json();
    const draft = parseDraft(ollamaData.message?.content || "");
    if (!draft) {
      return NextResponse.json(
        { error: "Draft response did not match the required schema" },
        { status: 502 }
      );
    }

    const date = todayInSeoul();
    const tags = cleanTags(analysis.tags);
    const mdxContent = buildMdx(draft, date, tags, article.url);
    const pullRequest = await createDraftPullRequest({
      date,
      title: `feat: ${draft.title}`,
      content: mdxContent,
      sourceUrl: article.url,
    });

    const { error: postError } = await supabase.from("feed_posts").upsert(
      {
        article_id: articleId,
        pr_url: pullRequest.prUrl,
        branch_name: pullRequest.branchName,
        mdx_path: pullRequest.mdxPath,
      },
      { onConflict: "article_id" }
    );

    if (postError) {
      return NextResponse.json(
        {
          error: "PR was created but its database record could not be saved",
          prUrl: pullRequest.prUrl,
          partial: true,
        },
        { status: 500 }
      );
    }

    const { error: articleError } = await supabase
      .from("feed_articles")
      .update({ status: "posted", posted_at: new Date().toISOString() })
      .eq("id", articleId);

    if (articleError) {
      return NextResponse.json(
        {
          error: "PR was created but article status could not be updated",
          prUrl: pullRequest.prUrl,
          partial: true,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      prUrl: pullRequest.prUrl,
      branchName: pullRequest.branchName,
      fileName: pullRequest.fileName,
      mdxPath: pullRequest.mdxPath,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Draft creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
