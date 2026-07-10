"use client";

interface CategoryItem {
  category: string;
  count: number;
}

interface CategorySidebarProps {
  categories: CategoryItem[];
  activeCat: string;
  onSelect: (cat: string) => void;
}

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  all: { label: "전체", icon: "📰" },
  dev: { label: "dev", icon: "💻" },
  business: { label: "business", icon: "📊" },
  youtube: { label: "youtube", icon: "🎬" },
  social: { label: "social", icon: "🔗" },
};

const CAT_ORDER = ["all", "dev", "business", "youtube", "social"];

export function CategorySidebar({
  categories,
  activeCat,
  onSelect,
}: CategorySidebarProps) {
  const countMap = new Map<string, number>();
  for (const c of categories) {
    countMap.set(c.category, c.count);
  }
  const totalCount = categories.reduce((sum, c) => sum + c.count, 0);
  countMap.set("all", totalCount);

  return (
    <nav
      className="flex flex-col gap-1"
      style={{ background: "#0a0a0a", borderRight: "1px solid #1f1f1f" }}
    >
      {CAT_ORDER.map((cat) => {
        const meta = CATEGORY_META[cat] || { label: cat, icon: "📄" };
        const count = countMap.get(cat) ?? 0;
        const isActive = activeCat === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors"
            style={{
              background: isActive ? "#1a1a1a" : "transparent",
              borderLeft: isActive ? "3px solid #fff" : "3px solid transparent",
              color: isActive ? "#e4e4e4" : "#999",
            }}
          >
            <span className="text-base">{meta.icon}</span>
            <span className="flex-1 font-medium">{meta.label}</span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "#1f1f1f",
                color: "#666",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}