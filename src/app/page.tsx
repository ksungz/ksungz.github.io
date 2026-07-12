import Link from "next/link";
import Timeline from "@/components/ui/Timeline";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/mdx";

const careerSummary = [
  {
    period: "2020.12 ~ 현재",
    company: "11번가",
    role: "UI/Frontend 개발자 · UI개발팀",
    description: "모바일웹 PDP 및 핵심 서비스 UI 운영, Dart Sass 전환, CSS 내재화, React 환경 개선",
  },
  {
    period: "2019.10 ~ 2020.12",
    company: "스마일게이트 알피지",
    role: "UI 개발자 · 웹팀",
    description: "로스트아크 이벤트 페이지 구축·운영, 공식사이트 콘텐츠 업데이트, 매주 정기배포",
  },
  {
    period: "2012.07 ~ 2019.06",
    company: "하이브랩",
    role: "UI 개발자 → 팀장 · FE개발팀",
    description: "네이버·블리자드·PUBG 등 대형 클라이언트 UI 프로젝트. i-award 3개 부문 수상. 팀장 약 3년.",
  },
];

const highlights = [
  {
    title: "제품 화면 운영",
    description: "모바일웹 핵심 화면을 운영하며 가격, 옵션, 리뷰, 배송처럼 여러 도메인의 영향 범위와 검증 기준을 맞춰 개발합니다.",
  },
  {
    title: "기존 UI 구조 개선",
    description: "Dart Sass 전환, CSS 내재화, React 환경 개선으로 화면 구조와 스타일 관리 흐름을 단계적으로 정리했습니다.",
  },
  {
    title: "UI 품질과 협업 기준",
    description: "Storybook, 기술 문서, 접근성·스타일 리뷰 기준을 정리해 컴포넌트 단위 확인과 협업 비용을 줄입니다.",
  },
];

const PRIMARY_SKILLS = new Set(["React", "TypeScript", "SCSS/Sass", "Storybook", "웹 접근성", "반응형 UI"]);

const skills = [
  { label: "UI/Frontend", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "SCSS/Sass", "CSS Modules", "Storybook"] },
  { label: "UI 품질/운영", items: ["웹 표준", "웹 접근성", "반응형 UI", "모바일웹", "BEM", "Lottie"] },
  { label: "협업/운영 도구", items: ["Git", "Bitbucket", "Jira", "Confluence", "Figma", "Bitbucket Pipelines", "Vercel"] },
  { label: "AI 보조 흐름", items: ["Cursor", "Claude", "Codex", "PR Review Agent"] },
];

export default async function Home() {
  const featuredSlugs = ["pdp-ui", "react-pdp", "dart-sass"];
  const posts = getAllPosts()
    .filter((post) => featuredSlugs.includes(post.slug))
    .sort((a, b) => featuredSlugs.indexOf(a.slug) - featuredSlugs.indexOf(b.slug));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Hero */}
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">서비스 UI 개발 · 운영 개선 · UI 품질 관리</p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">김성재</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          커머스, 게임, 플랫폼 서비스에서 UI 개발과 운영을 해왔습니다.
          웹 표준, 접근성, 마크업 구조화, SCSS 설계, 반응형 UI 구현을 바탕으로 운영 중인 서비스 화면의 구조와 유지보수성을 개선해왔습니다.
          최근에는 HTML/SCSS 중심 산출물을 React 기반 환경으로 옮기고, Storybook·문서화·리뷰 기준을 통해 컴포넌트 단위 검증과 협업 흐름을 정리하고 있습니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/career"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)]"
          >
            경력 보기
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            포트폴리오
          </Link>
          <Link
            href="/tech"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            Tech 블로그
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Focus</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {highlights.map(({ title, description }) => (
            <div key={title} className="rounded-lg border border-[var(--color-border)] p-4">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Skills</h2>
        <div className="grid gap-3">
          {skills.map(({ label, items }) => (
            <div key={label} className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <span className="w-32 shrink-0 text-xs font-medium text-[var(--color-foreground)]">{label}</span>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className={
                      PRIMARY_SKILLS.has(item)
                        ? "rounded-full border border-[#2563eb] bg-[#eff6ff] px-2.5 py-0.5 text-xs text-[#2563eb] font-medium"
                        : "rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Timeline */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Career</h2>
          <Link href="/career" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
            전체 보기 →
          </Link>
        </div>
        <Timeline items={careerSummary} />
      </section>

      {/* Featured Work */}
      {posts.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Featured Work</h2>
            <Link href="/tech" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-3">
            {posts.map((post) => (
              <Card
                key={post.slug}
                href={`/tech/${post.slug}`}
                title={post.title}
                description={post.description}
                meta={post.date}
                tags={post.tags}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
