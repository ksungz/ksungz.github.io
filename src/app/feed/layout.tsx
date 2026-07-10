import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info Feed — 테크/비즈니스 뉴스 큐레이션",
  description:
    "개발 · 비즈니스 · 소셜 미디어의 주요 흐름을 한곳에서. 모아보고, 읽고, 분석하고, 포스팅까지.",
  openGraph: {
    title: "Info Feed — 테크/비즈니스 뉴스 큐레이션",
    description:
      "개발 · 비즈니스 · 소셜 미디어의 주요 흐름을 한곳에서. 모아보고, 읽고, 분석하고, 포스팅까지.",
    type: "website",
    url: "/feed",
  },
  twitter: {
    card: "summary",
    title: "Info Feed — 테크/비즈니스 뉴스 큐레이션",
    description:
      "개발 · 비즈니스 · 소셜 미디어의 주요 흐름을 한곳에서.",
  },
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="feed-root">{children}</div>;
}