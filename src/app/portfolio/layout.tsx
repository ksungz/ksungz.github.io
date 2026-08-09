import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "13년간의 서비스 UI 개발·운영, 레거시 현대화와 AI-assisted Development 경험을 정리한 김성재의 포트폴리오",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
