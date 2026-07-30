import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "13년간의 서비스 UI 경험과 AI Workflow, Product Engineering 프로젝트를 정리한 김성재의 포트폴리오",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
