import type { Metadata } from "next";
import "./three-blog.css";

export const metadata: Metadata = {
  title: "3D 포트폴리오 탐색",
  description: "AI 도구를 활용해 만든 김성재의 선택형 3D 포트폴리오 탐색 화면",
};

export default function ThreeBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
