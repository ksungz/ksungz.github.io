import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const featuredProducts = [
  {
    name: "모바일웹 상품상세 UI",
    tagline: "복잡한 상태와 변경이 이어지는 핵심 화면 개발·운영",
    description: "다수 유형의 상품상세 UI를 담당하며 신규 기능, 반응형 화면, 크로스브라우징, 디자인 검수와 운영 대응을 수행했습니다.",
    href: "/engineering/pdp-ui",
    tags: ["Service UI", "Responsive", "Accessibility"],
  },
  {
    name: "UI Legacy Modernization",
    tagline: "오래된 스타일 환경을 단계적으로 전환",
    description: "AI 보조 도구를 활용해 2,384개 SCSS 파일을 Dart Sass로 전환하고 결과를 직접 검증했습니다. HTML/SCSS 화면의 React·TypeScript 컴포넌트 이관에도 참여했습니다.",
    href: "/engineering/dart-sass",
    tags: ["Dart Sass", "React", "TypeScript"],
  },
  {
    name: "Commerce UI Components",
    tagline: "실무 경험을 바탕으로 다시 만든 상품 옵션 UI",
    description: "옵션 조합, 재고, 오류와 모바일 바텀시트 상태를 React 컴포넌트로 구현하고 Storybook에서 검증했습니다.",
    href: "https://ksungz-ui.vercel.app/?path=/story/case-studies-상품-옵션-선택--design-and-verification",
    tags: ["React", "Storybook", "Accessibility"],
  },
  {
    name: "AI-assisted Development",
    tagline: "반복 검토와 문서 작성을 개발 흐름에 맞게 정리",
    description: "회사 제공 AI 리뷰 도구와 승인된 업무 문맥 연동을 적용하고, 공통 작성 규칙과 사람이 최종 확인할 범위를 정리했습니다.",
    href: "/case-studies/developer-workflow-ax",
    tags: ["AI Review", "MCP", "Human-in-the-loop"],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

      {/* Hero */}
      <section className="mb-16 sm:mb-20">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">
          Frontend Engineer
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6 leading-snug sm:leading-tight">
          <span className="block">13년간 서비스의 UI를 개발하고 운영하며</span>
          <span className="block text-[var(--color-muted)]">사용자 화면의 품질과 유지보수성을</span>
          <span className="block text-[var(--color-muted)]">꾸준히 개선해왔습니다.</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          모바일웹 상품상세와 신규 서비스 UI를 담당하며 반응형 화면,
          크로스브라우징, 변경 영향 검증과 운영 대응을 수행했습니다.
          AI 보조 도구를 활용해 대규모 Sass 전환을 수행하고 React·TypeScript 컴포넌트 이관에 참여했으며, Storybook 환경을 구축했습니다.
          최근에는 AI 도구를 활용해 코드 검토와 문서 작성 등 반복적인 개발 과정을 개선하고 있습니다.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/career"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2.5 sm:py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)] min-h-[44px]"
          >
            View Career
          </Link>
          <Link
            href="https://github.com/ksungz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            View GitHub
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            View Projects
          </Link>
        </div>
      </section>

      {/* Featured Work */}
      <section className="mb-16 sm:mb-20">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Featured Work
        </h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {featuredProducts.map(({ name, tagline, description, href, tags }) => (
            <Link
              key={name}
              href={href}
              className="group rounded-lg border border-[var(--color-border)] p-4 sm:p-5 transition-colors hover:border-[var(--color-foreground)]"
            >
              <h3 className="text-base font-semibold group-hover:text-[var(--color-foreground)]">
                {name}
              </h3>
              <p className="mt-1 text-xs font-medium text-[var(--color-muted)]">{tagline}</p>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">{description}</p>
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
        <Link
          href="/products"
          className="mt-4 flex min-h-[44px] flex-col justify-center gap-1 border-t border-[var(--color-border)] py-3 text-xs transition-colors hover:text-[var(--color-foreground)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <strong className="font-semibold">AI를 활용한 프로젝트와 실험</strong>
            <span className="ml-2 text-[var(--color-muted)]">
              Agent Bridge, AX Doctor, BabyPick과 자동화 기록
            </span>
          </span>
          <span className="text-[var(--color-muted)]">현재 범위와 한계를 함께 기록 →</span>
        </Link>
      </section>

      {/* What I Do */}
      <section className="mb-16 sm:mb-20">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          What I Do
        </h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">서비스 UI 개발·운영</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              복잡한 사용자 화면의 상태와 예외를 구현하고 운영 중인 서비스에 안정적으로 반영합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">레거시 현대화</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              오래된 HTML·SCSS 구조를 단계적으로 전환하고 컴포넌트와 스타일의 변경 맥락을 정리합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">AI-assisted Development</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              AI를 코드 검토와 문서 초안, 반복 작업에 활용하고 최종 판단과 검증은 사람이 담당합니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
