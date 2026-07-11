export interface QuickFeedSummary {
  summary: string;
  context: string;
  explanation: string[];
  keyPoints: string[];
  whyItMatters: string;
  practicalTakeaway: string;
  caveats: string[];
  evidenceScore: number | null;
  editorialScore: number | null;
  verificationIssues: string[];
  verificationAttempts: number;
}

interface StoredQuickFeedSummary {
  version: 1 | 2 | 3;
  summary: string;
  context?: string;
  explanation?: string[];
  key_points: string[];
  why_it_matters: string;
  practical_takeaway?: string;
  caveats?: string[];
  evidence_score?: number;
  editorial_score?: number;
  verification_issues?: string[];
  verification_attempts?: number;
}

export function parseQuickFeedSummary(
  value: string | null | undefined
): QuickFeedSummary {
  const fallback = {
    summary: value || "",
    context: "",
    explanation: [],
    keyPoints: [],
    whyItMatters: "",
    practicalTakeaway: "",
    caveats: [],
    evidenceScore: null,
    editorialScore: null,
    verificationIssues: [],
    verificationAttempts: 0,
  };
  if (!value?.trim().startsWith("{")) return fallback;

  try {
    const parsed = JSON.parse(value) as Partial<StoredQuickFeedSummary>;
    if (
      (parsed.version !== 1 && parsed.version !== 2 && parsed.version !== 3) ||
      typeof parsed.summary !== "string"
    ) {
      return fallback;
    }
    return {
      summary: parsed.summary.trim(),
      context:
        typeof parsed.context === "string" ? parsed.context.trim() : "",
      explanation: Array.isArray(parsed.explanation)
        ? parsed.explanation
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 4)
        : [],
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
      evidenceScore:
        typeof parsed.evidence_score === "number" ? parsed.evidence_score : null,
      editorialScore:
        typeof parsed.editorial_score === "number" ? parsed.editorial_score : null,
      verificationIssues: Array.isArray(parsed.verification_issues)
        ? parsed.verification_issues
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 8)
        : [],
      verificationAttempts:
        typeof parsed.verification_attempts === "number"
          ? Math.max(0, Math.floor(parsed.verification_attempts))
          : 0,
    };
  } catch {
    return fallback;
  }
}
