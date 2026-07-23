import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "AX Engineer 김성재의 제품 — AX Systems (AX Doctor, Obsidian RAG, Hermes Agent) · AI Products (BabyPick AI, News Automation)",
};

const axSystems: ProductData[] = [
  {
    id: "ax-doctor",
    name: "AX Doctor",
    tagline: "AI 개발 환경 도입 전 점검 CLI",
    problem: "새 AI 도구를 설치하기 전에 기존 설정과 충돌, 권한, 미확인 범위를 확인할 방법이 없었습니다.",
    solution: "기존 환경과 도입 대상을 읽기 전용으로 비교해 판단 근거를 남기는 Go 기반 preflight CLI를 만들었습니다.",
    stack: ["Go", "JSON Schema", "CLI", "Synthetic Test"],
    status: "합성 데모 완료 · Prototype",
    links: [],
  },
  {
    id: "obsidian-rag",
    name: "Obsidian RAG",
    tagline: "여러 AI 에이전트가 같은 문서를 검색하는 로컬 RAG",
    problem: "에이전트를 바꿀 때마다 같은 프로젝트 배경을 다시 설명해야 했고, 과거 결정을 찾기 위해 문서를 직접 검색하는 일이 반복됐습니다.",
    solution: "Obsidian 문서를 Ollama 임베딩으로 변환해 ChromaDB에 저장하고, MCP·HTTP·CLI로 검색하는 로컬 RAG 환경을 구축했습니다.",
    stack: ["Ollama", "ChromaDB", "FastAPI", "MCP"],
    status: "운영 중 · 202개 문서 3,045개 청크 인덱싱",
    links: [],
  },
  {
    id: "hermes-agent",
    name: "Hermes Agent",
    tagline: "OpenClaw에서 발전한 개인 AI 에이전트 하네스",
    problem: "여러 AI 에이전트(Claude Code, Codex, Gemini CLI)를 바꿀 때마다 작업 맥락과 실행 기록이 흩어졌습니다.",
    solution: "Discord 연동, Obsidian RAG, cron 자동화, 다중 모델 지원을 갖춘 에이전트 하네스로 발전시켰습니다. OpenClaw 실험에서 시작해 현재 운영 중인 환경입니다.",
    stack: ["Agent Runtime", "Discord", "Cron", "Multi-Model", "MCP"],
    status: "운영 중 · 일일 작업 로그, 트렌드 브리핑, 자동화 cron 운영",
    links: [],
  },
];

const aiProducts: ProductData[] = [
  {
    id: "babypick-ai",
    name: "BabyPick AI",
    tagline: "육아용품 탐색 서비스 + AI 콘텐츠 자동 발행",
    problem: "혼자 서비스 개발과 콘텐츠 작성을 함께 하기에는 시간이 부족했습니다.",
    solution: "Next.js 서비스 구축, 키워드 관리→AI 생성→검증→API 발행→블로그·인스타 자동화까지 End-to-End로 구축하고 운영 중입니다.",
    stack: ["Next.js", "Supabase", "Google Apps Script", "Gemini", "Ollama"],
    status: "운영 중 · 220개+ 가이드, 블로그·인스타 자동화",
    links: [
      { label: "사이트", href: "https://babypick.co.kr/guide" },
    ],
  },
  {
    id: "news-automation",
    name: "News Automation",
    tagline: "뉴스 선택부터 블로그 PR까지 Human-in-the-loop 파이프라인",
    problem: "매일 기술 뉴스를 읽지만 읽는 데서 끝나고, 며칠 뒤 내용을 다시 찾기 어려웠습니다.",
    solution: "GeekNews 큐레이션 → 텔레그램 선택 → AI 분석 → MDX 초안 → GitHub PR 자동 생성 파이프라인을 구축했습니다. 글 선택과 최종 검수는 사람이 담당합니다.",
    stack: ["Telegram Bot", "AI Agent", "MDX", "GitHub API"],
    status: "운영 중 · 10편+ 블로그 초안 생성",
    links: [],
  },
];

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  status: string;
  links: { label: string; href: string }[];
}

function ProductCard({ id, name, tagline, problem, solution, stack, status, links }: ProductData) {
  return (
    <div id={id} className="rounded-lg border border-[var(--color-border)] p-6 scroll-mt-20">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="mt-1 text-sm font-medium text-[var(--color-muted)]">{tagline}</p>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-1">Problem</p>
          <p className="text-sm leading-relaxed">{problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-1">Solution</p>
          <p className="text-sm leading-relaxed">{solution}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-1">Status</p>
          <p className="text-sm text-[var(--color-muted)]">{status}</p>
        </div>
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
              >
                {label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Products</p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">제품</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          Agent Infrastructure → Workflow AX → AI Product Delivery.
          AX Systems와 AI Products 두 축으로 구성했습니다.
        </p>
      </section>

      {/* AX Systems */}
      <section className="mb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          AX Systems
        </h2>
        <div className="space-y-8">
          {axSystems.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* AI Products */}
      <section>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          AI Products
        </h2>
        <div className="space-y-8">
          {aiProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </div>
  );
}