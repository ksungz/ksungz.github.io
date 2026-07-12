import assert from "node:assert/strict";
import test from "node:test";
import {
  assessEditorialGrounding,
  buildTags,
  fallbackClassification,
  extractGeekNewsArticle,
  extractGeekNewsMarkdown,
  isVerificationRetryReady,
  isAutoPublishEvidenceEligible,
  parseClassification,
  parseEditorialVerification,
  sanitizeEditorialDraft,
  serializeQuickFeedSummary,
} from "./lib.mjs";

const article = {
  title: "근거 기반 피드 테스트",
  source_name: "GeekNews",
  content: [
    "이 도구는 반복 작업을 자동화하면서 처리 과정을 기록한다.",
    "사용자는 기록된 결과를 검토하고 필요한 부분만 다시 실행할 수 있다.",
    "프로젝트는 로컬 환경에서 실행되며 결과를 파일로 저장한다.",
  ].join(" "),
};

function groundedDraft() {
  return {
    ...fallbackClassification(article),
    summary: "반복 작업을 자동화하고 처리 과정을 기록하는 도구다.",
    context: "반복 작업의 결과를 다시 확인하기 어려운 문제를 다룬다.",
    explanation: [
      "작업을 실행하는 것뿐 아니라 처리 과정을 함께 기록한다.",
      "기록된 결과를 검토한 뒤 필요한 부분만 다시 실행할 수 있다.",
    ],
    key_points: [
      "반복 작업을 자동화한다.",
      "처리 과정을 기록한다.",
      "결과를 파일로 저장한다.",
    ],
    why_it_matters: "자동화 결과를 검토하고 다시 실행할 수 있다는 점이 핵심이다.",
    practical_takeaway: "로컬 실행과 결과 저장 방식이 필요한 작업에 적용 범위를 확인할 수 있다.",
    caveats: ["원문에서는 처리 성능을 확인할 수 없다."],
    claims: [
      {
        id: "C1",
        claim: "반복 작업을 자동화한다.",
        evidence: "이 도구는 반복 작업을 자동화하면서 처리 과정을 기록한다.",
      },
      {
        id: "C2",
        claim: "기록된 결과를 검토할 수 있다.",
        evidence: "사용자는 기록된 결과를 검토하고 필요한 부분만 다시 실행할 수 있다.",
      },
      {
        id: "C3",
        claim: "결과를 파일로 저장한다.",
        evidence: "프로젝트는 로컬 환경에서 실행되며 결과를 파일로 저장한다.",
      },
    ],
    used_fallback: false,
  };
}

test("근거 인용이 원문에 존재하면 결정론 검증을 통과한다", () => {
  const result = assessEditorialGrounding(article, groundedDraft());
  assert.equal(result.passed, true);
  assert.equal(result.quoteCoverage, 100);
  assert.deepEqual(result.addedNumbers, []);
});

test("원문에 없는 숫자와 근거 인용은 공개 검증에서 차단한다", () => {
  const draft = groundedDraft();
  draft.summary = `${draft.summary} 정확도는 99%다.`;
  draft.claims[0].evidence = "원문에 존재하지 않는 근거 문장이다.";
  const result = assessEditorialGrounding(article, draft);
  assert.equal(result.passed, false);
  assert.equal(result.quoteCoverage, 67);
  assert.deepEqual(result.addedNumbers, ["99%"]);
});

test("원문에 없는 숫자 문장과 부정확한 근거 인용을 검증 전에 제거한다", () => {
  const draft = groundedDraft();
  draft.summary = `${draft.summary} 정확도는 99%다.`;
  draft.key_points.push("처리량은 1,500건이다.");
  draft.claims.push({
    id: "C4",
    claim: "정확도는 99%다.",
    evidence: "원문에 존재하지 않는 숫자 근거 문장이다.",
  });
  const sanitized = sanitizeEditorialDraft(article, draft);
  assert.equal(sanitized.summary.includes("99%"), false);
  assert.equal(sanitized.key_points.some((item) => item.includes("1,500")), false);
  assert.equal(sanitized.claims.length, 3);
  assert.equal(assessEditorialGrounding(article, sanitized).passed, true);
});

test("범용적인 실무 조언은 최종 글 품질 검사에서 차단한다", () => {
  const draft = groundedDraft();
  draft.practical_takeaway = "실제 워크로드에 맞는지 확인할 필요가 있다.";
  const result = assessEditorialGrounding(article, draft);
  assert.equal(result.passed, false);
  assert.ok(result.issues.some((issue) => issue.startsWith("범용적인 실무 조언")));
});

test("검증 모델의 1~10 점수 응답을 0~100 척도로 보정한다", () => {
  const result = parseEditorialVerification({
    evidence_score: 9,
    clarity_score: 9,
    specificity_score: 8,
    usefulness_score: 9,
    distinctness_score: 8,
    unsupported_claims: [],
    critical_issues: [],
    improvement_notes: [],
  });
  assert.equal(result.evidenceScore, 90);
  assert.equal(result.editorialScore, 86);
});

test("v3 해설 형식과 검증 메타데이터를 직렬화한다", () => {
  const serialized = JSON.parse(
    serializeQuickFeedSummary({
      ...groundedDraft(),
      evidence_score: 100,
      editorial_score: 91,
      verification_issues: [],
      verification_last_attempt_at: "2026-07-12T00:00:00.000Z",
    })
  );
  assert.equal(serialized.version, 3);
  assert.equal(serialized.context, groundedDraft().context);
  assert.equal(serialized.explanation.length, 2);
  assert.equal(serialized.claims.length, 3);
  assert.equal(serialized.editorial_score, 91);
  assert.equal(
    serialized.verification_last_attempt_at,
    "2026-07-12T00:00:00.000Z"
  );
});

test("검증 실패 글은 마지막 시도 12시간 후에만 재처리한다", () => {
  const now = Date.parse("2026-07-12T12:00:00.000Z");
  const recent = JSON.stringify({
    verification_last_attempt_at: "2026-07-12T01:00:01.000Z",
  });
  const elapsed = JSON.stringify({
    verification_last_attempt_at: "2026-07-12T00:00:00.000Z",
  });

  assert.equal(isVerificationRetryReady(recent, now), false);
  assert.equal(isVerificationRetryReady(elapsed, now), true);
  assert.equal(isVerificationRetryReady("{}", now), true);
});

test("구조화 해설 파서는 필수 독자 설명과 근거를 요구한다", () => {
  const fallback = fallbackClassification(article);
  const parsed = parseClassification(JSON.stringify(groundedDraft()), fallback);
  assert.equal(parsed.used_fallback, false);
  assert.equal(parsed.claims.length, 3);
  assert.equal(parsed.explanation.length, 2);
});

test("자동 공개는 출처 형태별로 더 긴 근거를 요구한다", () => {
  assert.equal(isAutoPublishEvidenceEligible("가".repeat(400), "jsonld"), true);
  assert.equal(isAutoPublishEvidenceEligible("가".repeat(599), "transcript"), false);
  assert.equal(isAutoPublishEvidenceEligible("가".repeat(600), "transcript"), true);
  assert.equal(isAutoPublishEvidenceEligible("가".repeat(1199), "rss"), false);
  assert.equal(isAutoPublishEvidenceEligible("가".repeat(1200), "rss"), true);
});

test("공개 태그에 검증 상태를 포함한다", () => {
  const tags = buildTags("ai", "public", ["LLM"], "complete", "jsonld", "ready", "passed");
  assert.ok(tags.includes("verification:passed"));
});

test("GeekNews의 기존·신규 JSON-LD 본문과 실제 원문 링크를 추출한다", () => {
  const newsArticle = extractGeekNewsArticle(`
    <script type="application/ld+json">
      {"@type":"NewsArticle","articleBody":"새 형식의 충분한 기사 본문입니다.","description":"짧은 설명"}
    </script>
    <div class="topictitle link"><a href="https://example.com/original"><h1>제목</h1></a></div>
  `);
  assert.equal(newsArticle.content, "새 형식의 충분한 기사 본문입니다.");
  assert.equal(newsArticle.originalUrl, "https://example.com/original");

  const discussion = extractGeekNewsArticle(`
    <script type="application/ld+json">
      {"@type":"DiscussionForumPosting","text":"기존 형식의 기사 본문입니다.","sharedContent":{"url":"https://example.com/legacy"}}
    </script>
  `);
  assert.equal(discussion.content, "기존 형식의 기사 본문입니다.");
  assert.equal(discussion.originalUrl, "https://example.com/legacy");
});

test("GeekNews Markdown에서 댓글을 제외한 본문만 추출한다", () => {
  const content = extractGeekNewsMarkdown(`
# 제목

## Metadata
- Original source: [example.com](https://example.com)

## Topic Body
- **첫 번째** 핵심 내용임
- [두 번째 내용](https://example.com/detail)은 링크를 포함함

## Comments
- 본문에 포함되면 안 되는 댓글
  `);
  assert.ok(content.includes("첫 번째 핵심 내용임"));
  assert.ok(content.includes("두 번째 내용은 링크를 포함함"));
  assert.equal(content.includes("포함되면 안 되는 댓글"), false);
});
