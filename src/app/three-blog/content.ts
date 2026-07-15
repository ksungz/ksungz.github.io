export type LandmarkId = "career" | "tech" | "portfolio" | "home";

export type Landmark = {
  id: LandmarkId;
  label: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  action: string;
  color: string;
  accent: string;
  position: [number, number, number];
};

export const landmarks: Landmark[] = [
  {
    id: "career",
    label: "Career Tower",
    title: "오래 운영되는 UI를 개선합니다",
    eyebrow: "13+ years · UI Engineering",
    description:
      "서비스 운영 경험을 바탕으로 마크업 구조, 스타일 시스템, React 환경을 단계적으로 개선해왔습니다.",
    href: "/career",
    action: "경력 살펴보기",
    color: "#ff785a",
    accent: "#ffd0aa",
    position: [-10, 0, -6],
  },
  {
    id: "tech",
    label: "Tech Archive",
    title: "배운 것을 기록하고 연결합니다",
    eyebrow: "Articles · Notes · Experiments",
    description:
      "React, Sass, UI 품질, AI 도구를 직접 적용하며 얻은 판단과 시행착오를 기술 글로 정리합니다.",
    href: "/tech",
    action: "기술 글 읽기",
    color: "#4169e1",
    accent: "#b9ccff",
    position: [9, 0, -7],
  },
  {
    id: "portfolio",
    label: "Project Gallery",
    title: "문제를 화면과 코드로 풀어냅니다",
    eyebrow: "Selected Work · Case Studies",
    description:
      "제품 UI 운영, 환경 전환, 디자인 시스템과 개인 프로젝트를 문제와 검증 과정 중심으로 소개합니다.",
    href: "/portfolio",
    action: "프로젝트 보기",
    color: "#ffb84d",
    accent: "#fff0a8",
    position: [10, 0, 8],
  },
  {
    id: "home",
    label: "Base Camp",
    title: "김성재의 작업 세계입니다",
    eyebrow: "Service UI · Frontend · Systems",
    description:
      "콘텐츠를 빠르게 훑고 싶다면 익숙한 2D 홈페이지로 돌아갈 수 있습니다.",
    href: "/",
    action: "기본 홈페이지로",
    color: "#7a65d1",
    accent: "#d9cbff",
    position: [-9, 0, 8],
  },
];
