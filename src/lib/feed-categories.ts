const FEED_CATEGORY_LABELS: Record<string, string> = {
  all: "전체",
  dev: "개발",
  business: "비즈니스",
  youtube: "YouTube",
  social: "소셜",
};

export function getCategoryLabel(category: string): string {
  return FEED_CATEGORY_LABELS[category] || category;
}
