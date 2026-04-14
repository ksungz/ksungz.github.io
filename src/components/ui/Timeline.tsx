import { cn } from "@/lib/utils";

interface TimelineItem {
  period: string;
  company: string;
  role: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("relative border-l border-[var(--color-border)]", className)}>
      {items.map((item, i) => (
        <li key={i} className="mb-8 ml-6 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border border-[var(--color-border)] bg-white" />
          <time className="font-mono text-xs text-[var(--color-muted)]">{item.period}</time>
          <h3 className="mt-1 text-sm font-semibold">{item.company}</h3>
          <p className="text-xs text-[var(--color-muted)]">{item.role}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
