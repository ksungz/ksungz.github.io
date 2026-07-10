"use client";

interface CategorySidebarProps {
  activeCat: string;
  onSelect?: (cat: string) => void;
}

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  all: { label: "전체", icon: "📰" },
  dev: { label: "개발", icon: "💻" },
  business: { label: "비즈니스", icon: "📊" },
  youtube: { label: "YouTube", icon: "🎬" },
  social: { label: "소셜", icon: "🔗" },
};

const CAT_ORDER = ["all", "dev", "business", "youtube", "social"];

export function CategorySidebar({ activeCat, onSelect }: CategorySidebarProps) {
  return (
    <nav>
      {CAT_ORDER.map((cat) => {
        const meta = CATEGORY_META[cat] || { label: cat, icon: "📄" };
        const isActive = activeCat === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect?.(cat)}
            className={`cat-link ${isActive ? "active" : ""}`}
            disabled={!onSelect}
            style={!onSelect ? { cursor: "default" } : undefined}
          >
            <span className="cat-icon">{meta.icon}</span>
            <span>{meta.label}</span>
          </button>
        );
      })}
    </nav>
  );
}