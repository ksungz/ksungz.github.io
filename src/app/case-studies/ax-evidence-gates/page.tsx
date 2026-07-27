import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AX Evidence Gates — AI와 함께 만든 결과를 다시 확인하는 세 가지 도구 | Case Studies",
  description:
    "여행 API 연동 코드, 상품 등록 정보, 투자 답변 초안을 공개 문서 기준으로 확인한 세 가지 해커톤 제출물과 후속 개선 기록.",
};

const sections = [
  {
    label: "문제",
    title: "AI가 빠르게 만든 결과도 그대로 제출할 수는 없었습니다",
    body: [
      "AX 인재전쟁 기업 과제는 공개 자료를 바탕으로 실제 문제를 좁히고, AI와 함께 만든 결과를 다시 검수할 수 있는 Codex 플러그인을 만드는 일이었습니다.",
      "기업 내부 시스템이나 실제 고객 데이터는 사용할 수 없었습니다. 그래서 누구나 열어볼 수 있는 공식 문서와 직접 만든 테스트용 예시만으로 확인 가능한 범위를 정했습니다.",
    ],
  },
  {
    label: "내가 맡은 일",
    title: "무엇을 확인할지 정하고 결과를 직접 검토했습니다",
    body: [
      "여섯 기업 과제 중 마이리얼트립, 무신사, 카카오페이증권 세 곳을 골라 각각 다른 문제를 풀었습니다.",
      "AI는 공개 자료 정리, 검사 코드와 테스트 초안에 활용했습니다. 어떤 문제를 풀지, 어떤 문서를 근거로 삼을지, 무엇을 만들지 않을지는 직접 정했습니다. AI가 작성한 인용과 판단도 원문과 실행 결과로 다시 확인했습니다.",
    ],
  },
  {
    label: "선택",
    title: "그럴듯한 데모보다 확인 가능한 작은 도구를 택했습니다",
    body: [
      "공개 자료만으로 기업의 실제 서비스를 흉내 내면 겉모습만 그럴듯해질 수 있다고 생각했습니다. 대신 개발자가 작성한 API 연동 코드, 판매자가 준비한 상품 정보, AI가 만든 투자 답변 초안처럼 입력과 결과를 직접 확인할 수 있는 범위를 골랐습니다.",
      "확인할 수 없는 내용은 괜찮다고 추측하지 않았습니다. 문제가 발견된 위치와 참고한 공식 문서, 다음에 확인할 내용을 함께 보여주고 마지막 판단은 사람이 맡도록 했습니다.",
    ],
  },
  {
    label: "동작 방식",
    title: "세 도구는 서로 다른 결과물을 살펴봅니다",
    body: [
      "먼저 공식 문서에서 확인할 기준을 정리하고, 테스트용 입력을 준비한 뒤 같은 기준으로 반복 검사합니다. 문제가 있으면 해당 위치와 이유, 참고할 문서, 수정하거나 추가로 확인할 내용을 돌려줍니다.",
      "마이리얼트립 도구는 페이지 기준, 공항 코드, 인증과 호출 제한처럼 Open API 연동 코드에서 놓치기 쉬운 10개 항목을 확인합니다. 무신사 도구는 상품 속성, 태그, 사이즈와 필수 정보 누락을 살펴봅니다. 카카오페이증권 도구는 매수·매도를 단정하는 표현이나 사용자 상황, 위험 안내와 근거가 빠졌는지 확인합니다.",
    ],
  },
  {
    label: "구현",
    title: "다른 사람도 같은 결과를 확인할 수 있게 만들었습니다",
    body: [
      "세 도구는 별도 계정이나 API 키 없이 로컬에서 실행할 수 있습니다. 바로 확인할 수 있도록 예제 입력과 예상 결과도 함께 공개했습니다.",
      "한 번의 명령으로 전체 테스트를 실행할 수 있게 만들었고, GitHub에 코드를 올릴 때도 같은 검사가 자동으로 실행됩니다.",
      "해커톤이 끝난 뒤에는 금융 답변 도구를 LangGraph로 확장했습니다. 문제가 없는 답변은 바로 통과하고, 확인할 내용이 있으면 멈춘 뒤 사람이 승인하거나 수정하거나 반려할 수 있습니다. 수정한 답변은 다시 검사하고, 어떤 결정을 했는지도 기록으로 남깁니다.",
    ],
  },
  {
    label: "확인",
    title: "해커톤 이후에도 테스트를 추가하며 계속 개선했습니다",
    body: [
      "해커톤 제출 당시에는 마이리얼트립 19개, 무신사 17개, 카카오페이증권 7개로 총 43개 테스트를 만들었습니다. 이후 금융 답변 입력 검사 1개와 사람 검토 흐름 5개를 더했습니다.",
      "현재 공개 저장소에서는 총 49개 테스트가 통과합니다. 화면에서도 위험한 답변을 반려하는 과정과 내용을 고친 답변이 다시 검사를 통과하는 과정을 확인했습니다.",
    ],
  },
  {
    label: "결과",
    title: "검사 결과를 보여주는 데서 사람의 결정까지 연결했습니다",
    body: [
      "무신사 과제는 본선 후보로 선정됐지만 최종 본선 진출로 이어지지는 않았습니다. 세 과제를 진행하면서 분야가 달라도 확인할 범위를 좁히고, 공식 문서와 검사 기준을 연결한 뒤 사람이 마지막 결정을 내리는 흐름은 공통으로 적용할 수 있다는 점을 확인했습니다.",
      "해커톤 제출물을 공개하는 데서 끝내지 않고, 금융 답변 검사를 실제 업무의 검토 과정에 가까운 화면과 흐름으로 확장했습니다. 코드와 테스트용 예시, 설계 문서는 GitHub에서 확인할 수 있습니다.",
    ],
  },
  {
    label: "현재 한계",
    title: "아직 실제 회사 서비스에 적용한 도구는 아닙니다",
    body: [
      "이 프로젝트는 마이리얼트립, 무신사, 카카오페이증권이나 행사 주최사가 만든 공식 도구가 아닙니다. 공개된 문서와 제가 직접 만든 테스트용 데이터만 사용한 개인 프로젝트입니다.",
      "실제 예약이나 상품 등록, 투자 판단을 대신하지 않습니다. 지금 보여주는 결과는 사람이 다시 볼 부분을 알려주는 신호이며, 실제 서비스에 적용하려면 다양한 실제 사례로 잘못 잡거나 놓치는 경우를 더 확인해야 합니다.",
    ],
  },
  {
    label: "다음 단계",
    title: "실제 사례를 더 모아 검사 기준을 다듬을 계획입니다",
    body: [
      "각 분야에서 자주 틀리는 사례를 더 모으고, 잘못 문제로 판단하거나 실제 문제를 놓치는 경우를 기록하면서 검사 기준을 다듬을 계획입니다.",
      "현재 검토 기록은 실행 중에만 보관됩니다. 여러 사람이 실제 업무에서 사용하려면 기록을 계속 저장하는 기능과 로그인, 검토 권한 관리도 추가해야 합니다.",
    ],
  },
];

const tags = [
  "Python",
  "LangGraph",
  "공식 문서 확인",
  "사람 검토",
  "49 Tests",
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
        <h1 className="mb-4 break-keep text-2xl font-bold tracking-tight sm:text-3xl">
          AI와 함께 만든 결과를 다시 확인하는 세 가지 도구
        </h1>
        <p className="max-w-2xl break-keep text-sm leading-relaxed text-[var(--color-muted)]">
          여행 API 연동 코드, 상품 등록 정보와 투자 답변 초안에서 놓치기
          쉬운 조건과 근거를 확인하도록 만든 프로젝트입니다.
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
            <h2 className="mb-3 break-keep text-base font-semibold sm:text-lg">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="break-keep text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12 border-t border-[var(--color-border)] pt-8 sm:mt-16">
        <div className="flex flex-wrap gap-2">
          <a
            href="https://github.com/ksungz/ax-evidence-gates"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] sm:min-h-0 sm:py-1.5"
          >
            GitHub ↗
          </a>
          <Link
            href="/engineering/ax-hackathon-retrospective"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] sm:min-h-0 sm:py-1.5"
          >
            해커톤 후기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
