import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing",
  description: "AX·AI Product 작업 기록 — 문제 정의부터 운영 개선까지 이어지는 글 모음",
};

export default function WritingPage() {
  const posts = getAllPosts().filter((p) => p.category !== "GeekNews 픽");

  const featuredSlugs = new Set([
    "ax-doctor-preflight",
    "obsidian-rag",
    "ai-agent-harness-audit",
    "pr-review-agent",
    "ai-workspace",
    "ai-news-agent",
  ]);

  const featuredOrder = [
    "ax-doctor-preflight",
    "obsidian-rag",
    "ai-agent-harness-audit",
    "pr-review-agent",
    "ai-workspace",
    "ai-news-agent",
  ];

  const featuredPosts = featuredOrder
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is (typeof posts)[number] => post !== undefined);
  const otherPosts = posts.filter((post) => !featuredSlugs.has(post.slug));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">Writing</p>
        <h1 className="text-2xl font-bold tracking-tight">Writing</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
          AX/AI Product 적용 근거를 빠르게 확인할 수 있도록
          핵심 글을 먼저 배치하고, 나머지 글은 한눈에 확인하는 방식으로 정리했습니다.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          핵심 글
        </h2>
        <div className="grid gap-3">
          {featuredPosts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[var(--color-border)] p-8 text-center">
              <p className="text-sm text-[var(--color-muted)]">아직 작성된 대표 글이 없습니다.</p>
            </div>
          ) : (
            featuredPosts.map((post) => (
              <Card
                key={post.slug}
                href={`/engineering/${post.slug}`}
                title={post.title}
                description={post.description}
                meta={post.date}
                tags={post.tags}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          전체 글
        </h2>
        {otherPosts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] p-10 text-center">
            <p className="text-sm text-[var(--color-muted)]">아직 작성된 글이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {otherPosts.map((post) => (
              <Card
                key={post.slug}
                href={`/engineering/${post.slug}`}
                title={post.title}
                description={post.description}
                meta={post.date}
                tags={post.tags}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
