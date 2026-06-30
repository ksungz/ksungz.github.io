import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "UI 개발 경험을 바탕으로 AI 워크플로우와 AX 도구를 설계·운영하는 포트폴리오",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
