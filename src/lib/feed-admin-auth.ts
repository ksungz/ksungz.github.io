import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const FEED_ADMIN_COOKIE = "ksungz_feed_admin";

const SESSION_PAYLOAD = "ksungz-feed-admin-session-v1";

function getAdminToken(): string {
  return process.env.FEED_ADMIN_TOKEN?.trim() || "";
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function sessionValue(token: string): string {
  return createHmac("sha256", token).update(SESSION_PAYLOAD).digest("hex");
}

export function isFeedAdminConfigured(): boolean {
  return getAdminToken().length >= 24;
}

export function verifyFeedAdminToken(candidate: string): boolean {
  const token = getAdminToken();
  return token.length >= 24 && safeEqual(candidate, token);
}

export function getFeedAdminSessionValue(): string | null {
  const token = getAdminToken();
  return token.length >= 24 ? sessionValue(token) : null;
}

export async function hasFeedAdminSession(): Promise<boolean> {
  const expected = getFeedAdminSessionValue();
  if (!expected) return false;

  const cookieStore = await cookies();
  const actual = cookieStore.get(FEED_ADMIN_COOKIE)?.value || "";
  return safeEqual(actual, expected);
}

export function isFeedAdminRequest(request: NextRequest): boolean {
  const token = getAdminToken();
  if (token.length < 24) return false;

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return safeEqual(authorization.slice(7), token);
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) return false;
    } catch {
      return false;
    }
  }

  const actual = request.cookies.get(FEED_ADMIN_COOKIE)?.value || "";
  return safeEqual(actual, sessionValue(token));
}
