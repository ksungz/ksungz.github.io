import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "AI Product Engineer 김성재의 대표 제품 — AX Doctor, News Automation, BabyPick AI, OpenClaw Lab, Commerce AI",
};

const products = [
  {
    id: "ax-doctor",
    name: "AX Doctor",
    tagline: "AI 개발 환경 도입 전 점검 CLI",
    problem: "새 AI 도구를 설치하기 전에 기존 설정과 충돌, 권한, 미확인 범위를 확인할 방법이 없었습니다.",
    solution: "기존 환경과 도입 대상을 읽기 전용으로 비교해 판단 근거를 남기는 Go 기반 preflight CLI를 만들었습니다.",
    stack: ["Go", "JSON Schema", "CLI", "Synthetic Test"],
    status: "합성 데모 완료 · public 전환 보류",
    links: [
      { label: "GitHub", href: "https://github.com/ksungz/ax-doctor" },
    ],
  },
  {
    id: "news-automation",
    name: "News Automation",
    tagline: "뉴스 선택부터 블로그 PR까지 자동화 파이프라인",
    problem: "매일 기술 뉴스를 읽지만 읽는 데서 끝나고, 며칠 뒤 내용을 다시 찾기 어려웠습니다.",
    solution: "GeekNews 큐레이션 → 텔레그램 선택 → AI 분석 → MDX 초안 → GitHub PR 자동 생성 파이프라인을 구축했습니다.",
    stack: ["Telegram Bot", "AI Agent", "MDX", "GitHub API"],
    status: "운영 중 · 10편+ 블로그 초안 생성",
    links: [],
  },
  {
    id: "babypick-ai",
    name: "BabyPick AI",
    tagline: "AI 콘텐츠 자동 발행으로 220개+ 가이드 운영",
    problem: "혼자 서비스 개발과 콘텐츠 작성을 함께 하기에는 시간이 부족했습니다.",
    solution: "키워드 선택 → AI 생성 → 형식 검증 → API 발행 → 블로그·인스타 자동화까지 구축하고 운영 중입니다.",
    stack: ["Google Apps Script", "Gemini", "Ollama", "Supabase", "Next.js"],
    status: "운영 중 · 220개+ 가이드, 블로그·인스타 자동화",
    links: [
      { label: "사이트", href: "https://babypick.co.kr/guide" },
    ],
  },
  {
    id: "openclaw-lab",
    name: "OpenClaw Lab",
    tagline: "다중 AI 에이전트 연결 CLI",
    problem: "Claude Code, Codex, Gemini CLI를 바꿀 때마다 작업 맥락을 다시 설명해야 했습니다.",
    solution: "에이전트 연결 정보를 JSON 어댑터로 분리하고, 작업 맥락과 실행 기록을 공통 관리하는 오픈소스 CLI를 만들었습니다.",
    stack: ["Node.js", "CLI", "MIT License"],
    status: "공개 중 · Hermes Agent의 전신",
    links: [
      { label: "GitHub", href: "https://github.com/ksungz/agent-bridge" },
    ],
  },
  {
    id: "commerce-ai",
    name: "Commerce AI",
    tagline: "커머스 서비스에 AI 도입",
    problem: "2,384개 SCSS 파일 전환, 반복 산출물 작성, PR 리뷰 등 반복 작업이 많았습니다.",
    solution: "Cursor·Claude 기반 변환 스크립트, PR Review Agent 8개 저장소 적용, 커밋·PR·QA 체크리스트 작성 흐름을 정리했습니다.",
    stack: ["Cursor", "Claude", "Codex", "Bitbucket Pipelines", "Storybook"],
    status: "재직 중 · 2,384파일 Sass 전환, PR Review Agent 운영",
    links: [],
  },
];

export default function Products() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Products</p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">대표 제품</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          회사 경력보다 대표 제품이 먼저 보여야 합니다.
          각 제품은 Problem → Solution → Stack → Status 구조로 작성했습니다.
        </p>
      </section>

      <section className="space-y-8">
        {products.map(({ id, name, tagline, problem, solution, stack, status, links }) => (
          <div key={id} id={id} className="rounded-lg border border-[var(--color-border)] p-6 scroll-mt-20">
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
              {links.length > 0 && (
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
        ))}
      </section>
    </div>
  );
}