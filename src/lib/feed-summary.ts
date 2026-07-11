export interface QuickFeedSummary {
  summary: string;
  keyPoints: string[];
  whyItMatters: string;
}

interface StoredQuickFeedSummary {
  version: 1;
  summary: string;
  key_points: string[];
  why_it_matters: string;
}

export function parseQuickFeedSummary(
  value: string | null | undefined
): QuickFeedSummary {
  const fallback = {
    summary: value || "",
    keyPoints: [],
    whyItMatters: "",
  };
  if (!value?.trim().startsWith("{")) return fallback;

  try {
    const parsed = JSON.parse(value) as Partial<StoredQuickFeedSummary>;
    if (parsed.version !== 1 || typeof parsed.summary !== "string") {
      return fallback;
    }
    return {
      summary: parsed.summary.trim(),
      keyPoints: Array.isArray(parsed.key_points)
        ? parsed.key_points
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 6)
        : [],
      whyItMatters:
        typeof parsed.why_it_matters === "string"
          ? parsed.why_it_matters.trim()
          : "",
    };
  } catch {
    return fallback;
  }
}
