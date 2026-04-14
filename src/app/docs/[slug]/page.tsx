import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import { mdxComponents } from "@/components/mdx/MDXComponents";


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.description };
}

const badgeStyles: Record<string, string> = {
  perf: "bg-[#f5f5f5] text-[#0a0a0a] border border-[#0a0a0a]",
  retro: "bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]",
  ai: "bg-[#0a0a0a] text-white",
  infra: "bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]",
  proposal: "bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]",
};

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={doc.backHref}
        className="mb-8 inline-flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
      >
        ← {doc.backLabel}
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {doc.badge && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[doc.badge] ?? badgeStyles.retro}`}>
              {doc.category}
            </span>
          )}
          {doc.date && (
            <span className="font-mono text-xs text-[var(--color-muted)]">{doc.date}</span>
          )}
          {doc.context && (
            <span className="text-xs text-[var(--color-muted)]">· {doc.context}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{doc.title}</h1>
        {doc.description && (
          <p className="mt-2 text-sm text-[var(--color-muted)]">{doc.description}</p>
        )}
      </header>

      <article>
        <MDXRemote source={doc.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </div>
  );
}
