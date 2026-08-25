import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "13년간 서비스 UI를 개발·운영하며 오래된 화면과 스타일 구조를 단계적으로 개선해온 경험을 정리한 김성재의 포트폴리오",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
