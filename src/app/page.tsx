import Link from "next/link";

const featuredProducts = [
  {
    name: "AX Doctor",
    tagline: "AI 개발 환경 도입 전 점검 CLI",
    description: "기존 설정과 충돌, 권한, 미확인 범위를 읽기 전용으로 진단하는 Go 기반 preflight 도구.",
    href: "/products#ax-doctor",
    tags: ["Go", "CLI", "Preflight"],
    group: "AX Systems",
  },
  {
    name: "Obsidian RAG",
    tagline: "여러 AI 에이전트가 같은 문서를 검색하는 로컬 RAG",
    description: "Obsidian 문서를 Ollama 임베딩으로 인덱싱하고 MCP·HTTP·CLI로 검색하는 환경.",
    href: "/products#obsidian-rag",
    tags: ["RAG", "Ollama", "ChromaDB", "MCP"],
    group: "AX Systems",
  },
  {
    name: "BabyPick AI",
    tagline: "육아용품 탐색 서비스 + AI 콘텐츠 자동 발행",
    description: "Next.js 서비스 구축, 키워드 관리→AI 생성→검증→발행→블로그·인스타 자동화까지 운영.",
    href: "/products#babypick-ai",
    tags: ["Next.js", "Supabase", "AI Content", "Automation"],
    group: "AI Products",
  },
  {
    name: "News Automation",
    tagline: "뉴스 선택부터 블로그 PR까지 Human-in-the-loop 파이프라인",
    description: "GeekNews 큐레이션 → 텔레그램 선택 → AI 분석 → MDX 초안 → GitHub PR 자동 생성.",
    href: "/products#news-automation",
    tags: ["AI Agent", "Telegram Bot", "Automation"],
    group: "AI Products",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Hero */}
      <section className="mb-20">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">AX Engineer</p>
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          다년간의 제품 UI 운영 경험을
          <br />
          <span className="text-[var(--color-muted)]">AI Agent와 자동화로 전환합니다.</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          커머스·게임·플랫폼 서비스에서 UI를 개발하고 운영하며
          현장의 반복 업무, 맥락 단절, 검증 비용 문제를 경험했습니다.
          그 경험을 바탕으로 Agent, RAG, MCP와 자동화 워크플로우를
          직접 설계하고 운영하고 있습니다.
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
              아이디어를 실제 사용할 수 있는 제품으로 만들고, 배포 후 운영 데이터로 반복 개선합니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}