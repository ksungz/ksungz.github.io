"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Code2,
  FileText,
  Link2,
  Newspaper,
  Video,
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
  dev: { label: "개발", icon: Code2 },
  business: { label: "비즈니스", icon: BriefcaseBusiness },
  youtube: { label: "YouTube", icon: Video },
  social: { label: "소셜", icon: Link2 },
};

const CATEGORY_ORDER = ["dev", "business", "youtube", "social"];

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
