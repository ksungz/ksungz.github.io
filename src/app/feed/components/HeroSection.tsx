"use client";

interface HeroSectionProps {
  sourceCount: number;
  articleCount: number;
  categoryCount: number;
}

export function HeroSection({
  sourceCount,
  articleCount,
  categoryCount,
}: HeroSectionProps) {
  const stats = [
    { label: "소스", value: sourceCount, unit: "개" },
    { label: "기사", value: articleCount, unit: "건" },
    { label: "카테고리", value: categoryCount, unit: "개" },
  ];

  return (
    <div
      className="px-6 py-8 mb-4"
      style={{
        background: "#0a0a0a",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      <h1
        className="text-2xl font-bold mb-1"
        style={{ color: "#e4e4e4" }}
      >
        📖 Info Feed
      </h1>
      <p
        className="text-sm mb-5"
        style={{ color: "#666" }}
      >
        개발 · 비즈니스 · 소셜 미디어의 주요 흐름을 한곳에서
      </p>
      <div className="flex gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <div
              className="text-2xl font-bold"
              style={{ color: "#e4e4e4" }}
            >
              {s.value.toLocaleString()}
              <span className="text-sm font-normal ml-0.5" style={{ color: "#666" }}>
                {s.unit}
              </span>
            </div>
            <div className="text-xs" style={{ color: "#666" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}