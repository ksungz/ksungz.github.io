import { NextRequest, NextResponse } from "next/server";
import { fetchArticlesPage, toPublicFeedArticle } from "@/lib/feed-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestedLimit = parseInt(searchParams.get("limit") || "20", 10);
  const requestedOffset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = Math.min(Math.max(Number.isFinite(requestedLimit) ? requestedLimit : 20, 1), 50);
  const offset = Math.max(Number.isFinite(requestedOffset) ? requestedOffset : 0, 0);

  const { articles } = await fetchArticlesPage({ limit, offset, order: "latest" });

  return NextResponse.json(articles.map(toPublicFeedArticle), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
