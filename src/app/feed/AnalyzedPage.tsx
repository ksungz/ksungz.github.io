"use client";

interface AnalyzedItem {
  id: number;
  source: string;
  cat: "dev" | "business" | "youtube" | "social";
  title: string;
}

const MOCK_ANALYZED: AnalyzedItem[] = [
  {
    id: 2,
    source: "이안",
    cat: "business",
    title: "실리콘밸리 2026 상반기: AI 인프라 투자가 폭증하는 이유",
  },
  {
    id: 7,
    source: "비즈까페",
    cat: "business",
    title: "스타트업 매출 10억 달성: 채널 믹스 전략 분석",
  },
  {
    id: 8,
    source: "GeekNews",
    cat: "dev",
    title: "WebAssembly 2.0: 브라우저에서 네이티브 성능 달성",
  },
  {
    id: 9,
    source: "Velopers",
    cat: "dev",
    title: "당근마켓 트래픽 아키텍처: 마이크로서비스 전환 후기",
  },
];

interface AnalyzedPageProps {
  onBack: () => void;
}

export function AnalyzedPage({ onBack: _onBack }: AnalyzedPageProps) {
  return (
    <>
      <div className="feed-header">
        <h1>📝 분석됨 · 포스팅 대기</h1>
        <p className="feed-header-desc">
          분석했지만 아직 블로그 초안 안 만든 글
        </p>
      </div>

      <div className="analyzed-list">
        {MOCK_ANALYZED.length === 0 && (
          <div className="feed-empty">대기 중인 글이 없습니다.</div>
        )}
        {MOCK_ANALYZED.map((item) => (
          <div key={item.id} className="analyzed-item">
            <span className={`source-badge ${item.cat}`}>{item.source}</span>
            <span className="ai-title">{item.title}</span>
            <button
              className="pr-btn"
              onClick={() =>
                alert(
                  "Ollama Cloud 분석 → MDX 생성 → GitHub PR 생성\n(실제 구현 시 API 라우트로 실행)"
                )
              }
            >
              블로그 PR
            </button>
          </div>
        ))}
      </div>
    </>
  );
}