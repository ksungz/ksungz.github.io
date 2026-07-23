import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "김성재 — AX Engineer. 다년간 제품 UI 운영 경험을 기반으로 AI Agent, RAG, MCP와 자동화를 설계하고 운영합니다.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">About</p>
        <h1 className="text-3xl font-bold tracking-tight mb-6">김성재</h1>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
          <p>
            다년간 커머스·게임·플랫폼 서비스의 UI를 개발하고 운영했습니다.
            오래 운영되는 서비스에서 사람이 같은 맥락을 반복해서 찾고,
            리뷰와 산출물을 매번 처음부터 만들며, 작은 변경도 여러 영역을 다시 확인해야 하는 문제를 경험했습니다.
          </p>
          <p>
            이 문제를 줄이기 위해 AI Agent, RAG, MCP와 자동화 워크플로우를
            실제 개발 과정에 적용하고 있습니다. AI가 판단을 대신하게 하기보다
            필요한 맥락과 초안, 확인 항목을 준비하게 하고
            제품과 사용자에게 영향을 주는 결정은 사람이 담당하는 방식을 선호합니다.
          </p>
          <p>
            하이브랩에서는 약 3년간 팀장으로 업무 분배, 공수 산정, 품질 관리와
            클라이언트 커뮤니케이션을 담당했습니다.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Approach
        </h2>
        <div className="space-y-3">
          {[
            { q: "현업 문제 이해", a: "다년간 제품 운영 경험을 기반으로 반복 업무와 맥락 단절을 찾습니다." },
            { q: "AX 시스템 설계", a: "Agent, RAG, MCP와 자동화 워크플로우를 직접 구현하고 운영합니다." },
            { q: "Human-in-the-loop", a: "AI는 초안과 확인 항목을 준비하고, 최종 판단은 사람이 합니다." },
            { q: "AI 제품 구현", a: "아이디어를 실제 사용할 수 있는 제품으로 만들고 배포·운영합니다." },
            { q: "운영과 개선", a: "배포 후 운영 데이터와 피드백으로 다음 반복을 설계합니다." },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-lg border border-[var(--color-border)] p-4">
              <p className="text-sm font-semibold">{q}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Links
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)]"
          >
            Products
          </Link>
          <Link
            href="/career"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            Career
          </Link>
          <a
            href="https://github.com/ksungz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}