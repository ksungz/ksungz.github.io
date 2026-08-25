import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "커머스·게임·플랫폼 서비스의 UI를 개발·운영하며 오래된 화면과 스타일 구조를 단계적으로 개선해온 Frontend Engineer 김성재입니다.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">About</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">김성재</h1>
        <p className="mb-4 sm:mb-6 text-sm font-medium">Frontend Engineer · Service UI</p>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
          <p>
            13년 동안 커머스·게임·플랫폼 서비스의 UI를 개발하고 운영했습니다.
            현재는 11번가 모바일웹 상품상세와 신규 서비스 화면을 맡아,
            기기와 브라우저별 차이를 확인하고 운영 중 발생하는 문제에 대응하고 있습니다.
          </p>
          <p>
            공통 UI와 SCSS 구조를 정리했으며, AI 보조 도구를 활용해 2,384개 SCSS 파일을
            Dart Sass로 전환하고 산출물과 빌드 결과를 확인했습니다. HTML/SCSS 화면의
            React·TypeScript 컴포넌트 이관과 Storybook 확인 환경 구축에도 참여했습니다.
            오래된 구조는 서비스에 미치는 영향을 살피며 단계적으로 개선합니다.
          </p>
          <p>
            하이브랩에서는 약 3년간 팀장으로 업무 분배, 공수 산정, 품질 관리와
            클라이언트 커뮤니케이션을 담당했습니다.
          </p>
          <p>
            최근에는 AI 도구를 코드 검토와 문서 초안, 반복 작업에 활용합니다.
            결과는 직접 실행하고 테스트합니다. 개인 프로젝트 역시 해결할 문제와
            구현 범위를 먼저 정하고, 확인한 결과와 남은 한계를 함께 기록합니다.
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
