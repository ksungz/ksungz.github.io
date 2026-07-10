import { NextRequest, NextResponse } from "next/server";
import {
  FEED_ADMIN_COOKIE,
  getFeedAdminSessionValue,
  isFeedAdminConfigured,
  verifyFeedAdminToken,
} from "@/lib/feed-admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isFeedAdminConfigured()) {
    return NextResponse.json(
      { error: "Feed admin is not configured" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";

  if (!verifyFeedAdminToken(token)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const value = getFeedAdminSessionValue();
  if (!value) {
    return NextResponse.json(
      { error: "Feed admin is not configured" },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(FEED_ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
