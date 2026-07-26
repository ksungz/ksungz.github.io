import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BabyPick — 육아용품 탐색 서비스와 콘텐츠 운영 자동화 | Case Studies",
  description:
    "공식 가이드의 생성·검증·API 발행을 자동화하고 네이버·인스타 콘텐츠는 사람 검수 전 단계까지 연결한 BabyPick 운영 사례.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "육아용품 탐색 서비스를 혼자 개발하고 운영하면서 상품 정보뿐 아니라 사용자가 검색으로 발견할 수 있는 가이드 콘텐츠도 지속적으로 필요했습니다.",
      "모든 글과 채널별 콘텐츠를 직접 작성하면 제품 개선 시간이 줄어듭니다. 반복 제작은 자동화하되, 외부 채널에 공개되는 결과는 사람이 검수할 수 있는 경계가 필요했습니다.",
    ],
  },
  {
    label: "My Role",
    title: "서비스와 콘텐츠 운영 흐름을 함께 만들었습니다",
    body: [
      "Next.js·Supabase 기반 서비스 화면과 데이터 구조, 가이드 API, Google Apps Script 자동화와 생성·검증 규칙을 직접 구현하고 운영했습니다.",
      "공식 사이트 가이드는 자동 발행하되, 네이버 블로그와 인스타그램은 초안·이미지·캡션과 검수 대기열까지만 준비하고 최종 공개는 직접 결정했습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "가정",
    body: [
      "키워드와 운영 기준은 사람이 관리하고, 반복적인 생성·형식 검사·API 발행을 자동화하면 서비스 개발과 콘텐츠 운영을 함께 지속할 수 있다.",
      "공식 사이트와 외부 채널의 발행 경계를 분리하면 자동화 범위를 넓히면서도 브랜드와 내용에 대한 최종 책임을 유지할 수 있다.",
    ],
  },
  {
    label: "Architecture",
    title: "구조",
    body: [
      "Google Sheets와 Apps Script에서 키워드와 상태를 관리하고, LLM으로 제목·본문·메타 정보를 생성합니다. 중복 주제, 형식과 금지 표현 검사를 통과한 공식 가이드만 BabyPick API로 발행합니다.",
      "네이버 블로그는 이미지와 서식을 구성해 SmartEditor 임시글로 저장하고, 인스타그램은 이미지·캡션·고정 댓글을 콘텐츠 패키지와 검수 대기열로 관리합니다. 두 채널 모두 자동 공개하지 않습니다.",
    ],
  },
  {
    label: "Implementation",
    title: "구현",
    body: [
      "Apps Script 메뉴와 상태 컬럼으로 키워드 선택, 생성, 검증, 발행 결과와 오류를 추적했습니다. 기존 글과 정규화한 주제를 비교해 중복을 막고, 생성 결과는 형식과 금지 표현 기준으로 검사했습니다.",
      "공식 가이드는 API 웹훅으로 발행하고, 네이버 임시글은 로그인된 SmartEditor에서 이미지 위치와 링크 카드를 확인한 뒤 저장하도록 구성했습니다. 인스타그램 콘텐츠는 로컬 원본과 Notion 검수 상태를 연결했습니다.",
    ],
  },
  {
    label: "Challenges",
    title: "어려웠던 점",
    body: [
      "표현이 조금 달라도 같은 주제를 다시 만드는 중복 문제와, 자연스러워 보이지만 운영 기준에 맞지 않는 문장을 함께 걸러내야 했습니다.",
      "외부 채널은 형식과 게시 도구가 서로 달라 완전 자동화보다 사람이 빠르게 확인할 수 있는 초안을 만드는 편이 안전했습니다. 자동화율보다 오류를 발견하고 멈출 수 있는 상태 관리에 우선순위를 뒀습니다.",
    ],
  },
  {
    label: "Result",
    title: "결과",
    body: [
      "공식 사이트에 220개 이상의 육아 가이드를 발행하고, 키워드 관리부터 생성·검증·API 발행과 오류 기록까지 하나의 운영 흐름으로 연결했습니다.",
      "네이버 블로그 임시글과 인스타그램 콘텐츠 패키지도 실제 화면과 검수 대기열까지 연결했습니다. 최종 공개는 사람이 결정한다는 경계를 유지했습니다.",
    ],
  },
  {
    label: "Limitations",
    title: "자동화 범위와 제품 지표에는 한계가 있습니다",
    body: [
      "네이버 블로그와 인스타그램은 자동 공개 시스템이 아닙니다. 현재 자동화 범위는 게시 전 초안과 콘텐츠 패키지, 검수 상태를 준비하는 단계까지입니다.",
      "콘텐츠 발행량은 확인했지만 검색 유입, 외부 채널 클릭과 상품 탐색·구매 행동을 하나의 지표로 연결하지 못했습니다. 따라서 사용자 성장이나 전환 성과를 단정하지 않습니다.",
    ],
  },
  {
    label: "Next Step",
    title: "다음 개선",
    body: [
      "공식 가이드, 네이버 블로그와 인스타그램에서 BabyPick으로 이어지는 유입과 행동을 구분해, 어떤 콘텐츠를 계속 만들지 판단할 수 있는 운영 지표를 연결할 계획입니다.",
      "중복·금지 표현 검사와 사람의 검수 결과를 함께 기록해, 생성 규칙을 수정할 근거로 사용하는 구조를 보완하고 있습니다.",
    ],
  },
];

const tags = ["AI Content", "Automation", "Supabase", "Human-in-the-loop"];

export default function BabyPickAICaseStudy() {
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
          BabyPick
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          육아용품 탐색 서비스와 콘텐츠 운영 자동화
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          공식 가이드의 생성·검증·API 발행을 자동화하고, 외부 채널은
          사람이 검수할 수 있는 초안과 콘텐츠 패키지까지 연결한 운영 사례.
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

      <section className="mt-12 sm:mt-16 pt-8 border-t border-[var(--color-border)]">
        <a
          href="https://babypick.co.kr/guide"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-[var(--color-border)] px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-foreground)] min-h-[44px] sm:min-h-0"
        >
          사이트 ↗
        </a>
      </section>
    </div>
  );
}
