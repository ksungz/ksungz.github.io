import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "모바일웹·WebView UI 운영, 레거시 UI 전환과 공개 컴포넌트 구현 경험을 정리한 김성재의 포트폴리오",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
