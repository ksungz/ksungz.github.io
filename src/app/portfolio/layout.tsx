import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김성재 — 포트폴리오",
  description: "AI로 직접 만들고 운영하는 서비스들",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio-root">{children}</div>;
}
