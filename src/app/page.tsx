import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const featuredProducts = [
  {
    name: "모바일웹 상품상세 UI",
    tagline: "상품상세와 앱 WebView의 UI 개발과 운영",
    description: "여러 유형의 상품상세와 앱 WebView UI를 담당하며 변경 범위를 확인하고, 반응형 화면과 기기별 이슈를 운영 환경에 맞춰 반영했습니다.",
    href: "/engineering/pdp-ui",
    tags: ["Service UI", "Responsive", "Accessibility"],
  },
  {
    name: "React UI와 SCSS 내재화",
    tagline: "분리된 코드와 스타일의 작업 맥락 통합",
    description: "신규 UI 블록 약 18개를 구현하고, 공통 스타일을 제외한 운영 블록 SCSS 약 108개를 React 구조에 맞춰 재구성해 상품상세 첫 화면(ATF) 개선에 반영했습니다.",
    href: "/engineering/react-pdp",
    tags: ["React", "TypeScript", "SCSS"],
  },
  {
    name: "Dart Sass와 빌드 개선",
    tagline: "대규모 문법 전환과 빌드 병렬화",
    description: "약 2,384개 SCSS 파일을 Dart Sass로 전환하고 결과를 직접 검증했습니다. 별도 작업으로 직렬 빌드를 병렬화해 약 24초에서 14초 내외로 줄였습니다.",
    href: "/engineering/dart-sass",
    tags: ["Dart Sass", "Build", "Validation"],
  },
  {
    name: "Commerce UI Components",
    tagline: "실무 경험을 바탕으로 다시 만든 상품 옵션 UI",
    description: "옵션 조합, 재고, 오류와 모바일 바텀시트 상태를 React 컴포넌트로 구현하고 Storybook에서 검증했습니다.",
    href: "https://ksungz-ui.vercel.app/?path=/story/case-studies-상품-옵션-선택--design-and-verification",
    tags: ["React", "Storybook", "Accessibility"],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

      {/* Hero */}
      <section className="mb-16 sm:mb-20">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">
          Frontend Engineer | Service UI
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6 leading-snug sm:leading-tight">
          <span className="block">서비스 UI를 만들고 운영하며</span>
          <span className="block text-[var(--color-muted)]">복잡한 화면과 오래된 구조를</span>
          <span className="block text-[var(--color-muted)]">단계적으로 개선해왔습니다.</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          13년 동안 커머스, 게임, 플랫폼 서비스의 UI를 개발하고 운영했습니다.
          11번가에서는 모바일웹 상품상세와 앱 WebView UI를 담당하며,
          상품 유형과 기기, 브라우저 환경별 차이를 확인하며 변경 사항을 단계적으로 반영했습니다.
          최근에는 React 기반 신규 UI 블록을 구현하고, 분리돼 있던 운영 SCSS를 컴포넌트 구조에 맞춰 React 저장소로 옮겼습니다.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/career"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2.5 sm:py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)] min-h-[44px]"
          >
            View Career
          </Link>
          <Link
            href="https://github.com/ksungz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            View GitHub
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2.5 sm:py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px]"
          >
            View Projects
          </Link>
        </div>
      </section>

      {/* Featured Work */}
      <section className="mb-16 sm:mb-20">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Featured Work
        </h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {featuredProducts.map(({ name, tagline, description, href, tags }) => (
            <Link
              key={name}
              href={href}
              className="group rounded-lg border border-[var(--color-border)] p-4 sm:p-5 transition-colors hover:border-[var(--color-foreground)]"
            >
              <h3 className="text-base font-semibold group-hover:text-[var(--color-foreground)]">
                {name}
              </h3>
              <p className="mt-1 text-xs font-medium text-[var(--color-muted)]">{tagline}</p>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">{description}</p>
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
        </div>
        <Link
          href="/products"
          className="mt-4 flex min-h-[44px] flex-col justify-center gap-1 border-t border-[var(--color-border)] py-3 text-xs transition-colors hover:text-[var(--color-foreground)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <strong className="font-semibold">개인 프로젝트와 AI 활용 기록</strong>
            <span className="ml-2 text-[var(--color-muted)]">
              직접 만든 도구와 서비스의 구현 범위, 검증 결과와 한계
            </span>
          </span>
          <span className="text-[var(--color-muted)]">프로젝트 보기 →</span>
        </Link>
      </section>

      {/* What I Do */}
      <section className="mb-16 sm:mb-20">
        <h2 className="mb-4 sm:mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          What I Do
        </h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">서비스 UI 개발과 운영</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              복잡한 사용자 화면의 상태와 예외를 구현하고 운영 중인 서비스에 안정적으로 반영합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">레거시 현대화</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              오래된 HTML과 SCSS 구조를 단계적으로 전환하고 컴포넌트와 스타일의 변경 맥락을 정리합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">협업과 검증</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              기획, 디자인, 백엔드 담당자와 변경 범위를 맞추고, 문서와 화면 확인 기준을 남깁니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
