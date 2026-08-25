import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회사 제공 AI 도구를 업무에 적용한 과정 | Case Studies",
  description:
    "회사 제공 PR Review Agent의 여러 저장소 적용 과정에 참여하고 UI 파일 필터와 검토 기준, 사람이 확인할 범위를 정리한 경험.",
};

const sections = [
  {
    label: "Problem",
    title: "반복 작성과 검토 기준이 개인에게 흩어져 있었습니다",
    body: [
      "여러 저장소에서 PR 설명, 커밋 메시지, 작업 계획, 위키 초안과 QA 체크리스트를 매번 다시 작성했습니다. 접근성, BEM, SCSS 규칙처럼 반복해서 확인하는 리뷰 항목도 개인의 기억과 경험에 의존했습니다.",
      "AI 도구를 각자 사용하기 시작하면서 결과 형식과 참고 문맥도 달라졌습니다. 단순히 도구를 배포하는 것보다, 어떤 문맥을 참고하고 어디까지 자동화하며 누가 최종 판단할지 공통 기준이 필요했습니다.",
    ],
  },
  {
    label: "My Role",
    title: "도구 개발과 제가 참여한 범위를 구분했습니다",
    body: [
      "회사에서 제공한 PR Review Agent 자체를 개발한 것은 아닙니다. 여러 저장소에 적용하는 과정에 참여해 UI 파일 필터와 접근성·BEM·SCSS 검토 기준을 정리하고 실행 결과를 확인했습니다.",
      "AI 도구를 활용해 PR 설명, 문서 초안과 QA 체크리스트를 작성하고, 반복해서 사용할 형식과 예시를 정리했습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "명확한 반복 작업만 AI에 맡기면 검토의 초점을 바꿀 수 있습니다",
    body: [
      "규칙으로 설명할 수 있는 컨벤션 확인과 초안 작성을 AI가 먼저 수행하면, 개발자는 설계와 영향 범위, 예외 케이스처럼 맥락이 필요한 판단에 더 집중할 수 있다고 보았습니다.",
      "AI 결과를 머지 조건이나 최종 문서로 바로 사용하지 않고 확인 항목과 초안으로 제한하면, 도입 속도와 품질 책임을 함께 유지할 수 있다고 가정했습니다.",
    ],
  },
  {
    label: "Architecture",
    title: "도구가 확인할 항목과 사람이 판단할 항목을 나눴습니다",
    body: [
      "AI가 참고할 문맥, 확인할 UI 규칙, 실행 방법과 사람이 결과를 확인할 항목을 나눠 정리했습니다.",
      "AI가 참고할 수 있는 범위와 문서에 남기지 말아야 할 정보를 사용 기준에 포함했습니다.",
    ],
  },
  {
    label: "Implementation",
    title: "여러 저장소의 적용 과정에서 UI 검토 기준을 정리했습니다",
    body: [
      "회사 제공 PR Review Agent가 8개 저장소에 적용되는 과정에서 SCSS·HTML 중심의 파일 필터와 접근성·BEM·SCSS 검토 기준을 정리했습니다. 과한 코멘트와 예외 사례도 함께 확인했습니다.",
      "PR 설명, 커밋 메시지, 작업 계획, 위키 초안과 QA 체크리스트를 일정한 형식으로 작성할 수 있도록 예시와 사용 방법을 정리했습니다.",
    ],
  },
  {
    label: "Challenges",
    title: "자동화 범위보다 운영 경계를 정하는 일이 더 중요했습니다",
    body: [
      "팀의 모든 판단 기준을 규칙으로 만들 수는 없었습니다. 접근성과 네이밍처럼 기준이 명확한 항목부터 적용하고, 화면 설계와 변경 영향은 기존 코드 리뷰에서 별도로 확인했습니다.",
      "업무 문맥을 연결할 때는 접근 범위와 기록 위치를 제한해야 했습니다. 편의를 위해 문맥을 넓히기보다 승인된 범위만 참고하고, 민감한 정보가 산출물에 남지 않도록 사용 기준을 함께 문서화했습니다.",
    ],
  },
  {
    label: "Result",
    title: "반복 작업에 AI를 적용할 기준을 정리했습니다",
    body: [
      "반복 산출물의 형식과 UI 검토 기준을 정리했습니다. Agent 결과는 정답이 아니라 확인할 초안과 체크리스트로 보고, 최종 판단과 예외 검증은 사람이 맡도록 구분했습니다.",
      "정량적인 리뷰 시간 단축 수치는 측정하지 않았습니다. 확인 가능한 내용은 8개 저장소의 적용 과정에 참여한 경험과 정리한 UI 검토 기준, 사용 예시입니다.",
    ],
  },
  {
    label: "Limitations",
    title: "공개할 수 있는 범위와 효과 측정에는 한계가 있습니다",
    body: [
      "회사 내부 코드와 실제 리뷰 결과, 업무 문서는 공개하지 않습니다. 이 사례에서는 도구의 세부 구현보다 제가 참여한 범위와 사람이 결과를 확인한 방식을 중심으로 설명합니다.",
      "리뷰 품질과 오탐률을 장기적으로 수치화하지 못했습니다. 따라서 생산성 향상을 단정하지 않고, 적용 범위와 운영 방식처럼 확인할 수 있는 사실만 기록했습니다.",
    ],
  },
  {
    label: "Next Step",
    title: "규칙별 효과와 오탐을 따로 평가할 필요가 있습니다",
    body: [
      "접근성, 네이밍, 중복 스타일처럼 규칙 유형별로 결과를 분리하고, 사람이 수용·수정·무시한 비율을 기록하면 다음 조정의 근거를 만들 수 있습니다.",
      "새 저장소에 적용할 때 같은 기준을 재사용하되, 기술 스택과 업무 흐름에 맞지 않는 규칙은 기본값에서 분리하는 방식으로 운영 범위를 다듬을 계획입니다.",
    ],
  },
];

const tags = ["AI-assisted Development", "AI Review", "Documentation", "Human-in-the-loop"];

export default function DeveloperWorkflowAxCaseStudy() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <Link
          href="/case-studies"
          className="inline-flex min-h-[44px] items-center font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          ← Case Studies
        </Link>
        <p className="mt-6 mb-3 font-mono text-xs text-[var(--color-muted)]">
          AI 도구 활용
        </p>
        <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          회사 제공 AI 도구를 업무에 적용한 과정
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          회사 제공 PR Review Agent의 여러 저장소 적용 과정에 참여하고,
          UI 파일 필터와 검토 기준, 사람이 확인할 범위를 정리한 경험입니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="space-y-10 sm:space-y-12">
        {sections.map(({ label, title, body }) => (
          <section key={label}>
            <p className="mb-2 font-mono text-xs text-[var(--color-muted)]">{label}</p>
            <h2 className="mb-4 text-lg font-bold sm:text-xl">{title}</h2>
            <div className="space-y-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 border-t border-[var(--color-border)] pt-8">
        <Link
          href="/engineering/pr-review-agent"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-[var(--color-foreground)] bg-[var(--color-foreground)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--color-muted)]"
        >
          PR Review Agent 적용 기록 →
        </Link>
      </section>
    </div>
  );
}
