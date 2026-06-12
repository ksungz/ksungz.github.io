import "./portfolio.css";

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <div className="pf-hero">
        <h1>김성재</h1>
        <p className="pf-hero-desc">
          Gemini로 블로그 자동화를 시작한 이후, AI로 유튜브 쇼츠, 콘텐츠 자동화 도구, 커머스 서비스,
          에이전트 시스템까지 직접 만들어왔습니다.
          <br /><br />
          되는 것도 있었고 안 되는 것도 많았지만,{" "}
          <strong>아이디어가 떠오르면 AI로 바로 만들어보는 것</strong>을 반복하면서
          Google AI Studio → Claude Code → OpenClaw + Ollama Cloud까지 도구도 계속 바꿔왔습니다.
          <br /><br />
          현재는 Claude Code와 개인 멀티 모델 에이전트 시스템으로 기획부터 배포까지 직접 실행합니다.
          <br /><br />
          아래 서비스들은 전부{" "}
          <strong>본업(UI/Frontend 개발) 외 시간에, 상위 기획을 던지고 AI가 코드를 작성하는 방식</strong>으로 만들었습니다.
          초안은 보통 하루 안에 끝나고, 거기에 살을 붙이고 깎는 걸 지금까지 반복하고 있습니다.
        </p>
      </div>

      <hr className="pf-divider" />

      {/* 운영 중인 서비스 */}
      <section className="pf-section">
        <h2 className="pf-section-title">AI로 만들고 운영 중인 서비스</h2>

        {/* 베이비픽 */}
        <div className="pf-project">
          <div className="pf-project-header">
            <h3>베이비픽</h3>
            <a className="pf-project-link" href="https://babypick.co.kr" target="_blank" rel="noopener noreferrer">babypick.co.kr ↗</a>
            <span className="pf-badge pf-badge-live">운영 중</span>
          </div>
          <p className="pf-project-desc">
            육아용품 비교·추천 커머스. 도메인 구매부터 쿠팡 파트너스 연동, SEO, 콘텐츠 자동 발행까지 혼자 구축한 실 수익 서비스.
          </p>
          <div className="pf-detail">
            <h4>AI 활용 포인트</h4>
            <ul>
              <li>전체 코드베이스를 Claude Code로 작성. 기획 의도를 설명하면 페이지 단위로 구현</li>
              <li>GAS + Gemini로 가이드 글 자동 생성 → API 웹훅으로 사이트에 자동 발행 (매일 4건, <strong>누적 183건+</strong>). GAS 자동화는 이전 프로젝트(prompt-archive.site)에서 처음 도입한 이후 계속 활용 중</li>
              <li>쿠팡 상품 검색 → 딥링크 생성 → DB 저장까지 API 하나로 자동화</li>
              <li>네이버 블로그용 제품 추천글도 Gemini로 자동 생성 (일 1회)</li>
              <li>인스타 카드뉴스·블로그 이미지 생성 도구도 별도 제작 (ai-content-tools)</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Next.js</span>
            <span className="pf-chip">TypeScript</span>
            <span className="pf-chip">Supabase</span>
            <span className="pf-chip">Vercel</span>
            <span className="pf-chip">GAS</span>
            <span className="pf-chip">Gemini API</span>
            <span className="pf-chip">Claude Code</span>
          </div>
        </div>

        {/* 데일리픽아이템 */}
        <div className="pf-project">
          <div className="pf-project-header">
            <h3>데일리픽아이템</h3>
            <a className="pf-project-link" href="https://dailypickitem.kr" target="_blank" rel="noopener noreferrer">dailypickitem.kr ↗</a>
            <span className="pf-badge pf-badge-live">운영 중</span>
          </div>
          <p className="pf-project-desc">
            쇼츠 플래너로 만든 쿠팡 제품 리뷰 영상의 랜딩 페이지. 리틀리·인포크 같은 링크인바이오 서비스는 UI 커스텀에 구독이 필요해서, 원하는 대로 자유롭게 만들기 위해 직접 구축.
          </p>
          <div className="pf-detail">
            <h4>AI 활용 포인트</h4>
            <ul>
              <li>Claude Code로 프로젝트 초기 세팅부터 전체 페이지 구현까지 진행</li>
              <li>Next.js 16 + Tailwind v4 + React 19 — 최신 스택을 AI와 함께 빠르게 적용</li>
              <li>어드민 대시보드(상품 등록·수정·삭제, 통계)도 Claude Code로 구축</li>
              <li>쇼츠 플래너 → 리뷰 영상 제작 → 데일리픽아이템으로 유입 유도하는 흐름</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Next.js 16</span>
            <span className="pf-chip">React 19</span>
            <span className="pf-chip">Tailwind v4</span>
            <span className="pf-chip">Supabase</span>
            <span className="pf-chip">Vercel</span>
            <span className="pf-chip">Claude Code</span>
          </div>
        </div>

        {/* 쇼츠 플래너 */}
        <div className="pf-project">
          <div className="pf-project-header">
            <h3>쇼츠 플래너</h3>
            <span className="pf-badge pf-badge-running">운영 중</span>
          </div>
          <p className="pf-project-desc">
            유튜브 쇼츠 제작 파이프라인. 레퍼런스 영상 분석부터 대본·TTS·썸네일·SNS 패키지 생성까지 자동화.
            직접 하는 건 영상 편집뿐.
          </p>
          <div className="pf-detail">
            <h4>AI 활용 포인트</h4>
            <ul>
              <li>레퍼런스 영상을 Gemini API로 분석 → 구조·훅·전환 포인트 자동 추출</li>
              <li>분석 결과 기반으로 대본 자동 생성 → TTS 변환 → 썸네일 생성</li>
              <li>SNS 패키지(제목·설명·해시태그)까지 원클릭 출력</li>
              <li>출퇴근길 모바일 분석용 페이지도 별도 구축 — 틈틈이 레퍼런스 분석 후 저장</li>
              <li>처음엔 Google AI Studio에서 시작 → Claude Code로 마이그레이션 후 지금까지 고도화 중</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Next.js</span>
            <span className="pf-chip">Gemini API</span>
            <span className="pf-chip">Claude Code</span>
            <span className="pf-chip">TTS</span>
            <span className="pf-chip">Vercel</span>
          </div>
        </div>

        {/* 텔레그램 뉴스 봇 */}
        <div className="pf-project">
          <div className="pf-project-header">
            <h3>텔레그램 뉴스 봇</h3>
            <span className="pf-badge pf-badge-running">pm2 상시 실행</span>
          </div>
          <p className="pf-project-desc">
            매일 아침 자동으로 기술 뉴스를 수집·분석·발송하는 개인 자동화 에이전트. 관심 기사를 선택하면 심층 분석 + 블로그 PR까지 자동 생성.
          </p>
          <div className="pf-detail">
            <h4>실제 동작 흐름</h4>
            <ul>
              <li>매일 08:00 — Hacker News Korea RSS 크롤링</li>
              <li>Claude CLI로 기사 요약·분류·관심도 판단</li>
              <li>텔레그램으로 요약 카드 발송</li>
              <li>기사 선택 시 → Claude가 심층 분석 → 블로그 MDX 초안 생성 → GitHub PR 자동 생성</li>
              <li>사람은 PR 리뷰·머지만 하면 블로그에 자동 배포</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Node.js</span>
            <span className="pf-chip">Telegraf</span>
            <span className="pf-chip">Claude CLI</span>
            <span className="pf-chip">GitHub API</span>
            <span className="pf-chip">pm2</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* OpenClaw 에이전트 시스템 */}
      <section className="pf-section">
        <h2 className="pf-section-title">개인 AI 에이전트 시스템 — OpenClaw</h2>

        <div className="pf-project">
          <p className="pf-project-desc">
            원래는 GPT·Claude·Gemini 구독 모델들을 한 공간에서 서로 논쟁시키는 구조를 만들고 싶었는데,
            구독 모델끼리는 API 없이 상호작용이 안 돼서 직렬 형태만 가능했습니다.
            이 한계를 느끼고 OpenClaw + Ollama Cloud를 알게 되면서, API 기반으로 여러 모델을 자유롭게 오케스트레이션하는 현재 구조를 설계했습니다.
          </p>

          <div className="pf-detail">
            <h4>아키텍처</h4>
            <ul>
              <li><strong>Discord</strong> — 작업 지시 입력. 채널별로 프로젝트가 자동 매핑되어 컨텍스트 전환 없이 작업</li>
              <li><strong>OpenClaw Gateway</strong> — 중앙 오케스트레이터. 작업 분석, 모델 라우팅, 서브에이전트 관리</li>
              <li><strong>Ollama Cloud</strong> — 역할별 모델 풀 (kimi-k2.6 메인, qwen3.5 한국어, deepseek-v4 장문 분석 등 5+ 모델)</li>
              <li><strong>Obsidian Vault</strong> — 프로젝트 문서, 작업 지시서, 파일 기반 에이전트 메모리</li>
              <li><strong>MCP</strong> — 파일시스템 접근으로 실제 코드 프로젝트를 읽고 수정</li>
            </ul>
          </div>

          <div className="pf-detail">
            <h4>초다중검토 — 멀티 모델 심의</h4>
            <ul>
              <li>중요한 의사결정에서 3개 모델이 각각 다른 관점(기술/비즈니스/구조)으로 분석</li>
              <li>각 모델이 다른 모델의 초안을 교차 비판 → 수렴 리포트 생성</li>
              <li>합의도 80% 이상이면 확정, 미달이면 재시도(최대 3회), 실패 시 사람 판단</li>
              <li>Ollama Cloud Pro의 동시 실행 3개 제한 → 서브에이전트 순차 spawn으로 안정성 우선 설계</li>
              <li>느리고 토큰도 많이 쓰기 때문에, 되돌리기 어려운 의사결정에만 사용</li>
              <li>단일 모델로는 못 잡는 빈틈을 구조적으로 발견하는 것이 목적</li>
            </ul>
          </div>

          <div className="pf-detail">
            <h4>Self-Improving 메모리</h4>
            <ul>
              <li>에이전트는 세션마다 기억을 잃음 → 파일 기반 메모리로 해결</li>
              <li>HOT(항상 로드, 100줄 이내) / WARM(프로젝트별) / COLD(아카이브) 3단계 티어</li>
              <li>같은 교정이 3회 반복되면 승격 후보 → 사람 확인 후 핵심 메모리에 추가</li>
              <li>30일 미사용 → 디모션 후보, 90일 → 아카이브. 자동 삭제 없이 항상 사람 확인</li>
            </ul>
          </div>

          <div className="pf-chips">
            <span className="pf-chip">OpenClaw</span>
            <span className="pf-chip">Ollama Cloud</span>
            <span className="pf-chip">Discord Bot</span>
            <span className="pf-chip">Obsidian</span>
            <span className="pf-chip">MCP</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* PoC / 실험 */}
      <section className="pf-section">
        <h2 className="pf-section-title">아이디어 → 바로 만들어본 것들</h2>
        <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 24, marginTop: -24 }}>
          &quot;이런 게 있으면 어떨까?&quot; 싶으면 바로 만들어봄. 전부 Claude Code 또는 Gemini API로 구현.
        </p>

        <div className="pf-poc-grid">
          <div className="pf-poc-card">
            <h4>죄책감 제로</h4>
            <p>구매를 AI가 논리적으로 합리화해주는 유머 서비스. Gemini API + 쿠팡 파트너스 연동.</p>
          </div>
          <div className="pf-poc-card">
            <h4>말랑사전</h4>
            <p>표준국어대사전 뜻풀이를 Gemini로 부드럽게 재가공. Next.js + Supabase.</p>
          </div>
          <div className="pf-poc-card">
            <h4>YT Insight</h4>
            <p>유튜브 댓글 수집 → Gemini 분석 → 시청자 반응·FAQ·다음 주제 자동 추출.</p>
          </div>
          <div className="pf-poc-card">
            <h4>AI Content Tools</h4>
            <p>쇼츠 대본·인스타 카드뉴스·블로그 이미지 등 개인 콘텐츠 작업용 내부 도구 모음.</p>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 블로그 */}
      <section className="pf-section">
        <h2 className="pf-section-title">관련 블로그 글</h2>

        <div className="pf-blog-list">
          <a className="pf-blog-item" href="/tech/ai-workspace" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">개인 AI 에이전트 워크스페이스 설계 ↗</div>
            <div className="pf-blog-desc">OpenClaw + Ollama Cloud + Obsidian 전체 아키텍처와 설계 의도</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-memory" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">AI 에이전트를 위한 Self-Improving 메모리 설계 ↗</div>
            <div className="pf-blog-desc">HOT/WARM/COLD 티어 시스템, 승격·디모션, Corrections 기록 구조</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-hybrid-audit" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">초다중검토 — 멀티 모델 심의 시스템 설계 ↗</div>
            <div className="pf-blog-desc">3개 모델 교차 비판 + 합의 검증 프로세스, 실제 운영 트레이드오프</div>
          </a>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* FOOTER */}
      <div className="pf-footer">
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>김성재</p>
        <p>
          <a href="mailto:k.suzkim@gmail.com">k.suzkim@gmail.com</a>
        </p>
      </div>
    </>
  );
}
