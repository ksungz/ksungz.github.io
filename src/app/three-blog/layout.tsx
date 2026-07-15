import type { Metadata } from "next";
import "./three-blog.css";

export const metadata: Metadata = {
  title: "Interactive World",
  description: "김성재의 경력, 기술 기록과 프로젝트를 둘러보는 인터랙티브 3D 포트폴리오",
};

export default function ThreeBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
