import Link from "next/link";

const featuredProducts = [
  {
    name: "AX Doctor",
    tagline: "AI 개발 환경 도입 전 점검 CLI",
    description: "기존 설정과 충돌, 권한, 미확인 범위를 읽기 전용으로 진단하는 Go 기반 preflight 도구.",
    href: "/products#ax-doctor",
    tags: ["Go", "CLI", "Preflight"],
  },
  {
    name: "News Automation",
    tagline: "뉴스 선택부터 블로그 PR까지 자동화",
    description: "GeekNews 큐레이션 → AI 분석 → MDX 초안 → GitHub PR 자동 생성 파이프라인.",
    href: "/products#news-automation",
    tags: ["AI Agent", "Automation", "Telegram Bot"],
  },
  {
    name: "BabyPick AI",
    tagline: "AI 콘텐츠 자동 발행으로 220개+ 가이드 운영",
    description: "키워드 선택 → AI 생성 → 검증 → 발행 → 블로그·인스타 자동화까지 구축·운영 중.",
    href: "/products#babypick-ai",
    tags: ["AI Content", "Automation", "Supabase"],
  },
  {
    name: "Commerce AI",
    tagline: "커머스 서비스에 AI 도입",
    description: "2,384개 SCSS 파일 Dart Sass 전환, PR Review Agent 8개 저장소 적용, 반복 작업 자동화.",
    href: "/products#commerce-ai",
    tags: ["Sass Migration", "PR Review Agent", "Cursor"],
  },
  {
    name: "OpenClaw Lab",
    tagline: "다중 AI 에이전트 연결 CLI",
    description: "Claude Code, Codex, Gemini CLI의 작업 맥락과 실행 기록을 공통 관리하는 오픈소스.",
    href: "/products#openclaw-lab",
    tags: ["Open Source", "Multi-Agent", "MIT"],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Hero */}
      <section className="mb-20">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">AI Product Engineer</p>
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          I build AI-powered products
          <br />
          <span className="text-[var(--color-muted)]">from idea to production.</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          13년 동안 커머스 서비스를 만들었고,
          현재는 AI Agent를 활용해 제품을 기획하고 개발하고 배포하고 운영하고 있습니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)]"
          >
            View Products
          </Link>
          <Link
            href="https://github.com/ksungz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            View GitHub
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            Read Case Studies
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Featured Products
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProducts.map(({ name, tagline, description, href, tags }) => (
            <Link
              key={name}
              href={href}
              className="group rounded-lg border border-[var(--color-border)] p-5 transition-colors hover:border-[var(--color-foreground)]"
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
      </section>

      {/* What I Do */}
      <section className="mb-20">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          What I Do
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">문제 정의</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              왜 만들었는가부터 시작합니다. 기술 선택보다 문제가 먼저입니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">AI 활용 구현</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              AI Agent로 반복 작업을 줄이고, 사람은 결정과 검증에 집중합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">운영과 개선</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              배포로 끝내지 않습니다. 운영 데이터와 피드백으로 다음 반복을 설계합니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}