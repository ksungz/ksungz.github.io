import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agent Bridge — 여러 AI CLI를 한 작업에서 연결 | Case Studies",
  description:
    "각 AI CLI의 기존 로그인과 구독 환경을 유지하면서 목표, 결정, 실행·리뷰 기록과 인계 문서를 한 작업 폴더에서 관리하는 오픈소스 CLI.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "Claude Code, Codex, Gemini CLI를 각각 구독하고 로그인해 사용하고 있었지만, 하나의 작업에서 함께 쓰려면 요청과 결과를 터미널 사이에서 직접 옮겨야 했습니다.",
      "API 키를 다시 발급받아 모델 라우터를 구성하는 대신, 각 도구의 기존 인증과 결제 방식을 그대로 유지하면서 한 작업 안에서 선택해 실행하는 방법이 필요했습니다.",
    ],
  },
  {
    label: "My Role",
    title: "제품 정의부터 CLI 구조, 검증과 공개까지 담당했습니다",
    body: [
      "Agent Bridge가 인증·결제나 API 프록시를 대신하지 않는다는 경계를 먼저 정하고, 작업 폴더 구조와 명령 체계, CLI 어댑터 형식, 리뷰와 인계 흐름을 설계·구현했습니다.",
      "가짜 로컬 에이전트를 사용하는 자동 테스트와 CI를 구성하고 MIT 라이선스로 공개했습니다. 실제 로그인된 Codex CLI도 공개 샘플 작업에서 연결해 실행 기록과 인계 문서가 생성되는 흐름을 확인했습니다.",
    ],
  },
  {
    label: "Decision",
    title: "모델을 합치는 대신 작업 기록을 연결했습니다",
    body: [
      "여러 AI 도구를 하나의 모델처럼 감싸지 않고, 각 CLI를 독립된 로컬 프로세스로 유지했습니다. Agent Bridge는 어떤 도구를 실행했는지와 그 결과만 공통 형식으로 기록합니다.",
      "특정 제공자의 API나 인증 방식에 종속되지 않도록 연결 정보는 JSON 어댑터로 분리했습니다. 프롬프트를 명령 인자나 표준 입력으로 받는 CLI를 같은 방식으로 등록할 수 있습니다.",
    ],
  },
  {
    label: "Architecture",
    title: "일반 파일로 확인할 수 있는 작업 공간",
    body: [
      "각 작업은 목표, 공통 맥락, 결정 사항, 실행 결과, 리뷰와 인계 문서를 하나의 작업 폴더에 저장합니다. 별도 데이터베이스 없이 일반 파일을 사용해 사용자가 어떤 내용이 전달됐는지 직접 확인할 수 있습니다.",
      "`ask`는 한 도구의 실행 결과를, `review`는 여러 도구에 같은 요청을 보낸 결과를 기록합니다. `handoff`는 다음 도구가 이어서 작업할 수 있도록 목표와 결정, 최근 실행 내용을 문서로 정리합니다.",
    ],
  },
  {
    label: "Validation",
    title: "자동 테스트와 실제 CLI 실행을 분리해 검증했습니다",
    body: [
      "자동 테스트에서는 가짜 로컬 에이전트를 사용해 유료 API나 실제 AI 도구 없이 작업 생성, 실행 기록, 리뷰와 인계 문서 생성을 재현합니다.",
      "공개 데모에서는 사용자 파일이 없는 샘플 작업으로 현재 소스를 빌드한 뒤 로그인된 Codex CLI를 실제 실행했습니다. 실행 결과가 작업 폴더에 남고 다음 도구용 인계 문서가 생성되는 것을 확인했습니다.",
    ],
  },
  {
    label: "Result",
    title: "기존 AI CLI 환경을 유지하는 연결 계층을 공개했습니다",
    body: [
      "작업 생성, 도구 목록 확인, 단일 실행, 다중 리뷰, 인계 문서와 요약 생성을 CLI 명령으로 제공하며 GitHub에서 바로 설치할 수 있습니다.",
      "저장소에는 실행 화면과 전체 명령 흐름, 설치·사용 방법, 파일 구조, 지원하지 않는 범위를 한글로 공개했습니다.",
    ],
  },
  {
    label: "Limitations",
    title: "현재는 작업 기록과 인계의 기본 구조에 집중합니다",
    body: [
      "AI 제공자의 로그인이나 결제를 관리하지 않고, API 호출을 중계하거나 구독을 우회하지 않습니다. 연결할 CLI는 사용자의 로컬 환경에 이미 설치되고 로그인되어 있어야 합니다.",
      "긴 맥락을 자동으로 압축하거나 도구별로 필요한 파일을 선별하는 기능은 아직 구현하지 않았습니다. 현재 버전은 여러 CLI의 실행 결과와 결정, 리뷰와 인계 기록을 같은 위치에 남기는 범위에 집중합니다.",
    ],
  },
  {
    label: "Next Step",
    title: "실제 사용 흐름에서 전달 범위를 더 정교하게 다듬습니다",
    body: [
      "추가 CLI 어댑터의 재현성을 확인하고, 작업이 길어졌을 때 어떤 맥락을 다음 도구에 전달할지 선택하는 방식을 개선할 계획입니다.",
      "실행 실패와 부분 완료 상태를 더 명확하게 기록해, 다음 도구와 사용자가 현재 작업 상태를 빠르게 판단할 수 있도록 보완할 예정입니다.",
    ],
  },
];

const tags = ["Node.js", "TypeScript", "CLI", "Multi-Agent", "Handoff", "MIT"];

export default function AgentBridgeCaseStudy() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-12 sm:mb-16">
        <Link
          href="/case-studies"
          className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] inline-flex min-h-[44px] items-center"
        >
          ← Case Studies
        </Link>
        <p className="mt-6 mb-3 font-mono text-xs text-[var(--color-muted)]">
          Agent Bridge
        </p>
        <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          로그인된 여러 AI CLI를 한 작업에서 연결
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          기존 로그인과 구독 환경을 유지하면서 공통 목표, 결정, 실행·리뷰
          기록과 인계 문서를 한 작업 폴더에서 관리하는 오픈소스 CLI입니다.
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
            src="/portfolio/agent-bridge-live-demo.png"
            alt="Agent Bridge가 공개 샘플 작업에서 로그인된 Codex CLI의 실행 결과와 다음 도구용 인계 문서를 생성한 화면"
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
          <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-xs leading-relaxed text-[var(--color-muted)]">
            2026년 7월 26일 사용자 파일이 없는 공개 샘플 작업에서 로그인된
            Codex CLI를 실제 연결한 결과입니다.
          </figcaption>
        </figure>
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
          href="https://github.com/ksungz/agent-bridge"
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
