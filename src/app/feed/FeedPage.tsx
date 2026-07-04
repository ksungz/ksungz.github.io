"use client";

interface Article {
  id: number;
  source: string;
  cat: "dev" | "business" | "youtube" | "social";
  title: string;
  summary: string;
  time: string;
  status: "unread" | "read" | "analyzed" | "posted";
}

const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    source: "GeekNews",
    cat: "dev",
    title: "OpenAI, GPT-5 발표 — 멀티모달 추론 능력 대폭 강화",
    summary:
      "GPT-5는 복잡한 추론 체인을 단일 호출에서 처리하고, 이미지·코드·수식을 혼합 입력으로 받는다. API 단가 60% 인하.",
    time: "3시간 전",
    status: "unread",
  },
  {
    id: 2,
    source: "이안의 주간실리콘밸리",
    cat: "business",
    title: "실리콘밸리 2026 상반기: AI 인프라 투자가 폭증하는 이유",
    summary:
      "데이터센터 건설 붐, GPU 수급 경쟁, 파운드리 전략 변화. 핵심은 '추론 비용이 내려가면 응용이 폭발한다'는 명제.",
    time: "5시간 전",
    status: "analyzed",
  },
  {
    id: 3,
    source: "Velopers",
    cat: "dev",
    title: "토스 백엔드: 대규모 트래픽에서 장애 없는 배포 전략",
    summary:
      "카나리 배포 + 트래픽 기반 자동 롤백 시스템. 실제 장애 사례와 회복 시간 단축 방법 공유.",
    time: "8시간 전",
    status: "read",
  },
  {
    id: 4,
    source: "조코딩",
    cat: "youtube",
    title: "Claude Code로 사이드 프로젝트 1일 만에 완성하기",
    summary:
      "AI 코딩 도구가 바꾼 개발 워크플로우. 프롬프트 설계부터 배포까지 실전 데모.",
    time: "12시간 전",
    status: "posted",
  },
  {
    id: 5,
    source: "조쉬의 뉴스레터",
    cat: "business",
    title: "1인 창업가가 AI로 생산성 3배 끌어올린 방법",
    summary:
      "Cursor + Notion AI + Make.com 조합으로 반복 업무 자동화. 매주 20시간 절약한 실전 사례.",
    time: "1일 전",
    status: "unread",
  },
  {
    id: 6,
    source: "코딩애플",
    cat: "youtube",
    title: "React 19 정식: use() 훅으로 비동기가 달라진다",
    summary: "Suspense와 use()의 조합이 만드는 새로운 데이터 패칭 패턴 해설.",
    time: "1일 전",
    status: "unread",
  },
  {
    id: 7,
    source: "비즈까페",
    cat: "business",
    title: "스타트업 매출 10억 달성: 채널 믹스 전략 분석",
    summary:
      "유료 광고 30%, 오가닉 40%, 파트너십 20%, 기타 10%. 핵심은 LTV/CAC 비율 4:1 유지.",
    time: "2일 전",
    status: "analyzed",
  },
  {
    id: 8,
    source: "GeekNews",
    cat: "dev",
    title: "WebAssembly 2.0: 브라우저에서 네이티브 성능 달성",
    summary:
      "GC 지원, 멀티스레딩, SIMD 확장으로 브라우저에서 네이티브 앱 수준 성능 구현.",
    time: "2일 전",
    status: "read",
  },
  {
    id: 9,
    source: "Velopers",
    cat: "dev",
    title: "당근마켓 트래픽 아키텍처: 마이크로서비스 전환 후기",
    summary:
      "모놀리식에서 마이크로서비스로 전환하며 겪은 문제와 해결 과정. 데이터 일관성이 핵심.",
    time: "3일 전",
    status: "posted",
  },
  {
    id: 10,
    source: "이안의 주간실리콘밸리",
    cat: "business",
    title: "YC W26 버치: AI 에이전트가 가장 많이 뽑힌 배치",
    summary:
      "이번 배치의 70%가 AI 에이전트 관련. 특히 B2B 워크플로우 자동화에 집중.",
    time: "3일 전",
    status: "unread",
  },
];

const STATUS_LABELS: Record<string, string> = {
  unread: "안 읽음",
  read: "읽음",
  analyzed: "분석됨",
  posted: "포스팅됨",
};

interface FeedPageProps {
  onOpenReader: (id: number) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  catFilter: string;
  setCatFilter: (c: string) => void;
}

export function FeedPage({
  onOpenReader,
  statusFilter,
  setStatusFilter,
  catFilter,
  setCatFilter,
}: FeedPageProps) {
  const filtered = MOCK_ARTICLES.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (catFilter !== "all" && a.cat !== catFilter) return false;
    return true;
  });

  return (
    <>
      {/* 헤더 */}
      <div className="feed-header">
        <h1>📖 Info Feed</h1>
        <div className="feed-filters">
          {[
            { key: "all", label: "전체" },
            { key: "unread", label: "안 읽음" },
            { key: "analyzed", label: "분석됨" },
            { key: "posted", label: "포스팅됨" },
          ].map((f) => (
            <button
              key={f.key}
              className={`filter-pill ${statusFilter === f.key ? "active" : ""}`}
              onClick={() => setStatusFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="feed-cats">
          {[
            { key: "all", label: "전체 소스" },
            { key: "dev", label: "개발" },
            { key: "business", label: "비즈니스" },
            { key: "youtube", label: "YouTube" },
          ].map((c) => (
            <button
              key={c.key}
              className="cat-pill"
              data-cat={c.key}
              onClick={() => setCatFilter(c.key)}
              style={
                catFilter === c.key
                  ? { outline: "2px solid #fff", outlineOffset: "1px" }
                  : {}
              }
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 피드 리스트 */}
      <div className="feed-list">
        {filtered.length === 0 && (
          <div className="feed-empty">필터 조건에 맞는 글이 없습니다.</div>
        )}
        {filtered.map((a) => (
          <div
            key={a.id}
            className="feed-card"
            onClick={() => onOpenReader(a.id)}
          >
            <div className="feed-card-meta">
              <span className={`source-badge ${a.cat}`}>{a.source}</span>
              <span className="card-time">{a.time}</span>
              <span className={`status-badge status-${a.status}`}>
                {STATUS_LABELS[a.status]}
              </span>
            </div>
            <h3>{a.title}</h3>
            <p className="feed-card-summary">{a.summary}</p>
          </div>
        ))}
      </div>
    </>
  );
}