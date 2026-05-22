import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tech",
  description: "UI 개발, AI 활용, 프론트엔드 관련 기술 블로그",
};

export default function TechPage() {
  const posts = getAllPosts().filter((p) => p.category !== "GeekNews 픽");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">블로그</p>
        <h1 className="text-2xl font-bold tracking-tight">Tech</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          UI 개발, AI 활용, 프론트엔드 이슈 해결 등을 기록합니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] p-10 text-center">
          <p className="text-sm text-[var(--color-muted)]">아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
