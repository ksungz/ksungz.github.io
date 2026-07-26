import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News Automation — 뉴스 선택부터 블로그 PR까지 | Case Studies",
  description:
    "GeekNews 큐레이션 → 텔레그램 봇 → AI 분석 → MDX 초안 → GitHub PR 자동 생성 파이프라인. 10편+ 블로그 초안 운영 사례.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "매일 기술 뉴스를 읽지만 읽는 데서 끝나고, 며칠 뒤 내용을 다시 찾기 어려웠습니다. 읽고 정리하는 반복 작업이 지속됐지만, 블로그 글로 만들 시간은 부족했습니다.",
      "뉴스를 선택하고 분석하고 글로 정리하는 과정을 사람이 매번 하기에는 비용이 높았고, 자동화하더라도 글의 품질을 어떻게 유지할지가 과제였습니다.",
    ],
  },
  {
    label: "My Role",
    title: "자동화 범위와 운영 경계를 정하고 전체 흐름을 검증했습니다",
    body: [
      "뉴스 수집과 텔레그램 선택 UI, 원문·댓글 수집, AI 분석, MDX 변환과 GitHub PR 생성 단계의 입력·출력과 완료 기준을 정했습니다. AI 코딩 에이전트를 활용해 파이프라인을 구현하고 실제 초안 PR 생성 과정으로 검증·운영했습니다.",
      "자동화가 공개 글을 바로 발행하지 않도록 경계를 정하고, 뉴스 선택과 생성된 초안의 최종 검수·병합은 직접 담당했습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "가정",
    body: [
      "뉴스 선택과 분석은 AI가 자동화할 수 있지만, 최종 판단은 사람이 담당하면 품질을 유지하면서 반복 작업을 줄일 수 있다.",
      "원문뿐 아니라 커뮤니티 댓글까지 수집해 분석하면, 단순 요약보다 맥락이 있는 글을 만들 수 있다.",
    ],
  },
  {
    label: "Architecture",
    title: "구조",
    body: [
      "GeekNews 큐레이션 → 텔레그램 봇 후보 발송 → 번호 선택 → AI 분석(원문 + 커뮤니티 댓글 수집) → MDX 초안 → GitHub PR 자동 생성 흐름으로 설계했습니다.",
      "AI 분석 단계는 Claude CLI를 우선 사용하고, 실패 시 Ollama로 전환하는 폴백 구조를 적용했습니다. 글 선택과 최종 검수는 사람이 담당합니다.",
    ],
  },
  {
    label: "Implementation",
    title: "구현",
    body: [
      "텔레그램 봇으로 후보 뉴스를 발송하고, 번호로 선택하면 파이프라인이 시작됩니다. 선택된 뉴스의 원문과 커뮤니티 댓글을 수집해 AI에 입력으로 전달합니다.",
      "AI가 분석 결과를 MDX 초안으로 작성하면, GitHub API로 PR을 자동 생성합니다. 초안은 사람이 검수하고 수정한 뒤 병합합니다.",
    ],
  },
  {
    label: "Challenges",
    title: "어려웠던 점",
    body: [
      "AI 분석 품질이 입력 데이터 품질에 크게 좌우됐습니다. 원문이 충분하지 않거나 댓글이 편향된 경우, 분석 결과가 얕아지는 문제가 있었습니다.",
      "Claude CLI가 실패할 때 자동으로 Ollama로 전환하는 폴백 로직을 안정적으로 구현하는 것이 복잡했습니다. 실패 감지와 재시도 시점을 명확히 정의해야 했습니다.",
    ],
  },
  {
    label: "Result",
    title: "결과",
    body: [
      "파이프라인을 통해 10편 이상의 블로그 초안을 생성하고 운영했습니다. 뉴스 선택부터 PR 생성까지 자동화되어, 사람은 검수와 수정에 집중할 수 있게 됐습니다.",
      "운영 중인 파이프라인이며, 생성된 초안은 사람이 최종 검수한 뒤 병합합니다.",
    ],
  },
  {
    label: "Limitations",
    title: "초안 생성량과 독자 성과는 구분해야 합니다",
    body: [
      "10편 이상은 파이프라인이 만든 초안 수이며, 독자 수나 제품 성장 성과를 의미하지 않습니다. 공개 여부와 최종 내용은 사람의 검수를 거쳐 결정합니다.",
      "원문과 댓글의 품질이 낮으면 분석도 얕아질 수 있습니다. 폴백 성공 여부는 확인했지만 모델별 품질과 수정량을 정량 평가하는 체계는 아직 부족합니다.",
    ],
  },
  {
    label: "Next Step",
    title: "다음 개선",
    body: [
      "댓글 수집 범위를 늘리고, 댓글 품질을 가중 평가하는 로직을 추가할 계획입니다. 또한 AI 분석 결과의 일관성을 높이기 위해 프롬프트를 지속적으로 개선하고 있습니다.",
      "초안 품질을 자동 평가하는 단계를 추가해, 검수 전 낮은 품질의 초안을 걸러내는 구조를 검토 중입니다.",
    ],
  },
];

const tags = ["AI Agent", "Telegram Bot", "MDX", "GitHub API", "Automation"];

export default function NewsAutomationCaseStudy() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <Link
          href="/case-studies"
          className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] inline-block min-h-[44px] flex items-center"
        >
          ← Case Studies
        </Link>
        <p className="font-mono text-xs text-[var(--color-muted)] mt-6 mb-3">
          News Automation
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          뉴스 선택부터 블로그 PR까지
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          매일 기술 뉴스를 읽고 정리하는 반복 작업을 AI Agent 기반 파이프라인으로
          자동화한 사례.
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

      <section className="space-y-8 sm:space-y-10">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-3">
              {s.label}
            </p>
            <h2 className="text-base sm:text-lg font-semibold mb-3">{s.title}</h2>
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
