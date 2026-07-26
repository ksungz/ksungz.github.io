import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Problem → My Role → Decision → Implementation → Validation → Result → Limitations",
};

const caseStudies = [
  {
    id: "developer-workflow-ax",
    title: "Developer Workflow AX — 팀의 반복 업무에 AI를 적용한 과정",
    excerpt: "승인된 업무 문맥 연결, 회사 제공 PR Review Agent의 8개 저장소 적용, 공통 작성 규칙과 사람의 검증 범위를 정리한 실무 사례.",
    href: "/case-studies/developer-workflow-ax",
    tags: ["Workflow AX", "MCP", "AI Review", "Human-in-the-loop"],
  },
  {
    id: "ax-doctor",
    title: "AX Doctor — AI 도입 전 점검 도구",
    excerpt: "AI 개발 환경을 설치하기 전에 기존 설정과 충돌, 권한, 미확인 범위를 읽기 전용으로 진단하는 CLI를 설계하고 구현했습니다.",
    href: "/case-studies/ax-doctor",
    tags: ["Go", "CLI", "Preflight", "Privacy-by-design"],
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
    id: "babypick-ai",
    title: "BabyPick — 육아용품 탐색 서비스와 콘텐츠 운영 자동화",
    excerpt: "공식 가이드의 생성·검증·API 발행을 자동화하고, 네이버·인스타 콘텐츠는 사람 검수 전 단계까지 연결한 운영 사례입니다.",
    href: "/case-studies/babypick-ai",
    tags: ["AI Content", "Automation", "Supabase", "Human-in-the-loop"],
  },
];

export default function CaseStudies() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Case Studies</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">문제 해결 과정</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          기술 목록보다 문제, 담당 범위, 판단, 구현, 검증 결과와 현재 한계를 함께 보여줍니다.
        </p>
      </section>

      <section className="space-y-3 sm:space-y-4">
        {caseStudies.map(({ id, title, excerpt, href, tags }) => (
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
      </section>
    </div>
  );
}
