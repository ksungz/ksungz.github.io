import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Engineering 블로그 — React, CSS, AI Engineering, Automation, Context Engineering",
};

const categories = [
  { label: "Engineering", keywords: ["React", "CSS", "Storybook", "Lighthouse", "Performance", "Sass", "마크업", "접근성"] },
  { label: "AI Engineering", keywords: ["AI", "Prompt", "Context", "Memory", "Tool Calling", "Agent", "RAG", "Ollama", "Hermes"] },
  { label: "Automation", keywords: ["Automation", "OpenClaw", "Cursor", "Codex", "Claude", "Telegram", "파이프라인"] },
];

export default function Engineering() {
  const allPosts = getAllPosts().sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Engineering</p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">엔지니어링 노트</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          기술 구현, AI 도입, 자동화 과정에서 배운 것을 기록합니다.
        </p>
      </section>

      {categories.map(({ label, keywords }) => {
        const posts = allPosts.filter((p) => {
          const tagMatch = p.tags?.some((t) => keywords.some((k) => t.toLowerCase().includes(k.toLowerCase())));
          const titleMatch = keywords.some((k) => p.title.toLowerCase().includes(k.toLowerCase()));
          const descMatch = p.description?.toLowerCase().includes(label.toLowerCase());
          return tagMatch || titleMatch || descMatch;
        });

        if (posts.length === 0) return null;

        return (
          <section key={label} className="mb-16">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              {label}
            </h2>
            <div className="grid gap-3">
              {posts.map((post) => (
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
          </section>
        );
      })}

      {/* 전체 글 */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
            All Posts
          </h2>
        </div>
        <div className="grid gap-3">
          {allPosts.map((post) => (
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
      </section>
    </div>
  );
}