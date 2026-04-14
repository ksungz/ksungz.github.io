interface DocDiagramProps {
  title: string;
  children: React.ReactNode;
}

export default function DocDiagram({ title, children }: DocDiagramProps) {
  return (
    <div className="my-8 rounded-lg border border-[var(--color-border)] p-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
        {title}
      </p>
      <div className="overflow-x-auto [&>svg]:mx-auto [&>svg]:block [&>svg]:max-w-full">
        {children}
      </div>
    </div>
  );
}
