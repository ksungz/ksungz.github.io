export interface QuickFeedSummary {
  summary: string;
  keyPoints: string[];
  whyItMatters: string;
  practicalTakeaway: string;
  caveats: string[];
}

interface StoredQuickFeedSummary {
  version: 1 | 2;
  summary: string;
  key_points: string[];
  why_it_matters: string;
  practical_takeaway?: string;
  caveats?: string[];
}

export function parseQuickFeedSummary(
  value: string | null | undefined
): QuickFeedSummary {
  const fallback = {
    summary: value || "",
    keyPoints: [],
    whyItMatters: "",
    practicalTakeaway: "",
    caveats: [],
  };
  if (!value?.trim().startsWith("{")) return fallback;

  try {
    const parsed = JSON.parse(value) as Partial<StoredQuickFeedSummary>;
    if (
      (parsed.version !== 1 && parsed.version !== 2) ||
      typeof parsed.summary !== "string"
    ) {
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
      practicalTakeaway:
        typeof parsed.practical_takeaway === "string"
          ? parsed.practical_takeaway.trim()
          : "",
      caveats: Array.isArray(parsed.caveats)
        ? parsed.caveats
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 4)
        : [],
    };
  } catch {
    return fallback;
  }
}
