import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life",
  description: "일상 기록",
};

export default function LifePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">일상</p>
        <h1 className="text-2xl font-bold tracking-tight">Life</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">곧 채워질 공간입니다.</p>
      </div>
      <div className="rounded-lg border border-dashed border-[var(--color-border)] p-10 text-center">
        <p className="text-sm text-[var(--color-muted)]">준비 중입니다.</p>
      </div>
    </div>
  );
}
