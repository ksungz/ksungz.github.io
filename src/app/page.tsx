import Link from "next/link";
import Timeline from "@/components/ui/Timeline";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/mdx";

const careerSummary = [
  {
    period: "2020.12 ~ 현재",
    company: "11번가",
    role: "UI 개발자 · UI개발팀",
    description: "모바일웹 PDP 전담 개발, Dart Sass 마이그레이션(2,384개 파일), React 기반 이관, AI 기반 개발 환경 구축",
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

const PRIMARY_SKILLS = new Set(["HTML5", "SCSS/Sass", "React", "TypeScript", "Claude Code", "Cursor AI"]);

const skills = [
  { label: "마크업/스타일링", items: ["HTML5", "SCSS/Sass", "CSS Modules", "BEM", "반응형 웹", "웹 접근성"] },
  { label: "프레임워크", items: ["React", "TypeScript", "Next.js", "Storybook"] },
  { label: "빌드/배포", items: ["Vite", "Gulp", "Docker", "Bitbucket Pipelines", "Vercel"] },
  { label: "AI 에이전트", items: ["Claude Code", "Cursor AI", "Codex", "OpenClaw", "Ollama"] },
];

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Hero */}
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Frontend 개발 · AI Transformation · 팀 리더십</p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">김성재</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          커머스, 게임, 플랫폼 서비스에서 다년간 UI/Frontend 개발을 해왔습니다.
          HTML/CSS 기반의 정교한 마크업부터 React 컴포넌트 설계, 대규모 레거시 개선까지 폭넓은 프론트엔드 실무를 다뤄왔으며,
          현재는 AI 에이전트를 개발 워크플로우 중심에 두고 팀 생산성과 개발 문화를 함께 만들어가고 있습니다.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/career"
            className="inline-flex items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)]"
          >
            경력 보기
          </Link>
          <Link
            href="/tech"
            className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)]"
          >
            Tech 블로그
          </Link>
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

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Recent Posts</h2>
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
