"use client";

import { useState } from "react";

const READER_DATA: Record<
  number,
  {
    title: string;
    source: string;
    cat: "dev" | "business" | "youtube" | "social";
    sourceUrl: string;
    body: { paragraphs: string[] };
    analysis?: {
      insights: string[];
      angle: string;
    };
    status: "unread" | "read" | "analyzed" | "posted";
  }
> = {
  1: {
    title: "OpenAI, GPT-5 발표 — 멀티모달 추론 능력 대폭 강화",
    source: "GeekNews",
    cat: "dev",
    sourceUrl: "https://news.hada.io/topic?id=1",
    body: {
      paragraphs: [
        "OpenAI가 GPT-5를 정식 발표했다. 가장 큰 변화는 복잡한 추론 체인을 단일 API 호출로 처리할 수 있게 된 점이다. 이전 모델에서는 3~5단계로 나누어 호출해야 했던 복잡한 문제를 한 번에 해결한다.",
        "이미지, 코드, 수식을 혼합 입력으로 받을 수 있어, 기술 문서 분석이나 UI 디버깅 같은 작업에서 활용도가 크게 높아진다. API 단가도 기존 GPT-4o 대비 60% 인하됐다.",
        "경쟁사인 Anthropic도 Claude 4의 가격 인하로 대응 중이며, 추론 비용 경쟁이 본격화하고 있다.",
      ],
    },
    status: "unread",
  },
  2: {
    title: "실리콘밸리 2026 상반기: AI 인프라 투자가 폭증하는 이유",
    source: "이안의 주간실리콘밸리",
    cat: "business",
    sourceUrl: "https://ianpark.vc/p/ai-infra-2026",
    body: {
      paragraphs: [
        "2026년 상반기 실리콘밸리에서 가장 뜨거운 주제는 단 하나다: AI 인프라에 얼마나 투자할 것인가.",
        "NVIDIA의 데이터센터 매출은 전년 대비 3배 증가했고, AWS·Azure·GCP 모두 GPU 클러스터 확장에 수십억 달러를 쏟고 있다. 핵심 질문은 '추론 비용이 내려가면 응용이 폭발할 것인가'다.",
        "OpenAI의 GPT-5 발표 이후 추론 API 단가가 60% 하락했다. Anthropic도 곧 이어갈 것으로 보인다. 비용이 내려가면 중소기업과 개인 개발자가 AI를 본격적으로 제품에 녹이기 시작한다.",
        "실제로 이미 Cursor, Replit, Vercel AI SDK 같은 도구들이 저렴해진 API 위에서 빠르게 성장하고 있다. 인프라가 먼저고, 응용이 다음이다. 이 순서는 변하지 않는다.",
      ],
    },
    analysis: {
      insights: [
        "데이터센터 투자가 3배 증가하며, 추론 비용 하락이 응용 폭발의 핵심 변수",
        "NVIDIA 매출 3배 성장 → GPU 수급 경쟁 본격화",
        "클라우드 3사 모두 GPU 클러스터 확장에 수십억 달러 투자 중",
      ],
      angle:
        "추론 비용이 내려가면 AI 응용이 폭발한다 — 인프라 투자가 만드는 선순환",
    },
    status: "analyzed",
  },
  3: {
    title: "토스 백엔드: 대규모 트래픽에서 장애 없는 배포 전략",
    source: "Velopers",
    cat: "dev",
    sourceUrl: "https://www.velopers.kr/toss-deploy",
    body: {
      paragraphs: [
        "토스는 카나리 배포와 트래픽 기반 자동 롤백 시스템을 운영한다. 새 버전을 1% 트래픽에만 배포하고, 에러율이 임계치를 넘으면 자동으로 이전 버전으로 롤백한다.",
        "실제 장애 사례: 결제 API 응답 시간이 200ms → 800ms로 악화되자, 자동 롤백이 90초 만에 실행되어 사용자 영향을 최소화했다.",
        "핵심은 배포 파이프라인에 메트릭 기반 휴리스틱을 내장하는 것. 단순한 헬스체크를 넘어 비즈니스 메트릭(결제 성공률, 응답 시간)을 기준으로 롤백을 결정한다.",
      ],
    },
    status: "read",
  },
  4: {
    title: "Claude Code로 사이드 프로젝트 1일 만에 완성하기",
    source: "조코딩",
    cat: "youtube",
    sourceUrl: "https://youtube.com/watch?v=joco-claude",
    body: {
      paragraphs: [
        "AI 코딩 도구가 개발 워크플로우를 근본적으로 바꾸고 있다. Claude Code는 터미널에서 직접 프로젝트 컨텍스트를 읽고, 코드 생성부터 테스트 작성까지 수행한다.",
        "실전 데모: Next.js + Supabase 조합으로 간단한 CRUD 앱을 1시간 만에 완성. 프롬프트 설계가 핵심이다. '이런 화면을 만들어줘'보다 구체적인 컴포넌트 구조와 데이터 모델을 설명해야 품질이 올라간다.",
      ],
    },
    status: "posted",
  },
  5: {
    title: "1인 창업가가 AI로 생산성 3배 끌어올린 방법",
    source: "조쉬의 뉴스레터",
    cat: "business",
    sourceUrl: "https://maily.so/josh/ai-productivity",
    body: {
      paragraphs: [
        "Cursor로 코딩, Notion AI로 문서 작성, Make.com으로 반복 업무 자동화. 이 세 가지 조합으로 매주 20시간을 절약했다.",
        "핵심은 도구가 아니라 워크플로우 설계다. AI 도구를 개별적으로 쓰는 게 아니라, 파이프라인으로 연결해야 효과가 난다.",
        "예: 고객 피드백 수집 → Notion AI로 요약 → Cursor로 기능 구현 → Make.com으로 배포 자동화. 전체 사이클이 2일에서 4시간으로 단축.",
      ],
    },
    status: "unread",
  },
  6: {
    title: "React 19 정식: use() 훅으로 비동기가 달라진다",
    source: "코딩애플",
    cat: "youtube",
    sourceUrl: "https://youtube.com/watch?v=codingapple-react19",
    body: {
      paragraphs: [
        "React 19의 핵심은 use() 훅이다. Suspense와 use()의 조합이 만드는 새로운 데이터 패칭 패턴.",
        "기존 useEffect + useState 조합의 문제(경쟁 조건, 클린업 누락, 로딩 상태 중첩)를 use()가 해결한다. 비동기 값을 동기적으로 다룰 수 있게 된다.",
      ],
    },
    status: "unread",
  },
  7: {
    title: "스타트업 매출 10억 달성: 채널 믹스 전략 분석",
    source: "비즈까페",
    cat: "business",
    sourceUrl: "https://blog.highoutputclub.com/channel-mix",
    body: {
      paragraphs: [
        "매출 10억 달성 스타트업의 채널 믹스: 유료 광고 30%, 오가닉 40%, 파트너십 20%, 기타 10%.",
        "핵심은 LTV/CAC 비율 4:1 유지. 채널별 CAC를 지속 측정하고, LTV가 높은 채널에 예산을 집중한다.",
        "오가닉 40%가 가능한 이유는 콘텐츠 마케팅. 주 1회 인사이트 포스팅이 자연 유입을 만든다.",
      ],
    },
    analysis: {
      insights: [
        "LTV/CAC 4:1 유지가 채널 믹스의 핵심 기준",
        "오가닉 40%는 콘텐츠 마케팅 주 1회 포스팅으로 달성",
        "파트너십 20% — B2B 채널이 매출 안정성에 기여",
      ],
      angle:
        "채널별 CAC 측정이 매출 10억의 출발점 — 감각이 아닌 수치로 채널을 편성하라",
    },
    status: "analyzed",
  },
  8: {
    title: "WebAssembly 2.0: 브라우저에서 네이티브 성능 달성",
    source: "GeekNews",
    cat: "dev",
    sourceUrl: "https://news.hada.io/topic?id=8",
    body: {
      paragraphs: [
        "WebAssembly 2.0이 GC 지원, 멀티스레딩, SIMD 확장을 추가했다. 브라우저에서 네이티브 앱 수준의 성능을 구현할 수 있게 됐다.",
        "Figma, Photoshop Web 버전이 이미 WASM 기반으로 동작 중. 2.0에서는 메모리 관리 부담이 줄어 더 복잡한 앱도 가능해진다.",
      ],
    },
    status: "read",
  },
  9: {
    title: "당근마켓 트래픽 아키텍처: 마이크로서비스 전환 후기",
    source: "Velopers",
    cat: "dev",
    sourceUrl: "https://www.velopers.kr/daangn-msa",
    body: {
      paragraphs: [
        "모놀리식에서 마이크로서비스로 전환하며 겪은 문제와 해결 과정. 데이터 일관성이 가장 큰 과제였다.",
        "분산 트랜잭션 대신 eventual consistency를 채택하고, Saga 패턴으로 보상 트랜잭션을 구현했다.",
      ],
    },
    status: "posted",
  },
  10: {
    title: "YC W26 버치: AI 에이전트가 가장 많이 뽑힌 배치",
    source: "이안의 주간실리콘밸리",
    cat: "business",
    sourceUrl: "https://ianpark.vc/p/yc-w26",
    body: {
      paragraphs: [
        "이번 YC W26 배치의 70%가 AI 에이전트 관련 스타트업. 특히 B2B 워크플로우 자동화에 집중되어 있다.",
        "에이전트가 단순 채팅이 아니라 실제 작업을 수행하는 방향으로 진화. CRM 업데이트, 이메일 분류, 회의록 정리 등 구체적 워크플로우를 자동화한다.",
      ],
    },
    status: "unread",
  },
};

interface ReaderPageProps {
  articleId: number;
  onBack: () => void;
}

export function ReaderPage({ articleId, onBack }: ReaderPageProps) {
  const data = READER_DATA[articleId];
  const [analyzing, setAnalyzing] = useState(false);
  const [blogging, setBlogging] = useState(false);
  const [analyzeDone, setAnalyzeDone] = useState(
    !!data?.analysis
  );
  const [blogDone, setBlogDone] = useState(data?.status === "posted");
  const [archived, setArchived] = useState(false);

  if (!data) {
    return (
      <div className="feed-reader">
        <span className="reader-back" onClick={onBack}>
          ← 목록으로
        </span>
        <div className="feed-empty">글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  if (archived) {
    return (
      <div className="feed-reader">
        <span className="reader-back" onClick={onBack}>
          ← 목록으로
        </span>
        <div className="feed-empty">📦 보관되었습니다.</div>
      </div>
    );
  }

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzeDone(true);
    }, 2000);
  };

  const handleBlog = () => {
    setBlogging(true);
    setTimeout(() => {
      setBlogging(false);
      setBlogDone(true);
    }, 3000);
  };

  return (
    <div className="feed-reader">
      <span className="reader-back" onClick={onBack}>
        ← 목록으로
      </span>

      <div className="reader-header-box">
        <h2>{data.title}</h2>
        <div className="reader-meta">
          <span className={`source-badge ${data.cat}`}>{data.source}</span>
          <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer">
            원문 보기 ↗
          </a>
        </div>
      </div>

      <div className="reader-body">
        {data.body.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {(analyzeDone && data.analysis) && (
          <>
            <h4>분석 결과</h4>
            <div className="analysis-box">
              <h4>✅ AI 분석 완료</h4>
              {data.analysis.insights.map((insight, i) => (
                <div key={i} className="analysis-insight">
                  {insight}
                </div>
              ))}
              <div className="analysis-angle">
                <strong>블로그 각도:</strong> {data.analysis.angle}
              </div>
            </div>
          </>
        )}

        {analyzeDone && !data.analysis && (
          <div className="analysis-box">
            <h4>✅ 분석 완료</h4>
            <div className="analysis-insight">
              분석 결과가 여기에 표시됩니다. (실제 구현 시 Ollama Cloud에서 수신)
            </div>
            <div className="analysis-angle">
              <strong>블로그 각도:</strong> AI 분석으로 도출된 블로그 포스팅 각도가 여기에 표시됩니다.
            </div>
          </div>
        )}
      </div>

      <div className="feed-actions">
        <button
          className="action-btn btn-analyze"
          onClick={handleAnalyze}
          disabled={analyzing || analyzeDone}
        >
          {analyzing
            ? "⏳ 분석 중..."
            : analyzeDone
              ? "✅ 분석 완료"
              : "🔍 분석"}
        </button>
        <button
          className="action-btn btn-blog"
          onClick={handleBlog}
          disabled={blogging || blogDone || !analyzeDone}
        >
          {blogging
            ? "⏳ 초안 작성 중..."
            : blogDone
              ? "✅ PR 생성됨"
              : "✍️ 블로그 초안 PR"}
        </button>
        <button
          className="action-btn btn-archive"
          onClick={() => setArchived(true)}
        >
          📦 보관
        </button>
      </div>
    </div>
  );
}