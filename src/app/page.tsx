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
    name: "상품상세 스타일의 React 저장소 이관",
    tagline: "컴포넌트와 SCSS를 어떤 단위로 연결할지 결정",
    description: "AI 도구가 코드와 스타일을 함께 참고하도록 운영 SCSS를 옮겼습니다. 컴포넌트와 SCSS의 분리 단위가 달라 화면 블록별로 묶었고, 신규 블록 약 18개의 스타일 작업을 실제 상품상세 개선에 반영했습니다.",
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
          커머스, 게임, 플랫폼 서비스에서 UI를 개발하고 운영해 왔습니다.
          11번가에서는 모바일웹 상품상세와 앱 WebView UI를 담당했고,
          하이브랩에서는 약 3년간 팀장으로 고객사 요구사항, 공수, 일정과 품질을 관리했습니다.
          오래된 화면을 바꿀 때는 기존 구조와 영향을 받는 화면을 살피고,
          함께 일하는 담당자들과 작업 범위를 맞춥니다.
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
            <h3 className="text-sm font-semibold">기존 구조 개선</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              컴포넌트와 스타일을 관리할 단위를 정하고, 옮긴 뒤에도 기존 화면이 유지되는지 확인합니다.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="text-sm font-semibold">업무 조율과 팀 리딩</h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              고객사와 요구사항을 조율하고 공수 산정, 업무 배분, 일정과 품질 관리를 맡았습니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
