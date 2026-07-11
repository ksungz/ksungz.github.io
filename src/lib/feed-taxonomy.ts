import taxonomy from "@/data/feed-taxonomy.json";

const CATEGORY_PREFIX = "category:";
const VISIBILITY_PREFIX = "visibility:";
const QUALITY_PREFIX = "quality:";
const CONTENT_PREFIX = "content:";
const EDITORIAL_PREFIX = "editorial:";
const VERIFICATION_PREFIX = "verification:";

export type FeedVisibility = "public" | "review";
export type FeedContentQuality = "complete" | "incomplete";
export type FeedContentKind = "jsonld" | "transcript" | "rss" | "missing";
export type FeedEditorialState = "ready" | "pending";
export type FeedVerificationState = "passed" | "pending" | "failed";

export const FEED_CATEGORIES = taxonomy.categories;
export const FEED_TOPICS = taxonomy.topics;
export const FEED_QUALITY = taxonomy.quality;
export const FEED_SOURCE_POLICIES = taxonomy.sourcePolicies;
export const FEED_REVIEW_TITLE_PATTERNS = taxonomy.reviewTitlePatterns;

export function categoryTag(category: string): string {
  return `${CATEGORY_PREFIX}${category}`;
}

export function visibilityTag(visibility: FeedVisibility): string {
  return `${VISIBILITY_PREFIX}${visibility}`;
}

export function qualityTag(quality: FeedContentQuality): string {
  return `${QUALITY_PREFIX}${quality}`;
}

export function contentTag(contentKind: FeedContentKind): string {
  return `${CONTENT_PREFIX}${contentKind}`;
}

export function editorialTag(state: FeedEditorialState): string {
  return `${EDITORIAL_PREFIX}${state}`;
}

export function verificationTag(state: FeedVerificationState): string {
  return `${VERIFICATION_PREFIX}${state}`;
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

export function getContentQuality(
  tags: string[] | null | undefined
): FeedContentQuality | null {
  const tag = (tags || []).find((item) => item.startsWith(QUALITY_PREFIX));
  const value = tag?.slice(QUALITY_PREFIX.length);
  return value === "complete" || value === "incomplete" ? value : null;
}

export function getContentKind(
  tags: string[] | null | undefined
): FeedContentKind | null {
  const value = (tags || [])
    .find((item) => item.startsWith(CONTENT_PREFIX))
    ?.slice(CONTENT_PREFIX.length);
  return value === "jsonld" ||
    value === "transcript" ||
    value === "rss" ||
    value === "missing"
    ? value
    : null;
}

export function getEditorialState(
  tags: string[] | null | undefined
): FeedEditorialState | null {
  const value = (tags || [])
    .find((item) => item.startsWith(EDITORIAL_PREFIX))
    ?.slice(EDITORIAL_PREFIX.length);
  return value === "ready" || value === "pending" ? value : null;
}

export function getVerificationState(
  tags: string[] | null | undefined
): FeedVerificationState | null {
  const value = (tags || [])
    .find((item) => item.startsWith(VERIFICATION_PREFIX))
    ?.slice(VERIFICATION_PREFIX.length);
  return value === "passed" || value === "pending" || value === "failed"
    ? value
    : null;
}

export function getDisplayTags(tags: string[] | null | undefined): string[] {
  return (tags || []).filter(
    (tag) =>
      !tag.startsWith(CATEGORY_PREFIX) &&
      !tag.startsWith(VISIBILITY_PREFIX) &&
      !tag.startsWith(QUALITY_PREFIX) &&
      !tag.startsWith(CONTENT_PREFIX) &&
      !tag.startsWith(EDITORIAL_PREFIX) &&
      !tag.startsWith(VERIFICATION_PREFIX)
  );
}

export function mergeSystemTags(
  currentTags: string[] | null | undefined,
  displayTags: string[]
): string[] {
  const systemTags = (currentTags || []).filter(
    (tag) =>
      tag.startsWith(CATEGORY_PREFIX) ||
      tag.startsWith(VISIBILITY_PREFIX) ||
      tag.startsWith(QUALITY_PREFIX) ||
      tag.startsWith(CONTENT_PREFIX) ||
      tag.startsWith(EDITORIAL_PREFIX) ||
      tag.startsWith(VERIFICATION_PREFIX)
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
