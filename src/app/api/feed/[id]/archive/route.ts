import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const articleId = parseInt(idStr, 10);

  if (!articleId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase
    .from("feed_articles")
    .update({ status: "archived" })
    .eq("id", articleId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}