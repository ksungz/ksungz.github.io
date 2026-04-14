import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import DocDiagram from "./DocDiagram";

export const mdxComponents: MDXComponents = {
  // 커스텀 컴포넌트
  DocDiagram,
  h1: ({ className, ...props }) => (
    <h1 className={cn("mt-8 mb-4 text-2xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-8 mb-3 text-xl font-semibold", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 text-base font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mb-4 text-sm leading-relaxed text-[var(--color-foreground)]", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a className={cn("underline underline-offset-4 hover:text-[var(--color-muted)]", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("mb-4 ml-4 list-disc text-sm [&>li]:mt-1", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("mb-4 ml-4 list-decimal text-sm [&>li]:mt-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn("mb-4 border-l-2 border-[var(--color-foreground)] pl-4 text-sm italic text-[var(--color-muted)]", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code className={cn("rounded bg-[var(--color-accent)] px-1.5 py-0.5 font-mono text-xs", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn("mb-4 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] p-4 font-mono text-xs", className)} {...props} />
  ),
  hr: () => <hr className="my-8 border-[var(--color-border)]" />,
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold", className)} {...props} />
  ),
  // 테이블
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn("w-full border-collapse text-xs", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn("border-b border-[var(--color-border)]", className)} {...props} />
  ),
  tbody: ({ className, ...props }) => (
    <tbody className={cn("[&>tr:last-child]:border-0", className)} {...props} />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn("border-b border-[var(--color-border)]", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th className={cn("py-2 pr-4 text-left font-semibold text-[var(--color-foreground)]", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("py-2.5 pr-4 text-[var(--color-muted)] leading-relaxed", className)} {...props} />
  ),
};
