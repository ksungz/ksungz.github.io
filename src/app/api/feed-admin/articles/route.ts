import { NextRequest, NextResponse } from "next/server";
import { fetchArticlesPage } from "@/lib/feed-data";
import { isFeedAdminRequest } from "@/lib/feed-admin-auth";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = new Set([
  "all",
  "inbox",
  "unread",
  "read",
  "analyzed",
  "posted",
  "archived",
]);

function numberParam(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function GET(request: NextRequest) {
  if (!isFeedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const requestedStatus = params.get("status") || "inbox";
  const status = ALLOWED_STATUSES.has(requestedStatus)
    ? requestedStatus
    : "inbox";

  const page = await fetchArticlesPage({
    status,
    category: params.get("category")?.trim().slice(0, 40) || "all",
    search: params.get("q")?.trim().slice(0, 80) || "",
    limit: numberParam(params.get("limit"), 20),
    offset: numberParam(params.get("offset"), 0),
    includeArchived: status === "archived" || status === "all",
    order: status === "inbox" ? "importance" : "latest",
  });

  return NextResponse.json(page, {
    headers: { "Cache-Control": "no-store" },
  });
}
