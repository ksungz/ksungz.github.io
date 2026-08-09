import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "13년간 서비스의 UI를 개발·운영하며 레거시 구조를 개선하고, AI를 개발과 검증 과정에 활용해온 Frontend Engineer 김성재입니다.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">About</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">김성재</h1>
        <p className="mb-4 sm:mb-6 text-sm font-medium">Frontend Engineer</p>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
          <p>
            13년간 커머스·게임·플랫폼 서비스의 UI를 개발하고 운영했습니다.
            모바일웹 상품상세와 신규 서비스 UI를 담당하며 복잡한 화면 상태,
            반응형 UI, 크로스브라우징, 디자인 검수와 운영 대응을 수행했습니다.
          </p>
          <p>
            2,384개 SCSS 파일의 Dart Sass 전환과 React·TypeScript 컴포넌트 이관,
            CSS 내재화와 Storybook 기반 검증 환경 구축을 진행했습니다.
            오래된 구조를 한 번에 바꾸기보다 변경 범위와 결과를 확인하며 단계적으로 전환하는 방식을 선호합니다.
          </p>
          <p>
            하이브랩에서는 약 3년간 팀장으로 업무 분배, 공수 산정, 품질 관리와
            클라이언트 커뮤니케이션을 담당했습니다.
          </p>
          <p>
            최근에는 Claude Code, Codex, Cursor와 회사에서 제공한 AI 도구를
            코드 검토, 문서 초안과 반복 작업에 활용하고 있습니다.
            도구가 만든 결과는 실행과 테스트로 다시 확인하며, 개인 프로젝트는
            제가 정한 문제 범위와 실제 구현 범위, 현재 한계를 구분해 기록합니다.
          </p>
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Approach
        </h2>
        <div className="space-y-3">
          {[
            { q: "서비스 UI 개발·운영", a: "화면의 상태와 예외, 여러 직군의 변경 범위를 확인하고 운영 중인 서비스에 안정적으로 반영합니다." },
            { q: "레거시 현대화", a: "기존 산출물과 운영 영향을 확인하며 HTML·SCSS 구조를 React와 현대적인 스타일 환경으로 단계적으로 전환합니다." },
            { q: "컴포넌트 검증", a: "Storybook과 문서로 화면 상태와 협업 기준을 확인할 수 있게 정리합니다." },
            { q: "AI-assisted Development", a: "AI는 반복 검토와 초안을 돕고, 설계와 영향 범위, 최종 결과는 직접 확인합니다." },
            { q: "협업과 리딩", a: "업무 범위와 일정을 조율하고 여러 사람이 같은 기준으로 작업할 수 있도록 문서화합니다." },
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
