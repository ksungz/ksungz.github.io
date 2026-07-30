import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description: "서비스 UI 경험을 바탕으로 문제 범위를 정하고 AI 코딩 에이전트와 함께 구현·검증한 AI Workflow와 Product 프로젝트",
};

interface ProductLink {
  label: string;
  href: string;
  external?: boolean;
}

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  status: string;
  links: { label: string; href: string }[];
  relatedLinks: ProductLink[];
}

const axSystems: ProductData[] = [
  {
    id: "agent-bridge",
    name: "Agent Bridge",
    tagline: "로그인된 여러 AI CLI를 한 작업 단위로 연결하는 오픈소스 도구",
    problem: "Claude Code, Codex, Gemini CLI를 각각 구독·로그인해 사용했지만, 한 작업에서 함께 쓰려면 요청과 결과를 직접 옮기고 다음 에이전트에게 다시 설명해야 했습니다. API 키 기반 모델 라우터가 아니라 기존 CLI 환경을 유지한 채 조합하는 방법이 필요했습니다.",
    solution: "제품 범위와 작업 기록 계약을 정하고 AI 코딩 에이전트를 활용해, 각 CLI를 독립된 로컬 프로세스로 실행하는 얇은 오케스트레이션 계층을 구현했습니다. 실제 CLI 실행과 테스트로 동작을 검증했으며, 인증·결제를 대신 관리하거나 API를 프록시하지 않습니다.",
    stack: ["Node.js", "CLI", "MIT", "CI"],
    status: "오픈소스 · v0.1.1 · 공개 설치와 Codex CLI 실행 검증",
    links: [
      { label: "GitHub", href: "https://github.com/ksungz/agent-bridge" },
      { label: "Release", href: "https://github.com/ksungz/agent-bridge/releases/tag/v0.1.1" },
    ],
    relatedLinks: [
      { label: "Case Study", href: "/case-studies/agent-bridge" },
    ],
  },
  {
    id: "ax-doctor",
    name: "AX Doctor",
    tagline: "AI 개발 환경 도입 전 점검 CLI",
    problem: "새 AI 도구를 설치하기 전에 기존 설정과 충돌, 권한, 미확인 범위를 확인할 방법이 없었습니다.",
    solution: "제품 범위, 비목표, 입력·출력 계약, 위협 모델과 완료 기준을 먼저 정하고 AI 코딩 에이전트를 활용해 Go 기반 preflight CLI를 구현했습니다. 합성 시나리오와 품질 게이트를 직접 실행해 판정과 현재 한계를 검증했습니다.",
    stack: ["Go", "JSON Schema", "CLI", "Synthetic Test"],
    status: "v0.1.0-alpha.1 · 합성 데모 자체 검증 · 실제 환경 스캐너 미연결",
    links: [
      { label: "GitHub", href: "https://github.com/ksungz/ax-doctor" },
      { label: "Alpha Release", href: "https://github.com/ksungz/ax-doctor/releases/tag/v0.1.0-alpha.1" },
    ],
    relatedLinks: [
      { label: "Case Study", href: "/case-studies/ax-doctor" },
      { label: "개발 기록", href: "/engineering/ax-doctor-preflight" },
    ],
  },
  {
    id: "ax-evidence-gates",
    name: "AX Evidence Gates",
    tagline: "API 연동 코드·상품 정보·투자 답변을 공개 근거로 점검하는 검수 도구 3종",
    problem: "AI가 자연스러운 답변과 데이터를 빠르게 만들더라도, 실제 업무에 사용하려면 근거가 없는 단정과 누락된 조건, 확인하지 못한 범위를 반복해서 검수할 수 있어야 했습니다.",
    solution: "AX 인재전쟁 2026 과제에서 문제 범위와 근거·판정 기준을 정하고, AI 에이전트를 활용해 세 개의 로컬 품질 게이트를 구현했습니다. 해커톤 종료 후에는 LangGraph를 학습하기 위한 후속 PoC로 AI 코딩 에이전트와 함께 금융 답변 게이트에 사람 검토 단계를 추가했습니다. 현재는 워크북으로 코드와 실행 경로를 학습하고 있으며, 독립적인 LangGraph 설계 경험으로 표기하지 않습니다.",
    stack: ["Python", "LangGraph", "Human-in-the-loop", "CI"],
    status: "실제 해커톤 제출물 공개 · LangGraph 학습용 후속 PoC · 49 tests",
    links: [
      { label: "GitHub", href: "https://github.com/ksungz/ax-evidence-gates" },
    ],
    relatedLinks: [
      { label: "Case Study", href: "/case-studies/ax-evidence-gates" },
      { label: "해커톤 후기", href: "/engineering/ax-hackathon-retrospective" },
    ],
  },
  {
    id: "obsidian-rag",
    name: "Obsidian RAG",
    tagline: "여러 AI 에이전트가 같은 문서를 검색하는 로컬 RAG",
    problem: "에이전트를 바꿀 때마다 같은 프로젝트 배경을 다시 설명해야 했고, 과거 결정을 찾기 위해 문서를 직접 검색하는 일이 반복됐습니다.",
    solution: "Obsidian 문서를 Ollama 임베딩으로 변환해 ChromaDB에 저장하고, MCP·HTTP·CLI로 검색하는 로컬 RAG 환경을 구축했습니다. RAG 서버는 답변을 대신 만들지 않고 관련 문서 조각과 출처만 반환하며, 최종 판단은 각 에이전트가 담당하도록 분리했습니다.",
    stack: ["Ollama", "ChromaDB", "FastAPI", "MCP"],
    status: "운영 중 · 202개 문서 3,045개 청크 인덱싱",
    links: [],
    relatedLinks: [
      { label: "Case Study", href: "/case-studies/obsidian-rag" },
      { label: "기술 글", href: "/engineering/obsidian-rag" },
    ],
  },
  {
    id: "hermes-agent",
    name: "Hermes Agent",
    tagline: "정기 작업과 도구 실행을 운영하는 개인 AI 에이전트 런타임",
    problem: "작업 기록을 연결하는 것과 별개로, Discord 요청과 정기 작업, 검색 도구 실행을 한 환경에서 지속적으로 운영할 런타임이 필요했습니다.",
    solution: "Discord를 요청 창구로 두고 Obsidian RAG, cron 자동화와 다중 모델 실행을 연결했습니다. Agent Bridge가 작업 인계 형식을 담당한다면, Hermes는 일일 작업 로그와 트렌드 브리핑 같은 실행을 운영하는 개인 런타임으로 역할을 구분했습니다.",
    stack: ["Agent Runtime", "Discord", "Cron", "Multi-Model", "MCP"],
    status: "개인 환경 운영 중 · 일일 작업 로그, 트렌드 브리핑, cron 자동화",
    links: [],
    relatedLinks: [
      { label: "초기 구조", href: "/engineering/ai-workspace" },
      { label: "전환 과정", href: "/engineering/hermes-agent-runtime" },
      { label: "하네스 점검", href: "/engineering/ai-agent-harness-audit" },
    ],
  },
];

const aiProducts: ProductData[] = [
  {
    id: "babypick-ai",
    name: "BabyPick",
    tagline: "육아용품 탐색 서비스와 사람 검수형 콘텐츠 운영",
    problem: "혼자 서비스 개발과 콘텐츠 작성을 함께 하기에는 시간이 부족했습니다.",
    solution: "Next.js와 Supabase로 서비스를 구축하고, 키워드 관리 → AI 생성 → 중복·금지 표현 검사 → API 발행으로 공식 가이드를 자동화했습니다. 네이버 블로그는 SmartEditor 임시저장, 인스타그램은 콘텐츠 패키지와 검수 대기열까지만 연결하고 공개는 사람이 결정합니다.",
    stack: ["Next.js", "Supabase", "Google Apps Script", "LLM", "Human-in-the-loop"],
    status: "운영 중 · 공식 가이드 220개+ · 외부 채널은 사람 검수 후 발행",
    links: [
      { label: "사이트", href: "https://babypick.co.kr/guide" },
    ],
    relatedLinks: [
      { label: "Case Study", href: "/case-studies/babypick-ai" },
    ],
  },
  {
    id: "news-automation",
    name: "News Automation",
    tagline: "뉴스 선택부터 블로그 PR까지 Human-in-the-loop 파이프라인",
    problem: "매일 기술 뉴스를 읽지만 읽는 데서 끝나고, 며칠 뒤 내용을 다시 찾기 어려웠습니다.",
    solution: "GeekNews 큐레이션 → 텔레그램 선택 → AI 분석(원문+커뮤니티 댓글) → MDX 초안 → GitHub PR 자동 생성 파이프라인을 구축했습니다. Claude CLI 우선, 실패 시 Ollama 폴백. 글 선택과 최종 검수는 사람이 담당합니다.",
    stack: ["Telegram Bot", "AI Agent", "MDX", "GitHub API"],
    status: "운영 중 · 10편+ 블로그 초안 생성",
    links: [],
    relatedLinks: [
      { label: "Case Study", href: "/case-studies/news-automation" },
      { label: "기술 글", href: "/engineering/ai-news-agent" },
    ],
  },
];

function ProductCard({ id, name, tagline, problem, solution, stack, status, links, relatedLinks }: ProductData) {
  return (
    <div id={id} className="rounded-lg border border-[var(--color-border)] p-4 sm:p-6 scroll-mt-20">
      <h3 className="text-lg sm:text-xl font-bold">{name}</h3>
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">Links</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px] sm:min-h-0"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        )}
        {relatedLinks && relatedLinks.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">자세히 보기</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {relatedLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-3 py-2 sm:py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)] min-h-[44px] sm:min-h-0"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Products</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">AX 시스템과 AI 제품</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          Agent Infrastructure → AI Product Delivery.
          직접 만든 AX Systems와 AI Products 두 축으로 구성했습니다.
        </p>
      </section>

      {/* AX Systems */}
      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          AX Systems
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {axSystems.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* AI Products */}
      <section>
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          AI Products
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {aiProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </div>
  );
}
