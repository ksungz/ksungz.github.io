import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "서비스 UI 개발과 운영 개선, React 환경 전환, UI 품질 관리 경험을 정리한 포트폴리오",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
