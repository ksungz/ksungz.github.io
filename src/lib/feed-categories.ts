import { FEED_CATEGORIES } from "@/lib/feed-taxonomy";

const FEED_CATEGORY_LABELS = new Map<string, string>([
  ["all", "전체"],
  ...FEED_CATEGORIES.map(
    (category): [string, string] => [category.id, category.label]
  ),
]);

export function getCategoryLabel(category: string): string {
  return FEED_CATEGORY_LABELS.get(category) || category;
}
