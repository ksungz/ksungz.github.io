import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "서비스 UI 운영, React 전환과 레거시 구조 개선 과정에서 내린 판단과 검증 결과",
};

const uiCaseStudies = [
  {
    id: "react-style-internalization",
    title: "React UI 블록 구현과 운영 SCSS 내재화",
    excerpt: "신규 UI 블록 약 18개를 구현하고, 공통 스타일을 제외한 운영 블록 SCSS 약 108개를 React 구조에 맞춰 재구성해 상품상세 첫 화면(ATF) 개선에 반영했습니다.",
    href: "/engineering/react-pdp",
    tags: ["React", "TypeScript", "SCSS", "Production"],
  },
  {
    id: "pdp-ui",
    title: "모바일웹 상품상세 UI 개발과 운영",
    excerpt: "가격, 옵션, 리뷰, 배송, 프로모션이 맞물리는 상품상세 UI를 운영하며 변경 범위와 WebView, 기기별 이슈를 확인했습니다.",
    href: "/engineering/pdp-ui",
    tags: ["Service UI", "WebView", "Responsive", "Cross-browser"],
  },
  {
    id: "dart-sass",
    title: "2,384개 SCSS 파일의 Dart Sass 전환",
    excerpt: "향후 Sass 업데이트에 대비해 문법을 전환하고 산출물을 검증했습니다. 별도 작업으로 직렬 빌드를 병렬화해 약 24초에서 14초 내외로 줄였습니다.",
    href: "/engineering/dart-sass",
    tags: ["Dart Sass", "Build", "Migration", "Validation"],
  },
  {
    id: "commerce-options",
    title: "상품 옵션 선택 UI",
    excerpt: "색상과 사이즈 조합에 따른 재고, 추가 금액, 품절과 오류 상태를 React 컴포넌트로 구현하고 주요 상태를 Storybook에서 확인했습니다.",
    href: "/portfolio#case-study",
    tags: ["React", "TypeScript", "Storybook", "Accessibility"],
  },
];

const aiCaseStudies = [
  {
    id: "agent-bridge",
    title: "Agent Bridge — 로그인된 여러 AI CLI를 한 작업에서 연결",
    excerpt: "각 도구의 기존 로그인과 구독 환경을 유지하면서 목표, 결정, 실행과 리뷰 기록, 인계 문서를 한 작업 폴더에서 관리하는 오픈소스 CLI입니다.",
    href: "/case-studies/agent-bridge",
    tags: ["Node.js", "CLI", "Multi-Agent", "Open Source"],
  },
  {
    id: "ax-doctor",
    title: "AX Doctor — AI 도입 전 점검 도구",
    excerpt: "제품 범위와 판정 기준을 정하고 AI 에이전트를 활용해, AI 도입 전 충돌과 미확인 범위를 읽기 전용으로 점검하는 CLI를 구현하고 검증했습니다.",
    href: "/case-studies/ax-doctor",
    tags: ["Go", "CLI", "Preflight", "Privacy-by-design"],
  },
  {
    id: "ax-evidence-gates",
    title: "AX Evidence Gates — 공개 근거 기반 AI 품질 게이트 3종",
    excerpt: "여행 API 연동 코드, 상품 등록 정보와 투자 답변을 점검한 해커톤 제출물 3종과 AI 코딩 에이전트와 함께 추가한 LangGraph 학습용 후속 PoC입니다.",
    href: "/case-studies/ax-evidence-gates",
    tags: ["Evidence-based QA", "LangGraph", "Human-in-the-loop", "49 Tests"],
  },
  {
    id: "babypick-ai",
    title: "BabyPick — 육아용품 탐색 서비스와 콘텐츠 운영 자동화",
    excerpt: "공식 가이드의 생성, 검증, API 발행을 자동화하고 네이버와 인스타그램 콘텐츠는 사람 검수 전 단계까지 연결한 운영 사례입니다.",
    href: "/case-studies/babypick-ai",
    tags: ["Next.js", "Automation", "Supabase", "Human-in-the-loop"],
  },
];

function CaseStudyList({ items }: { items: typeof uiCaseStudies }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map(({ id, title, excerpt, href, tags }) => (
        <Link
          key={id}
          href={href}
          className="group block rounded-lg border border-[var(--color-border)] p-4 sm:p-5 transition-colors hover:border-[var(--color-foreground)]"
        >
          <h2 className="text-base font-semibold group-hover:text-[var(--color-foreground)]">{title}</h2>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">{excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function CaseStudies() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Case Studies</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">구현과 개선 사례</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          서비스 UI를 운영하며 발견한 문제, 선택한 변경 방식과 확인한 결과를 정리했습니다.
          각 사례에는 직접 맡은 범위와 확인한 결과를 구분해 적었습니다.
        </p>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          UI &amp; Frontend
        </h2>
        <CaseStudyList items={uiCaseStudies} />
      </section>

      <section>
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          AI를 활용한 작업
        </h2>
        <CaseStudyList items={aiCaseStudies} />
      </section>
    </div>
  );
}
