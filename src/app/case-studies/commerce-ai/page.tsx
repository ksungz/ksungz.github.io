import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commerce AI — 2,384개 SCSS 파일 Dart Sass 전환 | Case Studies",
  description:
    "Cursor·Claude를 활용해 대규모 SCSS 마이그레이션을 3주에 완료하고, PR Review Agent로 반복 리뷰를 자동화한 사례.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "커머스 서비스에 2,384개 SCSS 파일이 있었고, Dart Sass로 전환해야 했습니다. 사람이 수작업으로 전환하면 몇 달이 걸릴 수 있는 규모였습니다.",
      "전환 외에도 반복 산출물 작성, PR 리뷰 등 반복 작업이 많았고, 팀의 시간을 더 가치 있는 작업에 쓰고 싶었습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "가정",
    body: [
      "AI 도구(Cursor, Claude)를 활용해 변환 규칙을 학습시키면, 반복적인 SCSS 변환을 빠르게 수행할 수 있다.",
      "PR 리뷰 중 반복적인 체크 항목을 AI가 담당하면, 사람은 예외 판단과 최종 검증에 집중할 수 있다.",
    ],
  },
  {
    label: "Architecture",
    title: "구조",
    body: [
      "Cursor와 Claude를 활용해 SCSS 변환 스크립트를 작성하고 실행했습니다. 변환은 자동화하되, 예외 판단과 최종 검증은 사람이 담당하는 흐름으로 설계했습니다.",
      "PR Review Agent는 8개 저장소에 적용했습니다. 커밋·PR·QA 체크리스트 작성 흐름을 표준화해, 반복 작업을 AI에 위임하고 최종 검증은 사람이 하는 구조를 만들었습니다.",
    ],
  },
  {
    label: "Implementation",
    title: "구현",
    body: [
      "Cursor와 Claude를 함께 활용해 SCSS 파일을 분석하고 변환 규칙을 만들었습니다. 변환 스크립트를 단계별로 실행하면서, 오류가 발생하면 규칙을 수정하는 루프를 반복했습니다.",
      "PR Review Agent는 커밋 메시지, PR 설명, QA 체크리스트를 자동으로 작성하는 흐름으로 구성했습니다. 8개 저장소에 순차 적용하면서, 각 저장소의 컨벤션에 맞게 조정했습니다.",
    ],
  },
  {
    label: "Challenges",
    title: "어려웠던 점",
    body: [
      "2,384개 파일을 한 번에 변환하면 오류가 누적되어 추적이 어려웠습니다. 작은 단위로 나누어 변환하고 검증하는 루프를 설계했지만, 단위 크기를 정하는 것이 어려웠습니다.",
      "PR Review Agent가 저장소마다 컨벤션이 달라서, 각 저장소에 맞게 프롬프트와 체크리스트를 조정하는 데 시간이 들었습니다. 또한 AI가 작성한 산출물을 무조건 신뢰하지 않도록, 검증 단계를 명확히 정의해야 했습니다.",
    ],
  },
  {
    label: "Result",
    title: "결과",
    body: [
      "2,384개 SCSS 파일을 3주 안에 Dart Sass로 전환 완료했습니다. 사람이 수작업할 경우 몇 달이 걸릴 수 있었던 작업을 AI 도구로 단축했습니다.",
      "PR Review Agent를 8개 저장소에 적용하고, 커밋·PR·QA 체크리스트 작성 흐름을 표준화했습니다. 반복 작업은 AI가 담당하고, 예외 판단과 최종 검증은 사람이 담당하는 구조가 정착했습니다.",
    ],
  },
  {
    label: "Next Step",
    title: "다음 개선",
    body: [
      "PR Review Agent가 더 다양한 코드 패턴을 인식하도록 학습 데이터를 확장할 계획입니다. 또한 변환 규칙을 재사용 가능한 형태로 정리해, 유사 마이그레이션에 빠르게 적용할 수 있도록 준비 중입니다.",
      "반복 작업 자동화 범위를 늘려, 팀이 더 가치 있는 작업에 시간을 쓸 수 있도록 지속 개선하고 있습니다.",
    ],
  },
];

const tags = ["Sass Migration", "PR Review Agent", "Cursor", "Claude", "Codex"];

export default function CommerceAICaseStudy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <Link
          href="/case-studies"
          className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          ← Case Studies
        </Link>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-6 mb-3">
          Commerce AI
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          2,384개 SCSS 파일 Dart Sass 전환
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          AI 도구를 활용해 대규모 SCSS 마이그레이션을 3주 안에 완료하고, PR Review
          Agent로 반복 리뷰를 자동화한 사례.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
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

      <section className="space-y-10">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-3">
              {s.label}
            </p>
            <h2 className="text-lg font-semibold mb-3">{s.title}</h2>
            <div className="space-y-3">
              {s.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}