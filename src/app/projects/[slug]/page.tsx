import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { mdxComponents } from "@/components/mdx/MDXComponents";

const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } } as const;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/career"
        className="mb-8 inline-flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
      >
        ← 경력기술서
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.period && (
            <span className="font-mono text-xs text-[var(--color-muted)]">{project.period}</span>
          )}
          {project.company && (
            <span className="text-xs text-[var(--color-muted)]">· {project.company}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
        {project.role && (
          <p className="mt-1 text-sm text-[var(--color-muted)]">{project.role}</p>
        )}
        {project.description && (
          <p className="mt-2 text-sm text-[var(--color-muted)]">{project.description}</p>
        )}
        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
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

      <article>
        <MDXRemote source={project.content} components={mdxComponents} {...mdxOptions} />
      </article>
    </div>
  );
}
