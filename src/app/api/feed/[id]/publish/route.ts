import { NextRequest, NextResponse } from "next/server";
import { isFeedAdminRequest } from "@/lib/feed-admin-auth";
import {
  getContentQuality,
  getEditorialState,
  setFeedVisibility,
} from "@/lib/feed-taxonomy";
import { createClient } from "@/lib/supabase-server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isFeedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const articleId = Number.parseInt(id, 10);
  if (!Number.isInteger(articleId) || articleId <= 0) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  const supabase = createClient();
  const { data: article, error: fetchError } = await supabase
    .from("feed_articles")
    .select("id, status, tags")
    .eq("id", articleId)
    .single();

  if (fetchError || !article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  if (article.status === "archived") {
    return NextResponse.json(
      { error: "Archived articles cannot be published" },
      { status: 409 }
    );
  }
  if (getContentQuality(article.tags as string[] | null) !== "complete") {
    return NextResponse.json(
      { error: "본문 완성도 검사를 통과한 기사만 공개할 수 있습니다." },
      { status: 409 }
    );
  }
  if (getEditorialState(article.tags as string[] | null) !== "ready") {
    return NextResponse.json(
      { error: "공개 전 편집 분석을 완료한 기사만 공개할 수 있습니다." },
      { status: 409 }
    );
  }

  const tags = setFeedVisibility(article.tags as string[] | null, "public");
  const { error: updateError } = await supabase
    .from("feed_articles")
    .update({ tags })
    .eq("id", articleId);

  if (updateError) {
    return NextResponse.json(
      { error: "Failed to publish article" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, visibility: "public" });
}
