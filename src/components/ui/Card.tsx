import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  href?: string;
  title: string;
  description?: string;
  meta?: string;
  tags?: string[];
  className?: string;
}

export default function Card({ href, title, description, meta, tags, className }: CardProps) {
  const content = (
    <div className={cn("group rounded-lg border border-[var(--color-border)] p-5 transition-colors hover:border-[var(--color-foreground)]", className)}>
      {meta && <p className="font-mono text-xs text-[var(--color-muted)]">{meta}</p>}
      <h3 className="mt-1 text-sm font-semibold leading-snug">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-[var(--color-muted)] line-clamp-2">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
