import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obsidian RAG — 에이전트가 내 문서를 찾아보게 하기 | Case Studies",
  description:
    "Obsidian 문서를 Ollama 임베딩으로 인덱싱하고 MCP·HTTP·CLI로 검색하는 로컬 RAG 환경. 여러 AI 에이전트가 같은 문서를 검색하는 사례.",
};

const sections = [
  {
    label: "Problem",
    title: "왜 만들었는가",
    body: [
      "프로젝트 문서와 작업 기록, 이전 결정 사항은 Obsidian에 쌓여 있었지만 AI 에이전트는 그 내용을 알지 못했습니다. Claude Code, Codex, Hermes처럼 사용하는 도구를 바꿀 때마다 같은 프로젝트 배경을 다시 설명해야 했고, 과거에 내린 결정을 찾기 위해 문서를 직접 검색하는 일도 반복됐습니다.",
      "특정 에이전트에 종속되지 않으면서 여러 도구가 같은 문서를 검색할 수 있는 구조가 필요했습니다.",
    ],
  },
  {
    label: "Hypothesis",
    title: "가정",
    body: [
      "Obsidian의 Markdown 문서를 로컬 임베딩으로 변환해 저장하면, 에이전트가 프로젝트 맥락을 검색할 수 있다.",
      "검색 기능을 MCP, HTTP, CLI 세 가지 방식으로 제공하면, 어떤 에이전트든 같은 검색 결과를 사용할 수 있다.",
    ],
  },
  {
    label: "Architecture",
    title: "구조",
    body: [
      "Obsidian Markdown 문서를 재귀적으로 읽어 Ollama 임베딩으로 변환하고 ChromaDB에 저장하는 인덱서를 만들었습니다.",
      "FastAPI 검색 서버를 구성하고, 문서가 변경되면 해당 파일만 다시 처리하도록 증분 인덱싱을 적용했습니다.",
      "검색 기능은 MCP, HTTP, CLI 세 가지 방식으로 제공해 Claude Code, Codex, Hermes가 같은 검색 결과를 사용할 수 있도록 했습니다.",
    ],
  },
  {
    label: "Implementation",
    title: "구현",
    body: [
      "로컬 Ollama 임베딩으로 문서를 청크 단위로 변환하고 ChromaDB에 저장했습니다. 파일 변경 감지 시 해당 파일만 재처리하는 증분 인덱싱을 구현했습니다.",
      "RAG 서버는 답변을 대신 만들지 않고 관련 문서 조각과 출처만 반환합니다. 최종 답변과 작업 판단은 각 에이전트가 담당하도록 분리했습니다.",
    ],
  },
  {
    label: "Challenges",
    title: "어려웠던 점",
    body: [
      "RAG를 붙이는 것보다 문서를 어떻게 나누고 최신 기록을 우선할지 정하는 일이 검색 품질에 더 큰 영향을 줬습니다.",
      "사용 과정에서 발생한 교정 사항을 작업 로그, 프로젝트별 메모리, 공통 규칙으로 나눠 기록했습니다. 반복해서 확인된 내용만 사람이 검토한 뒤 공통 메모리에 반영하도록 해, 자동으로 잘못된 규칙이 쌓이지 않게 했습니다.",
    ],
  },
  {
    label: "Result",
    title: "결과",
    body: [
      "초기 기준 202개 문서를 3,045개 청크로 인덱싱하고, 여러 에이전트가 같은 프로젝트 기록과 결정 사항을 검색할 수 있게 됐습니다.",
      "Hermes에서는 Discord 작업 요청을 받은 뒤 필요할 때 RAG와 MCP 도구를 사용하고 결과와 작업 로그를 남기도록 연결했습니다.",
    ],
  },
  {
    label: "Next Step",
    title: "다음 개선",
    body: [
      "문서 분할 전략과 최신 기록 우선 정책을 지속 개선하고 있습니다. 임베딩 모델 교체 실험도 검토 중입니다.",
      "검색 품질 평가 기준을 정의해, 어떤 쿼리에서 결과가 부족한지 정량적으로 파악하는 구조를 계획 중입니다.",
    ],
  },
];

const tags = ["RAG", "Ollama", "ChromaDB", "FastAPI", "MCP"];

export default function ObsidianRagCaseStudy() {
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
          Obsidian RAG
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          여러 AI 에이전트가 같은 문서를 검색하는 환경
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          Obsidian 문서를 로컬 임베딩으로 인덱싱하고 MCP·HTTP·CLI로 검색해
          에이전트 간 맥락 단절을 해결한 사례.
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