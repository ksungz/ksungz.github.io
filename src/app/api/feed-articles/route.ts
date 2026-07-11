import { NextRequest, NextResponse } from "next/server";
import { fetchArticlesPage, toPublicFeedPage } from "@/lib/feed-data";

export const dynamic = "force-dynamic";

function numberParam(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function textParam(value: string | null, fallback: string): string {
  return value?.trim().slice(0, 80) || fallback;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = await fetchArticlesPage({
    category: textParam(params.get("category"), "all"),
    search: textParam(params.get("q"), ""),
    tag: textParam(params.get("tag"), "") || null,
    limit: numberParam(params.get("limit"), 20),
    offset: numberParam(params.get("offset"), 0),
    order: "latest",
    publicOnly: true,
  });

  return NextResponse.json(toPublicFeedPage(page), {
    headers: { "Cache-Control": "no-store" },
  });
}
