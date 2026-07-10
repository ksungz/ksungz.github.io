import { NextRequest, NextResponse } from "next/server";
import { isFeedAdminRequest } from "@/lib/feed-admin-auth";
import { createClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isFeedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("feed_articles")
    .update({ status: "archived" })
    .eq("id", Number.parseInt(id, 10))
    .select("id")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Failed to archive article" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
