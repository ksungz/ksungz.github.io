import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BabyPick AI — 220개+ 육아 가이드 자동 발행 | Case Studies",
  description:
    "키워드 관리 → AI 생성 → 검증 → API 발행 → 블로그·인스타 자동화까지 혼자 운영하는 콘텐츠 파이프라인. 220개+ 가이드 운영 사례.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "육아용품 가이드 서비스에 가이드 콘텐츠가 필요했지만, 혼자 서비스 개발과 콘텐츠 작성을 함께 하기에는 시간이 부족했습니다.",
      "가이드 양이 늘어날수록 사람이 직접 작성하는 방식은 확장이 어려웠고, 콘텐츠 품질과 발행 속도를 동시에 유지하는 것이 과제였습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "가정",
    body: [
      "키워드를 사람이 관리하고, 제목·본문·메타는 AI가 생성하면, 콘텐츠 품질을 유지하면서 발행량을 늘릴 수 있다.",
      "생성 결과를 형식과 금지 표현 기준으로 검사하면, 서비스 품질 기준을 자동으로 유지할 수 있다.",
    ],
  },
  {
    label: "Architecture",
    title: "구조",
    body: [
      "Google Apps Script에서 키워드를 관리하고, Gemini/Ollama로 제목·본문·메타를 생성합니다. 생성 결과는 형식과 금지 표현 검사를 거쳐 BabyPick API로 발행됩니다.",
      "블로그(네이버)와 인스타그램 자동화도 같은 흐름에 포함됩니다. 키워드 선택은 사람이 담당하고, 생성·검증·발행은 자동화합니다.",
    ],
  },
  {
    label: "Implementation",
    title: "구현",
    body: [
      "Google Apps Script로 키워드 관리 인터페이스를 만들었습니다. 키워드를 선택하면 Gemini로 콘텐츠를 생성하고, 실패 시 Ollama로 폴백합니다.",
      "생성된 콘텐츠는 형식 규칙과 금지 표현 목록을 기준으로 검사됩니다. 검사를 통과하면 BabyPick API로 발행되고, 네이버 블로그와 인스타그램에도 자동 전송됩니다.",
    ],
  },
  {
    label: "Challenges",
    title: "어려웠던 점",
    body: [
      "AI가 생성한 텍스트에 금지 표현이 포함되는 경우가 잦았습니다. 이를 자동으로 걸러내면서도 문맥이 자연스럽도록 유지하는 것이 어려웠습니다.",
      "Gemini와 Ollama의 출력 품질 차이가 있어, 폴백 시 결과가 달라지는 문제를 최소화하기 위해 프롬프트와 검증 로직을 지속 조정했습니다.",
    ],
  },
  {
    label: "Result",
    title: "결과",
    body: [
      "220개 이상의 육아 가이드를 자동 발행하며 운영 중입니다. 사람은 키워드 선택과 최종 확인에 집중하고, 생성·검증·발행은 자동화됐습니다.",
      "블로그(네이버)와 인스타그램 자동화까지 포함해, 단일 키워드에서 다 채널 발행까지 하나의 흐름으로 연결됐습니다.",
    ],
  },
  {
    label: "Next Step",
    title: "다음 개선",
    body: [
      "키워드 관리를 더 체계적으로 만들고, 발행 결과를 모니터링하는 대시보드를 추가할 계획입니다. 금지 표현 목록도 운영 데이터를 바탕으로 지속 업데이트하고 있습니다.",
      "생성 품질을 더 높이기 위해, 과거 발행 결과를 기반으로 프롬프트를 자동 개선하는 실험을 검토 중입니다.",
    ],
  },
];

const tags = ["AI Content", "Automation", "Supabase", "Gemini", "Ollama"];

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
          BabyPick AI
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          220개+ 육아 가이드 자동 발행
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          키워드 선택부터 AI 생성, 검증, 발행, 블로그·인스타 자동화까지 혼자
          운영하는 콘텐츠 파이프라인.
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