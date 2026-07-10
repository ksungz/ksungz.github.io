import { NextRequest, NextResponse } from "next/server";
import { fetchArchivedArticles } from "@/lib/feed-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const articles = await fetchArchivedArticles(limit, offset);

  return NextResponse.json(articles, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}