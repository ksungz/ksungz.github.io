export type LandmarkId = "career" | "tech" | "portfolio" | "home";

export type Landmark = {
  id: LandmarkId;
  label: string;
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  tags: string[];
  href: string;
  action: string;
  color: string;
  accent: string;
  position: [number, number, number];
};

export const worldBounds = {
  minX: -22,
  maxX: 22,
  minZ: -16.5,
  maxZ: 16.5,
} as const;

export const playerStart: [number, number, number] = [0, 0.45, 12];

export function worldToMap(position: { x: number; z: number }) {
  return {
    left: ((position.x - worldBounds.minX) / (worldBounds.maxX - worldBounds.minX)) * 100,
    top: ((position.z - worldBounds.minZ) / (worldBounds.maxZ - worldBounds.minZ)) * 100,
  };
}

export const landmarks: Landmark[] = [
  {
    id: "career",
    label: "Career Tower",
    title: "서비스 UI의 구조와 운영 방식을 개선해왔습니다",
    eyebrow: "UI Engineering · Operations",
    description:
      "서비스 운영 경험을 바탕으로 마크업 구조, 스타일 시스템, React 환경을 단계적으로 개선해왔습니다.",
    highlights: [
      "서비스 화면의 구조와 유지보수성 개선",
      "HTML·SCSS 산출물의 React 환경 전환",
      "Storybook·문서화·리뷰 기준 정리",
    ],
    tags: ["Service UI", "React", "Sass"],
    href: "/career",
    action: "경력 살펴보기",
    color: "#ff785a",
    accent: "#ffd0aa",
    position: [-13, 0, -8],
  },
  {
    id: "tech",
    label: "Tech Archive",
    title: "적용 과정과 시행착오를 기록합니다",
    eyebrow: "Articles · Notes · Experiments",
    description:
      "React, Sass, UI 품질, AI 도구를 직접 적용하며 얻은 판단과 시행착오를 기술 글로 정리합니다.",
    highlights: [
      "기술 선택의 배경과 적용 과정 기록",
      "운영 환경에서 확인한 한계와 대응 정리",
      "UI 개발과 AI 도구 활용 경험 연결",
    ],
    tags: ["Writing", "Frontend", "AI Tools"],
    href: "/tech",
    action: "기술 글 읽기",
    color: "#4169e1",
    accent: "#b9ccff",
    position: [12.5, 0, -9],
  },
  {
    id: "portfolio",
    label: "Project Gallery",
    title: "UI 구현 사례와 개인 프로젝트를 정리했습니다",
    eyebrow: "Selected Work · Case Studies",
    description:
      "제품 UI 운영, 환경 전환, 디자인 시스템과 개인 프로젝트를 문제와 검증 과정 중심으로 소개합니다.",
    highlights: [
      "상품 옵션 선택 UI 공개 구현",
      "컴포넌트 상태와 예외 케이스 검증",
      "개인 서비스의 화면부터 배포까지 운영",
    ],
    tags: ["Case Study", "UI Systems", "Product"],
    href: "/portfolio",
    action: "프로젝트 보기",
    color: "#ffb84d",
    accent: "#fff0a8",
    position: [13, 0, 9],
  },
  {
    id: "home",
    label: "Base Camp",
    title: "경력과 작업 기록을 한곳에 모았습니다",
    eyebrow: "Service UI · Frontend · Systems",
    description:
      "콘텐츠를 빠르게 훑고 싶다면 익숙한 2D 홈페이지로 돌아갈 수 있습니다.",
    highlights: [
      "서비스 UI 개발과 운영 개선",
      "경력·프로젝트·기술 기록을 한곳에 구성",
      "접근 가능한 2D 탐색 경로 제공",
    ],
    tags: ["Profile", "Navigation", "About"],
    href: "/",
    action: "기본 홈페이지로",
    color: "#7a65d1",
    accent: "#d9cbff",
    position: [-12.5, 0, 9.5],
  },
];
