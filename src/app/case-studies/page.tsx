import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "서비스 UI 운영과 개선, 개인 서비스와 개발 도구의 구현 사례",
};

const uiCaseStudies = [
  {
    id: "pdp-ui",
    title: "모바일웹 상품상세 UI 개발과 운영",
    excerpt: "가격, 옵션, 리뷰, 배송, 프로모션이 맞물리는 상품상세 UI를 운영하며 변경 범위와 WebView, 기기별 이슈를 확인했습니다.",
    href: "/engineering/pdp-ui",
    tags: ["Service UI", "WebView", "Responsive", "Cross-browser"],
  },
  {
    id: "react-style-internalization",
    title: "상품상세 스타일을 React 저장소로 옮기며 정한 기준",
    excerpt: "AI 개발 흐름을 개선하려고 운영 SCSS를 옮겼습니다. 컴포넌트와 SCSS의 분리 단위가 달라 화면 블록별로 묶었고, 신규 UI 블록 약 18개의 스타일 작업을 실제 상품상세 개선에 반영했습니다.",
    href: "/engineering/react-pdp",
    tags: ["React", "TypeScript", "SCSS", "Production"],
  },
  {
    id: "dart-sass",
    title: "2,384개 SCSS 파일의 Dart Sass 전환",
    excerpt: "향후 Sass 업데이트에 대비해 문법을 전환하고 산출물을 검증했습니다. 별도 작업으로 직렬 빌드를 병렬화해 약 24초에서 14초 내외로 줄였습니다.",
    href: "/engineering/dart-sass",
    tags: ["Dart Sass", "Build", "Migration", "Validation"],
  },
];

const personalCaseStudies = [
  {
    id: "commerce-options",
    title: "상품 옵션 선택 UI",
    excerpt: "색상과 사이즈 조합에 따른 재고, 추가 금액, 품절과 오류 상태를 React 컴포넌트로 구현하고 주요 상태를 Storybook에서 확인했습니다.",
    href: "/portfolio#case-study",
    tags: ["React", "TypeScript", "Storybook", "Accessibility"],
  },
  {
    id: "babypick-ai",
    title: "BabyPick — 육아용품 탐색 서비스와 콘텐츠 운영 자동화",
    excerpt: "공식 가이드의 생성, 검증, API 발행을 자동화하고 네이버와 인스타그램 콘텐츠는 사람 검수 전 단계까지 연결한 운영 사례입니다.",
    href: "/case-studies/babypick-ai",
    tags: ["Next.js", "Automation", "Supabase", "Human-in-the-loop"],
  },
];

const toolCaseStudies = [
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
    id: "agent-bridge",
    title: "Agent Bridge — 로그인된 여러 AI CLI를 한 작업에서 연결",
    excerpt: "각 도구의 기존 로그인과 구독 환경을 유지하면서 목표, 결정, 실행과 리뷰 기록, 인계 문서를 한 작업 폴더에서 관리하는 오픈소스 CLI입니다.",
    href: "/case-studies/agent-bridge",
    tags: ["Node.js", "CLI", "Multi-Agent", "Open Source"],
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
          <h3 className="text-base font-semibold group-hover:text-[var(--color-foreground)]">{title}</h3>
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
          실무에서 개선한 서비스 UI와 별도로 만든 개인 프로젝트를 모았습니다.
          각 사례에는 맡은 작업과 적용 후 확인한 결과를 담았습니다.
        </p>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold text-[var(--color-muted)]">
          실무 UI와 운영 개선
        </h2>
        <CaseStudyList items={uiCaseStudies} />
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold text-[var(--color-muted)]">
          개인 구현과 서비스 운영
        </h2>
        <CaseStudyList items={personalCaseStudies} />
      </section>

      <section>
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold text-[var(--color-muted)]">
          개발 도구와 실험
        </h2>
        <CaseStudyList items={toolCaseStudies} />
      </section>
    </div>
  );
}
