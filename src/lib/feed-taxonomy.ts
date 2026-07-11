import taxonomy from "@/data/feed-taxonomy.json";

const CATEGORY_PREFIX = "category:";
const VISIBILITY_PREFIX = "visibility:";

export type FeedVisibility = "public" | "review";

export const FEED_CATEGORIES = taxonomy.categories;
export const FEED_TOPICS = taxonomy.topics;
export const FEED_QUALITY = taxonomy.quality;

export function categoryTag(category: string): string {
  return `${CATEGORY_PREFIX}${category}`;
}

export function visibilityTag(visibility: FeedVisibility): string {
  return `${VISIBILITY_PREFIX}${visibility}`;
}

export function getPrimaryCategory(
  tags: string[] | null | undefined,
  fallback: string = "other"
): string {
  const tag = (tags || []).find((item) => item.startsWith(CATEGORY_PREFIX));
  return tag?.slice(CATEGORY_PREFIX.length) || fallback;
}

export function getFeedVisibility(
  tags: string[] | null | undefined
): FeedVisibility | null {
  const tag = (tags || []).find((item) => item.startsWith(VISIBILITY_PREFIX));
  const value = tag?.slice(VISIBILITY_PREFIX.length);
  return value === "public" || value === "review" ? value : null;
}

export function getDisplayTags(tags: string[] | null | undefined): string[] {
  return (tags || []).filter(
    (tag) =>
      !tag.startsWith(CATEGORY_PREFIX) && !tag.startsWith(VISIBILITY_PREFIX)
  );
}

export function mergeSystemTags(
  currentTags: string[] | null | undefined,
  displayTags: string[]
): string[] {
  const systemTags = (currentTags || []).filter(
    (tag) => tag.startsWith(CATEGORY_PREFIX) || tag.startsWith(VISIBILITY_PREFIX)
  );
  return [...new Set([...systemTags, ...displayTags])];
}

export function setFeedVisibility(
  tags: string[] | null | undefined,
  visibility: FeedVisibility
): string[] {
  return [
    ...(tags || []).filter((tag) => !tag.startsWith(VISIBILITY_PREFIX)),
    visibilityTag(visibility),
  ];
}
