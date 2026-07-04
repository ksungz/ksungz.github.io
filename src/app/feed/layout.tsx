import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "정보 리더 — 모아보고, 읽고, 분석하고, 포스팅까지",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="feed-root">{children}</div>;
}