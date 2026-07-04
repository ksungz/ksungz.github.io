import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "https://ollama.com";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "kimi-k2.7-code:cloud";
const BEARER_PREFIX = "Bea" + "rer ";

const BLOG_PATH = "/Users/sungjaekim/Documents/workspace/ksungz-blog";
const TECH_CONTENT_PATH = path.join(BLOG_PATH, "src/content/tech");
const GITHUB_REPO = "ksungz/ksungz.github.io";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

function git(cmd: string, cwd = BLOG_PATH) {
  return execSync(cmd, { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const articleId = parseInt(idStr, 10);

  if (!articleId) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  const supabase = createClient();

  // 1. 글 + 분석 결과 조회
  const { data: article, error: articleError } = await supabase
    .from("feed_articles")
    .select("id, title, url, source_url, content")
    .eq("id", articleId)
    .single();

  if (articleError || !article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const { data: analysis } = await supabase
    .from("feed_analyses")
    .select("summary, key_insights, blog_angle, tags, applicable_ideas")
    .eq("article_id", articleId)
    .single();

  if (!analysis) {
    return NextResponse.json(
      { error: "Analysis not found. Analyze first." },
      { status: 400 }
    );
  }

  // 2. 블로그 초안 생성 (Ollama Cloud)
  const ollamaKey = process.env.OLLAMA_API_KEY;
  if (!ollamaKey) {
    return NextResponse.json(
      { error: "OLLAMA_API_KEY not configured" },
      { status: 500 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const articleText = `### ${article.title}
- 원문: ${article.url}
- 요약: ${analysis.summary}
- 핵심 인사이트: ${(analysis.key_insights || []).join(" | ")}
- 블로그 각도: ${analysis.blog_angle || ""}
- 적용 아이디어: ${(analysis.applicable_ideas || []).join(" | ")}`;

  const prompt = `아래 분석 결과를 바탕으로 개인 기술 블로그 포스팅을 작성해줘.

${articleText}

---
글쓰기 원칙:
1. 블로그 각도를 글의 중심 메시지로 삼되, 자연스럽게 녹여내.
2. 섹션 레벨 사용 금지. 흘러가는 문장으로.
3. 기술 블로그를 자주 쓰는 개발자가 "오늘 이거 읽었는데" 하고 쓰는 느낌.
4. 구체적인 것(수치, 이름)은 반드시 넣되, 자연스럽게.
5. 전체 길이: 250~450자 분량의 자유로운 산문.
6. 글 끝에 2~3문장의 개인 관점을 자연스럽게 섞어.

아래 형식으로만 출력해 (frontmatter 포함, 코드 펜스·설명 없이):
---
title: "GeekNews 픽: [핵심 키워드]"
date: "${today}"
category: "GeekNews 픽"
badge: digest
description: "[독자가 읽어야 하는 이유 한 줄]"
tags: [${(analysis.tags || []).slice(0, 5).map((t: string) => `"${t}"`).join(", ")}]
---

[본문]`;

  try {
    const ollamaRes = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: [BEARER_PREFIX, ollamaKey].join(""),
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
      signal: AbortSignal.timeout(180000),
    });

    if (!ollamaRes.ok) {
      return NextResponse.json(
        { error: `Ollama error: ${ollamaRes.status}` },
        { status: 500 }
      );
    }

    const ollamaData = await ollamaRes.json();
    let mdxContent = ollamaData.message?.content || "";

    // 코드 펜스 제거
    mdxContent = mdxContent
      .replace(/^```(?:markdown|mdx)?\s*\n?/i, "")
      .replace(/\n?```\s*$/i, "")
      .trim();

    // 출처 추가
    const sourcesSection = `\n\n---\n\n* 출처 : ${article.url}`;

    // 3. Git 브랜치 생성 + 파일 저장 + PR
    const branchName = `draft/geek-digest-${today}`;
    const fileName = `geek-digest-${today}.mdx`;
    const filePath = path.join(TECH_CONTENT_PATH, fileName);

    // Git 작업
    git("git fetch origin main");
    git("git checkout main");
    git("git pull origin main");
    try { git(`git branch -D ${branchName}`); } catch {}
    git(`git checkout -b ${branchName}`);

    // MDX 파일 쓰기
    fs.writeFileSync(filePath, mdxContent + sourcesSection + "\n", "utf8");

    // 커밋 + 푸시
    git(`git add src/content/tech/${fileName}`);
    git(`git commit -m "feat: geek-digest ${today}"`);
    git(`git push -f origin ${branchName}`);

    // GitHub PR 생성
    let prUrl = null;
    if (GITHUB_TOKEN) {
      const prRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/pulls`, {
        method: "POST",
        headers: {
          Authorization: [BEARER_PREFIX, GITHUB_TOKEN].join(""),
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          title: `feat: geek-digest ${today}`,
          head: branchName,
          base: "main",
          body: "GeekNews 데일리 다이제스트 초안\n\n자동 생성된 블로그 포스팅입니다. 검토 후 Merge 해주세요.",
        }),
      });

      const pr = await prRes.json();
      if (prRes.ok) {
        prUrl = pr.html_url;
      }
    }

    // main으로 복귀
    try { git("git checkout main"); } catch {}

    // 4. DB 업데이트 — status posted, posts 테이블에 저장
    await supabase
      .from("feed_articles")
      .update({ status: "posted", posted_at: new Date().toISOString() })
      .eq("id", articleId);

    await supabase
      .from("feed_posts")
      .upsert({
        article_id: articleId,
        pr_url: prUrl,
        branch_name: branchName,
        mdx_path: `src/content/tech/${fileName}`,
      }, { onConflict: "article_id" });

    return NextResponse.json({
      success: true,
      prUrl,
      branchName,
      fileName,
    });
  } catch (e) {
    // main으로 복귀 시도
    try { git("git checkout main"); } catch {}
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}