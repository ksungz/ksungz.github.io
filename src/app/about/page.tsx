import type { Metadata } from "next";
import Link from "next/link";
import { profileDescription, profileIntroduction } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description: profileDescription,
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">About</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">김성재</h1>
        <p className="mb-4 sm:mb-6 text-sm font-medium">서비스 개발과 운영</p>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
          {profileIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Approach
        </h2>
        <div className="space-y-3">
          {[
            { q: "서비스 UI 개발과 운영", a: "화면의 상태와 예외를 구현하고 여러 기기와 브라우저에서 결과를 확인합니다." },
            { q: "기존 구조 개선", a: "컴포넌트와 스타일의 관계를 살펴 관리할 단위를 정하고, 이관 전후의 화면을 확인합니다." },
            { q: "컴포넌트 검증", a: "컴포넌트의 상태와 화면을 Storybook에서 확인할 수 있도록 정리합니다." },
            { q: "팀 리딩", a: "하이브랩에서 고객사 요구사항을 조율하고 공수 산정, 업무 배분, 일정과 품질 관리를 맡았습니다." },
            { q: "AI 도구 활용", a: "반복 검토와 초안 작성에 활용하되 설계, 영향 범위와 최종 결과는 직접 확인합니다." },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-lg border border-[var(--color-border)] p-4">
              <p className="text-sm font-semibold">{q}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Links
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2.5 sm:py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)] min-h-[44px]"
          >
            Projects
          </Link>
          <Link
            href="/career"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            Career
          </Link>
          <a
            href="https://github.com/ksungz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            GitHub
          </a>
          <a
            href="mailto:k.suzkim@gmail.com"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
