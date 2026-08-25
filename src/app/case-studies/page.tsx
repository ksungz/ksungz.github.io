import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "서비스 UI 구현과 개선 경험, AI 도구를 활용한 작업의 과정과 결과",
};

const uiCaseStudies = [
  {
    id: "commerce-options",
    title: "상품 옵션 선택 UI",
    excerpt: "색상과 사이즈 조합에 따른 재고, 추가 금액, 품절과 오류 상태를 React 컴포넌트로 구현하고 주요 상태를 Storybook에서 확인했습니다.",
    href: "/portfolio#case-study",
    tags: ["React", "TypeScript", "Storybook", "Accessibility"],
  },
  {
    id: "pdp-ui",
    title: "모바일웹 상품상세 UI 개발·운영",
    excerpt: "가격·옵션·리뷰·배송·프로모션이 맞물리는 상품상세 UI를 운영하며 신규 기능, 상품 유형별 변경과 WebView·크로스브라우저 이슈에 대응했습니다.",
    href: "/engineering/pdp-ui",
    tags: ["Service UI", "WebView", "Responsive", "Cross-browser"],
  },
  {
    id: "dart-sass",
    title: "2,384개 SCSS 파일의 Dart Sass 전환",
    excerpt: "AI 보조 도구를 활용해 SCSS 파일을 전환하고, 전환 전후의 CSS 산출물과 빌드 결과를 직접 확인했습니다.",
    href: "/engineering/dart-sass",
    tags: ["Dart Sass", "SCSS", "Migration", "Validation"],
  },
];

const aiCaseStudies = [
  {
    id: "agent-bridge",
    title: "Agent Bridge — 로그인된 여러 AI CLI를 한 작업에서 연결",
    excerpt: "각 도구의 기존 로그인과 구독 환경을 유지하면서 목표, 결정, 실행·리뷰 기록과 인계 문서를 한 작업 폴더에서 관리하는 오픈소스 CLI입니다.",
    href: "/case-studies/agent-bridge",
    tags: ["Node.js", "CLI", "Multi-Agent", "Open Source"],
  },
  {
    id: "ax-doctor",
    title: "AX Doctor — AI 도입 전 점검 도구",
    excerpt: "제품 범위와 판정 기준을 정하고 AI 에이전트를 활용해, AI 도입 전 충돌과 미확인 범위를 읽기 전용으로 점검하는 CLI를 구현·검증했습니다.",
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
    excerpt: "공식 가이드의 생성·검증·API 발행을 자동화하고, 네이버·인스타 콘텐츠는 사람 검수 전 단계까지 연결한 운영 사례입니다.",
    href: "/case-studies/babypick-ai",
    tags: ["Next.js", "Automation", "Supabase", "Human-in-the-loop"],
  },
  {
    id: "obsidian-rag",
    title: "Obsidian RAG — 여러 AI 에이전트가 같은 문서를 검색하는 환경",
    excerpt: "Obsidian 문서를 로컬 임베딩으로 인덱싱하고 MCP·HTTP·CLI로 검색해 에이전트 간 맥락 단절을 해결한 사례.",
    href: "/case-studies/obsidian-rag",
    tags: ["RAG", "Ollama", "ChromaDB", "MCP"],
  },
  {
    id: "news-automation",
    title: "News Automation — 뉴스 선택부터 블로그 PR까지",
    excerpt: "매일 기술 뉴스를 읽고 정리하는 반복 작업을 AI Agent 기반 Human-in-the-loop 파이프라인으로 자동화했습니다.",
    href: "/case-studies/news-automation",
    tags: ["AI Agent", "Telegram Bot", "Automation"],
  },
  {
    id: "developer-workflow-ax",
    title: "회사 제공 AI 도구 적용 경험",
    excerpt: "회사에서 제공한 AI 도구를 UI 개발 흐름에 적용하며 파일 필터와 검토 기준, 사람이 직접 확인할 범위를 정리했습니다.",
    href: "/case-studies/developer-workflow-ax",
    tags: ["AI-assisted Development", "AI Review", "Human-in-the-loop"],
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
          서비스 UI를 개발하고 운영하면서 수행한 작업과 그 경험을 바탕으로 구현한 UI를 정리했습니다.
          AI 도구를 활용한 작업도 실제로 한 일과 확인한 결과를 중심으로 담았습니다.
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
