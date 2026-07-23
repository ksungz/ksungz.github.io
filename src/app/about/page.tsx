import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "김성재 — AI Product Engineer. 13년 UI 개발에서 제품 엔지니어링으로.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">About</p>
        <h1 className="text-3xl font-bold tracking-tight mb-6">김성재</h1>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
          <p>
            13년 동안 UI를 만들어왔습니다.
            하지만 지금은 좋은 제품을 빠르게 만드는 것에 더 관심이 있습니다.
          </p>
          <p>
            AI Agent를 이용해 기획, 개발, 배포, 운영, 자동화를 구축하고 있습니다.
            커머스 서비스에서 쌓은 UI 개발과 운영 경험을 바탕으로,
            문제 정의부터 구현, 검증, 운영까지 직접 다루는 Product Engineer로 일하고 있습니다.
          </p>
          <p>
            기술보다 Problem Solving, Decision Making, Iteration, Impact를 더 중요하게 생각합니다.
            AI가 판단을 대신하기보다 필요한 맥락을 찾아 초안과 확인 항목을 준비하고,
            사람은 제품과 사용자에게 영향을 주는 결정에 집중하는 개발 환경을 만들고 있습니다.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Approach
        </h2>
        <div className="space-y-3">
          {[
            { q: "왜 만들었는가", a: "문제 정의가 기술 선택보다 먼저입니다." },
            { q: "어떤 문제를 해결했는가", a: "반복되는 작업과 맥락 단절을 줄입니다." },
            { q: "어떤 선택을 했는가", a: "도구 중심이 아니라 역량 중심으로 판단합니다." },
            { q: "무엇을 배웠는가", a: "AI 결과는 초안이고, 최종 판단은 사람이 합니다." },
            { q: "다음에는 어떻게 개선할 것인가", a: "운영 데이터와 피드백으로 다음 반복을 설계합니다." },
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