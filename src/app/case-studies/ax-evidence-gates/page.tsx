import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AX Evidence Gates — 공개 근거 기반 AI 품질 게이트 3종 | Case Studies",
  description:
    "여행·상품·금융 AI 품질 게이트 3종과 금융 답변의 LangGraph 사람 검토 흐름을 39개 테스트로 검증한 사례.",
};

const sections = [
  {
    label: "Problem",
    title: "자연스러운 AI 결과가 안전하거나 정확하다는 뜻은 아닙니다",
    body: [
      "여행 답변의 예약 가능 여부와 가격, 상품 등록 데이터의 속성과 고시 정보, 금융 안내 문구의 투자 판단 표현은 작은 오류도 사용자의 결정에 직접 영향을 줄 수 있습니다.",
      "기업 내부 데이터나 비공개 시스템에 접근하지 않는 상황에서도, 공개 근거로 확인할 수 있는 범위를 정하고 AI 결과물을 반복 검수하는 방법을 보여줄 필요가 있었습니다.",
    ],
  },
  {
    label: "My Role",
    title: "문제 범위와 근거·판정 기준, 검증·공개를 책임졌습니다",
    body: [
      "AX 인재전쟁 2026의 기업별 공개 과제를 분석해 여행 예약 답변, 상품 등록 데이터, 금융 안내 문구라는 세 가지 검수 문제를 정의했습니다.",
      "AI 에이전트를 공개 문서 조사 정리, Python 검사기와 Codex 스킬, 합성 예제와 테스트 초안 구현에 사용했습니다. 문제 범위와 사용할 근거, 입력 계약과 최종 판정 기준은 직접 정하고, 33개 테스트와 공개 결과를 다시 실행해 반영 여부를 결정했습니다.",
    ],
  },
  {
    label: "Decision",
    title: "생성 기능보다 검증 가능한 품질 게이트를 선택했습니다",
    body: [
      "내부 API나 실시간 데이터 없이 추천·상담 제품을 구현하면 실제 기능처럼 오해될 수 있다고 판단했습니다. 대신 이미 생성된 답변과 데이터를 입력받아 사람이 확인할 위치를 좁히는 독립 품질 게이트로 범위를 제한했습니다.",
      "확인하지 못한 내용을 추정해 통과시키지 않고, 입력 위치와 공개 근거를 함께 반환하도록 설계했습니다. 자동 승인보다 Human-in-the-loop 검토를 돕는 것이 공통 원칙입니다.",
    ],
  },
  {
    label: "Architecture",
    title: "도메인은 달라도 같은 검증 흐름을 사용합니다",
    body: [
      "공개 문서와 합성 샘플을 입력 계약으로 정리하고, 반복 가능한 항목은 결정적 규칙으로 검사합니다. 결과는 finding과 판정, 입력 위치, 공개 근거 URL, 수정 또는 추가 검토 제안을 포함합니다.",
      "Travel Booking Evidence Gate는 예약 관련 claim과 field evidence를 비교합니다. Commerce Listing Preflight는 상품 속성·태그·사이즈·고시 정보 신호를 확인합니다. Investment Answer Gate는 단정적 투자 표현과 사용자 조건·위험 설명·근거 URL 누락을 점검합니다.",
    ],
  },
  {
    label: "Implementation",
    title: "외부 계정이나 API 키 없이 로컬에서 재현할 수 있게 만들었습니다",
    body: [
      "세 품질 게이트 모두 Python 표준 라이브러리로 실행할 수 있으며, Markdown 또는 JSON 예제 입력과 기대 결과를 함께 제공합니다.",
      "각 프로젝트에 Codex 플러그인 메타데이터와 스킬 지침을 포함하고, 세 도구를 한 번에 검증하는 통합 스크립트와 GitHub Actions CI를 구성했습니다.",
      "해커톤 종료 후에는 금융 답변 게이트를 LangGraph 상태 그래프에 연결했습니다. 안전한 답변은 자동으로 통과하고, 위험 항목이 발견되면 실행을 멈춰 사람이 승인·수정·반려할 수 있습니다. 수정본은 같은 규칙으로 다시 검사하며 결정 과정은 감사 기록으로 남깁니다.",
    ],
  },
  {
    label: "Validation",
    title: "해커톤 산출물과 후속 확장을 39개 테스트로 검증했습니다",
    body: [
      "해커톤 제출 시점에는 여행 9개, 상품 17개, 금융 7개로 총 33개 테스트를 구성했습니다. 이후 금융 게이트의 메모리 입력 검증 1개와 LangGraph 검토 흐름 5개를 추가했습니다.",
      "현재 로컬 통합 테스트와 GitHub Actions CI에서 39개 테스트가 통과합니다. 검토 UI에서 위험 답변 반려와 개선 답변 자동 통과도 직접 확인했습니다.",
    ],
  },
  {
    label: "Result",
    title: "세 산출물을 하나의 공개 AX 검증 포트폴리오로 연결했습니다",
    body: [
      "서로 다른 도메인에서도 문제 범위를 좁히고, 공개 근거를 판정 규칙과 연결하며, 사람이 최종 판단할 수 있는 검수 흐름을 구현했습니다.",
      "해커톤 산출물 공개에서 멈추지 않고, 금융 답변 검사를 실제 승인 절차에 가까운 상태 기반 워크플로우와 검토 화면으로 확장했습니다. 코드, 합성 샘플, 설계 문서, 케이스 스터디와 CI는 AX Evidence Gates 저장소에 공개했습니다.",
    ],
  },
  {
    label: "Limitations",
    title: "공식 제품이나 실서비스 검증 시스템이 아닙니다",
    body: [
      "마이리얼트립, 무신사, 카카오페이증권 및 행사 주최사가 개발·승인·운영하는 도구가 아닙니다. 공개 문서와 합성 데이터만 사용한 독립 프로토타입입니다.",
      "실제 예약, 상품 등록, 투자 판단이나 준법 판정을 수행하지 않습니다. 현재 finding은 검토 신호이며, 실서비스 적용 전에는 실제 입력 분포와 오탐·미탐 평가가 추가로 필요합니다.",
    ],
  },
  {
    label: "Next Step",
    title: "실제 입력과 검토 기록을 기준으로 평가 범위를 확장합니다",
    body: [
      "도메인별 기준 질문과 실패 사례를 더 모아 회귀 테스트 세트를 확장하고, 규칙별 오탐·미탐과 검토 시간을 측정할 계획입니다.",
      "현재는 메모리 체크포인터와 합성 입력을 사용합니다. 실제 운영으로 확장하려면 영속 저장소, 사용자 인증, 검토 권한과 실제 입력 분포를 반영한 평가가 추가로 필요합니다.",
    ],
  },
];

const tags = [
  "Python",
  "LangGraph",
  "Evidence-based QA",
  "Human-in-the-loop",
  "39 Tests",
  "CI",
];

export default function AxEvidenceGatesCaseStudy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <Link
          href="/case-studies"
          className="inline-flex min-h-[44px] items-center font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          ← Case Studies
        </Link>
        <p className="mt-6 mb-3 font-mono text-xs text-[var(--color-muted)]">
          AX Evidence Gates
        </p>
        <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          공개 근거 기반 AI 품질 게이트 3종
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          여행 예약 답변, 상품 등록 데이터, 금융 안내 문구의 근거 부족과
          위험한 단정을 공개 문서와 합성 입력으로 점검한 사례입니다.
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
        {sections.map((section) => (
          <div key={section.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              {section.label}
            </p>
            <h2 className="mb-3 text-base font-semibold sm:text-lg">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12 border-t border-[var(--color-border)] pt-8 sm:mt-16">
        <a
          href="https://github.com/ksungz/ax-evidence-gates"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] sm:min-h-0 sm:py-1.5"
        >
          GitHub ↗
        </a>
      </section>
    </div>
  );
}
