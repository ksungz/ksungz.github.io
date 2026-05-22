import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "GeekNews Digest",
  description: "GeekNews 최신 글을 스크랩하여 개인 프롬프트로 분석한 포스팅 모음",
};

export default function DigestPage() {
  const posts = getAllPosts().filter((p) => p.category === "GeekNews 픽");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">스크랩 & 분석</p>
        <h1 className="text-2xl font-bold tracking-tight">GeekNews Digest</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          AI/개발 관련 최신 글을 기록합니다.
        </p>
      </div>

      {/* 안내 배너 */}
      <div className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] px-4 py-3">
        <p className="text-xs text-[var(--color-muted)] leading-relaxed">
          매일 GeekNews의 최신 내용을 스크랩하여 개인 프롬프트를 활용해 분석한 포스팅입니다.
          AI가 작성한 초안을 검토 후 게시하며, 원문 링크는 각 포스팅 내에서 확인할 수 있습니다.
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
