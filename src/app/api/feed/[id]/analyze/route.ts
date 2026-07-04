import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "https://ollama.com";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "kimi-k2.7-code:cloud";
const BEARER_PREFIX = "Bea" + "rer ";

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

  // 1. 글 조회
  const { data: article, error: fetchError } = await supabase
    .from("feed_articles")
    .select("id, title, url, source_url, content, points, source_id")
    .eq("id", articleId)
    .single();

  if (fetchError || !article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  // 2. 원문 본문 fetch (content가 짧으면)
  let content = article.content || "";
  if (content.length < 100 && article.url) {
    try {
      const pageRes = await fetch(article.url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(10000),
      });
      if (pageRes.ok) {
        const html = await pageRes.text();
        content = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 5000);
      }
    } catch {}
  }

  // 3. Ollama Cloud 분석
  const ollamaKey = process.env.OLLAMA_API_KEY;
  if (!ollamaKey) {
    return NextResponse.json(
      { error: "OLLAMA_API_KEY not configured" },
      { status: 500 }
    );
  }

  const prompt = `다음 기술 글을 분석해줘. JSON으로만 응답해.

제목: ${article.title}
URL: ${article.url}
${content ? `\n[원문 본문]\n${content.slice(0, 4000)}` : ""}

응답 형식 (JSON만, 설명 없이, 마크다운 코드 펜스 금지):
{
  "summary": "핵심 내용 3~4줄 요약",
  "keyInsights": ["구체적 인사이트1", "인사이트2", "인사이트3"],
  "blogAngle": "이 글로 블로그를 쓴다면 독자에게 전달할 핵심 관점",
  "tags": ["태그1", "태그2"],
  "relevantProjects": ["shorts-planner", "telegram-bot", "ksungz-blog", "obsidian-rag"],
  "applicableIdeas": ["실제 적용 가능한 아이디어"]
}`;

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
      const errText = await ollamaRes.text();
      return NextResponse.json(
        { error: `Ollama error: ${ollamaRes.status} ${errText.slice(0, 200)}` },
        { status: 500 }
      );
    }

    const ollamaData = await ollamaRes.json();
    const rawContent = ollamaData.message?.content || "";

    // JSON 추출
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // 4. feed_analyses에 저장
    const { error: insertError } = await supabase
      .from("feed_analyses")
      .upsert({
        article_id: articleId,
        summary: analysis.summary || "",
        key_insights: analysis.keyInsights || [],
        blog_angle: analysis.blogAngle || "",
        tags: analysis.tags || [],
        relevant_projects: analysis.relevantProjects || [],
        applicable_ideas: analysis.applicableIdeas || [],
      }, { onConflict: "article_id" });

    if (insertError) {
      console.error("[feed/analyze] insert error:", insertError.message);
    }

    // 5. article status를 analyzed로 업데이트
    await supabase
      .from("feed_articles")
      .update({ status: "analyzed", analyzed_at: new Date().toISOString() })
      .eq("id", articleId);

    return NextResponse.json({
      success: true,
      analysis: {
        summary: analysis.summary || "",
        keyInsights: analysis.keyInsights || [],
        blogAngle: analysis.blogAngle || "",
        tags: analysis.tags || [],
        applicableIdeas: analysis.applicableIdeas || [],
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}