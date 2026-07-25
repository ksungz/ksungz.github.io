import type { Metadata, Viewport } from "next";
import "./three-blog.css";

export const metadata: Metadata = {
  title: "3D 포트폴리오 탐색",
  description: "AI 도구로 구현한 김성재의 선택형 3D 포트폴리오 탐색 화면",
  openGraph: {
    title: "김성재의 3D 포트폴리오 탐색",
    description: "캐릭터를 움직여 경력, 기술 기록과 프로젝트 공간을 둘러보세요.",
    url: "https://ksungz-github-io.vercel.app/three-blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "김성재의 3D 포트폴리오 탐색",
    description: "캐릭터를 움직여 경력, 기술 기록과 프로젝트 공간을 둘러보세요.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#74c8c4",
};

export default function ThreeBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
