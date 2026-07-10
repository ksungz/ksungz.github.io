import { NextResponse } from "next/server";
import { FEED_ADMIN_COOKIE } from "@/lib/feed-admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(FEED_ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
