"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  FileText,
  Newspaper,
  PanelsTopLeft,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { CategoryCount } from "@/lib/feed-data";
import { getCategoryLabel } from "@/lib/feed-categories";

interface CategorySidebarProps {
  activeCat: string;
  categories?: CategoryCount[];
  totalCount?: number;
  onSelect?: (cat: string) => void;
  basePath?: string;
}

interface CategoryMeta {
  label: string;
  icon: LucideIcon;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  all: { label: "전체", icon: Newspaper },
  ai: { label: "AI·LLM", icon: BrainCircuit },
  devtools: { label: "개발 도구", icon: Wrench },
  frontend: { label: "프론트엔드", icon: Code2 },
  data: { label: "데이터·인프라", icon: Database },
  business: { label: "비즈니스", icon: BriefcaseBusiness },
  security: { label: "보안", icon: ShieldCheck },
  product: { label: "제품·디자인", icon: PanelsTopLeft },
  other: { label: "기타", icon: FileText },
};

const CATEGORY_ORDER = [
  "ai",
  "devtools",
  "frontend",
  "data",
  "business",
  "security",
  "product",
  "other",
];

export function CategorySidebar({
  activeCat,
  categories = [],
  totalCount,
  onSelect,
  basePath = "/feed",
}: CategorySidebarProps) {
  const categoryMap = new Map(categories.map((item) => [item.category, item.count]));
  const orderedCategories = Array.from(categoryMap.keys()).sort((left, right) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left);
    const rightIndex = CATEGORY_ORDER.indexOf(right);
    if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right);
    if (leftIndex === -1) return 1;
    if (rightIndex === -1) return -1;
    return leftIndex - rightIndex;
  });
  const items = ["all", ...orderedCategories];
  const total =
    totalCount ?? categories.reduce((sum, item) => sum + item.count, 0);

  return (
    <nav aria-label="피드 카테고리">
      {items.map((category) => {
        const meta = CATEGORY_META[category] || {
          label: getCategoryLabel(category),
          icon: FileText,
        };
        const Icon = meta.icon;
        const isActive = activeCat === category;
        const count = category === "all" ? total : categoryMap.get(category) || 0;
        const content = (
          <>
            <Icon className="cat-icon" aria-hidden="true" size={16} />
            <span>{meta.label}</span>
            <span className="cat-count">{count.toLocaleString()}</span>
          </>
        );

        return onSelect ? (
          <button
            type="button"
            key={category}
            onClick={() => onSelect(category)}
            className={`cat-link ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {content}
          </button>
        ) : (
          <Link
            key={category}
            href={category === "all" ? basePath : `${basePath}?category=${category}`}
            className={`cat-link ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
