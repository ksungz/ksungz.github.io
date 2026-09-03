import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "커머스, 게임, 플랫폼 서비스의 UI를 13년간 개발하고 운영해온 Frontend Engineer 김성재입니다.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">About</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">김성재</h1>
        <p className="mb-4 sm:mb-6 text-sm font-medium">Frontend Engineer | Service UI</p>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
          <p>
            13년 동안 커머스, 게임, 플랫폼 서비스의 UI를 개발하고 운영했습니다.
            11번가에서는 모바일웹 상품상세와 앱 WebView UI를 담당하며,
            상품 유형과 기기, 브라우저 환경별 차이를 확인하며 변경 사항을 반영했습니다.
          </p>
          <p>
            React 기반 신규 UI 블록 약 18개를 구현하고, 공통 스타일을 제외한 운영 블록 SCSS 약 108개를
            컴포넌트 구조에 맞춰 재구성해 React 저장소에 내재화했습니다. 이 작업은 상품상세 첫 화면(ATF) 개선에 반영됐습니다.
          </p>
          <p>
            하이브랩에서는 약 3년간 팀장으로 업무 분배, 공수 산정, 품질 관리와
            클라이언트 커뮤니케이션을 담당했습니다.
          </p>
          <p>
            기획, 디자인, 백엔드 담당자와 변경 범위를 조율하고, 서비스에 미치는 영향을 확인하며
            단계적으로 개선해왔습니다. 최근에는 AI 도구를 반복 작업과 코드 검토에 활용하되,
            최종 결과는 직접 확인하고 있습니다.
          </p>
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Approach
        </h2>
        <div className="space-y-3">
          {[
            { q: "서비스 UI 개발과 운영", a: "화면의 상태와 예외를 구현하고 여러 기기와 브라우저에서 결과를 확인합니다." },
            { q: "레거시 UI 전환", a: "기존 산출물과 운영 영향을 확인하며 HTML과 SCSS 구조를 React와 새로운 스타일 환경으로 옮깁니다." },
            { q: "컴포넌트 검증", a: "컴포넌트의 상태와 화면을 Storybook에서 확인할 수 있도록 정리합니다." },
            { q: "협업과 리딩", a: "업무 범위와 일정을 조율하고 여러 사람이 같은 기준으로 작업할 수 있도록 문서화합니다." },
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
