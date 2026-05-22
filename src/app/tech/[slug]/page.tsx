import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";

import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function TechPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const isDigest = post.category === "GeekNews 픽";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={isDigest ? "/tech/digest" : "/tech"}
        className="mb-8 inline-flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
      >
        ← {isDigest ? "Digest" : "Tech"}
      </Link>

      {isDigest && (
        <div className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] px-4 py-3">
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            매일 GeekNews의 최신 내용을 스크랩하여 개인 프롬프트를 활용해 분석한 포스팅입니다.
            AI가 작성한 초안을 검토 후 게시합니다.
          </p>
        </div>
      )}

      <header className="mb-10">
        <time className="font-mono text-xs text-[var(--color-muted)]">{post.date}</time>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{post.title}</h1>
        {post.description && (
          <p className="mt-2 text-sm text-[var(--color-muted)]">{post.description}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="prose-sm max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </div>
  );
}
