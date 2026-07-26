import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AX Doctor — AI 도입 전 점검 도구 | Case Studies",
  description:
    "Go 기반 read-only preflight CLI로 AI 도입 전 기존 환경과 충돌, 권한, 미확인 범위를 진단한 사례. fail-closed 설계와 privacy-by-design 원칙 적용.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "새로운 AI 도구를 개발 환경에 설치하려면 기존 설정 파일, 환경 변수, 권한, 디스크 용량 등이 충돌할 수 있습니다. 하지만 설치 전에 이를 확인할 방법이 없었습니다.",
      "설치 후 충돌이 발생하면 원인을 추적하는 데 더 많은 시간이 들고, 최악의 경우 기존 환경이 손상됩니다. 도입 전에 읽기 전용으로 진단하고 판단 근거를 남기는 도구가 필요했습니다.",
    ],
  },
  {
    label: "My Role",
    title: "제품 범위와 계약부터 구현·검증까지 담당했습니다",
    body: [
      "설치 패키지로 시작한 아이디어를 도입 전 점검 도구로 다시 정의하고, 제품 범위와 비목표, 입력·출력 계약, 위협 모델과 단계별 완료 기준을 먼저 작성했습니다.",
      "Go CLI와 JSON Schema, 합성 데모와 검증 코드를 구현하고 저장소를 공개했습니다. Codex와 Claude는 구현과 교차 검토에 사용했지만, 범위와 판정 기준, 최종 반영 여부는 직접 결정했습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "가정",
    body: [
      "도입 대상과 기존 환경을 정적인 프로필로 비교하면, 실행 없이도 충돌 가능성을 사전에 식별할 수 있다.",
      "판정 기준을 명시적으로 정의하고 fail-closed로 설계하면, 알 수 없는 상태를 안전하게 차단할 수 있다.",
    ],
  },
  {
    label: "Architecture",
    title: "구조",
    body: [
      "scope → scan → report 3단계 흐름으로 설계했습니다. scope 단계에서 점검 대상 범위를 결정하고, scan 단계에서 읽기 전용으로 환경을 수집하며, report 단계에서 판정과 근거를 출력합니다.",
      "각 단계는 독립적으로 실행되며, 중간 단계 결과를 JSON으로 저장해 재현 가능성을 확보했습니다. 외부 상태 변경(쓰기)은 일절 하지 않는 read-only 설계입니다.",
    ],
  },
  {
    label: "Implementation",
    title: "구현",
    body: [
      "Go로 CLI를 작성했습니다. 환경 프로필을 JSON Schema로 정의하고, 점검 항목을 선언적으로 관리합니다. 각 항목은 검사 규칙과 판정 기준을 함께 가집니다.",
      "합성 데모 환경에서 safe 등급은 READY_WITH_CONDITIONS, risky 등급은 NOT_READY로 판정하는 흐름을 검증했습니다. 판정 근거는 보고서에 명시됩니다.",
    ],
  },
  {
    label: "Challenges",
    title: "어려웠던 점",
    body: [
      "어떤 상태를 safe로 볼 것인지의 기준을 정의하는 것이 가장 어려웠습니다. 단순히 오류가 없으면 safe가 아니라, 조건부 통과와 완전 차단을 구분하는 명확한 규칙이 필요했습니다.",
      "fail-closed 원칙을 지키기 위해, 알 수 없는 상태는 항상 차단 방향으로 판정하도록 설계했습니다. 하지만 이렇게 하면 오탐율이 높아져 실사용에서 불편할 수 있어, 근거를 함께 제시하는 것으로 보완했습니다.",
    ],
  },
  {
    label: "Result",
    title: "결과",
    body: [
      "합성 환경에서 scope → scan → report 흐름이 정상 동작하는 것을 확인했습니다. 판정과 근거가 보고서로 남아, 도입 결정 시 참고할 수 있는 기준선을 확보했습니다.",
      "저장소와 합성 데모는 오픈소스로 공개했습니다. 다만 실제 사용자 환경을 읽는 production runner는 아직 연결하지 않았으며, 일반 실행 명령도 의도적으로 비활성화한 상태입니다.",
    ],
  },
  {
    label: "Limitations",
    title: "현재는 합성 환경에서 검증한 공개 프로토타입입니다",
    body: [
      "실제 사용자의 HOME, AI 설정, 자격 증명이나 실행 중인 프로세스를 읽지 않습니다. 따라서 실제 환경을 지원하거나 기업 도입이 가능한 완성 제품으로 설명하지 않습니다.",
      "현재 확인한 결과는 공개 스키마, 합성 safe·risky 시나리오, 판정 근거와 산출물 무결성입니다. 실환경 프로필과 규칙별 오탐·미탐 평가는 production runner 이후에 별도로 필요합니다.",
    ],
  },
  {
    label: "Next Step",
    title: "다음 개선",
    body: [
      "실제 환경 프로필을 추가하고, 점검 항목을 확장할 계획입니다. 커뮤니티 기여로 점검 규칙이 쌓이도록, 규칙 정의를 외부 JSON으로 분리하는 구조를 검토 중입니다.",
      "판정 보고서를 사람이 읽기 쉬운 형식으로 발행하고, CI에 통합해 도입 전 자동 점검이 가능하도록 하는 것이 목표입니다.",
    ],
  },
];

const tags = ["Go", "CLI", "Preflight", "Privacy-by-design", "Fail-closed"];

export default function AxDoctorCaseStudy() {
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
          AX Doctor
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          AI 도입 전 점검 도구
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          Go 기반 read-only preflight CLI로 AI 도입 전 기존 환경과 충돌, 권한,
          미확인 범위를 진단한 사례.
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
        <figure className="mt-8 overflow-hidden rounded-md border border-[var(--color-border)] bg-[#0d1117]">
          <Image
            src="/portfolio/ax-doctor-live-demo.png"
            alt="AX Doctor 합성 safe 시나리오가 READY_WITH_CONDITIONS, risky 시나리오가 NOT_READY로 판정된 실제 CLI 실행 화면"
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
          <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-xs leading-relaxed text-[var(--color-muted)]">
            2026년 7월 26일 실제 명령 실행 결과입니다. 합성 데이터만 사용하며 실제 사용자 환경은 읽지 않습니다.
          </figcaption>
        </figure>
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

      <section className="mt-12 sm:mt-16 pt-8 border-t border-[var(--color-border)]">
        <a
          href="https://github.com/ksungz/ax-doctor"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px] sm:min-h-0"
        >
          GitHub ↗
        </a>
      </section>
    </div>
  );
}
