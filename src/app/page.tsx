import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const featuredProducts = [
  {
    name: "Developer Workflow AX",
    tagline: "회사 제공 AI 도구를 실제 개발 흐름에 도입·설정",
    description: "승인된 업무 문맥 연결, PR Review Agent의 8개 저장소 적용, 공통 작성 규칙과 사람의 검증 범위를 정리한 실무 사례.",
    href: "/case-studies/developer-workflow-ax",
    tags: ["Workflow AX", "MCP", "AI Review"],
    group: "AX Systems",
  },
  {
    name: "AX Doctor",
    tagline: "AI 개발 환경 도입 전 점검 CLI",
    description: "기존 설정과 충돌, 권한, 미확인 범위를 읽기 전용으로 진단하는 Go 기반 preflight 도구.",
    href: "/products#ax-doctor",
    tags: ["Go", "CLI", "Preflight"],
    group: "AX Systems",
  },
  {
    name: "Agent Bridge",
    tagline: "로그인된 여러 AI CLI를 한 작업 단위로 연결하는 오픈소스 도구",
    description: "각 CLI의 기존 로그인·구독 환경을 유지하면서 공통 목표, 결정, 실행·리뷰 기록과 인계 문서를 관리합니다.",
    href: "/case-studies/agent-bridge",
    tags: ["CLI", "Open Source", "MIT"],
    group: "AX Systems",
  },
  {
    name: "BabyPick",
    tagline: "육아용품 탐색 서비스와 사람 검수형 콘텐츠 운영",
    description: "공식 가이드는 생성·검증·API 발행을 자동화하고, 네이버·인스타 콘텐츠는 사람이 검수할 수 있는 초안과 패키지까지 준비합니다.",
    href: "/products#babypick-ai",
    tags: ["Next.js", "Supabase", "Automation", "Human-in-the-loop"],
    group: "AI Products",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

      {/* Hero */}
      <section className="mb-16 sm:mb-20">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">AX Engineer</p>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6 leading-snug sm:leading-tight">
          <span className="block">13년간 제품 UI를 운영하며 발견한</span>
          <span className="block text-[var(--color-muted)]">반복 업무와 맥락 단절을</span>
          <span className="block text-[var(--color-muted)]">AI Agent와 자동화로 개선합니다.</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          커머스·게임·플랫폼 서비스에서 UI를 개발하고 운영하며
          현장의 반복 업무, 맥락 단절, 검증 비용 문제를 경험했습니다.
          그 경험을 바탕으로 문제와 적용 범위, 완료 기준을 정하고
          AI Agent를 활용해 RAG, MCP와 자동화 워크플로우를
          구현·검증하고 운영하고 있습니다.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2.5 sm:py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)] min-h-[44px]"
          >
            View Products
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
            href="/case-studies"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            Read Case Studies
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
          href="/case-studies/ax-evidence-gates"
          className="mt-4 flex min-h-[44px] flex-col justify-center gap-1 border-t border-[var(--color-border)] py-3 text-xs transition-colors hover:text-[var(--color-foreground)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <strong className="font-semibold">AX Evidence Gates</strong>
            <span className="ml-2 text-[var(--color-muted)]">
              여행·상품·금융 AI 결과를 공개 근거로 점검한 품질 게이트 3종
            </span>
          </span>
          <span className="text-[var(--color-muted)]">33 tests · GitHub 공개 →</span>
        </Link>
      </section>

      {/* What I Do */}
      <section className="mb-16 sm:mb-20">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          What I Do
        </h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">문제 정의</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              현업에서 반복되는 업무와 맥락 단절을 찾고, AI가 해결할 범위를 정의합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">AX 시스템 구현</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              Agent, RAG, MCP와 자동화 워크플로우를 설계하고 구현합니다. 사람은 결정과 검증에 집중합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">제품 운영과 개선</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              아이디어를 실제 사용할 수 있는 제품으로 만들고, 배포 후 운영 기록과 피드백으로 반복 개선합니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
