import "./portfolio.css";

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <div className="pf-hero">
        <h1>김성재</h1>
        <p className="pf-hero-desc">
          다년간 커머스·게임·플랫폼 서비스에서 UI/Frontend 개발을 해왔습니다.
          <br /><br />
          동시에 개인적으로는{" "}
          <strong>아이디어를 빠르게 만들어보고, 반응이 있으면 고도화하는 방식</strong>으로
          사이드프로젝트를 계속해왔습니다.
          블로그 자동화에서 시작해 커머스, 유튜브 쇼츠, 에이전트 시스템까지 — 검증하고 남은 것들이 아래 서비스들입니다.
          <br /><br />
          현재는 Claude Code와 개인 멀티 모델 에이전트 시스템으로{" "}
          <strong>문제 정의 → 구현 → 배포 → 운영까지 End-to-End로 직접 실행</strong>합니다.
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
            <a className="pf-project-link" href="https://blog.naver.com/babypick_blog" target="_blank" rel="noopener noreferrer">네이버 블로그 ↗</a>
            <span className="pf-badge pf-badge-live">운영 중</span>
          </div>
          <p className="pf-project-desc">
            육아용품 비교·추천 커머스. 도메인 구매부터 쿠팡 파트너스 연동, SEO, 콘텐츠 자동 발행까지 혼자 구축.
            GAS + Gemini 자동화로 사람 개입 없이 매일 콘텐츠가 쌓이는 구조를 만들어, 수동 운영 대비 주당 약 10시간의 작업을 자동화.
            Search Console 데이터를 보면서 유입 키워드를 분석하고, 콘텐츠 방향을 조정하는 사이클을 반복하고 있습니다.
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
          <div style={{ margin: "20px 0" }}>
            <svg viewBox="0 0 700 190" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#7c6ff7" />
                </marker>
                <marker id="arrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#64748b" />
                </marker>
              </defs>
              {/* Left side: input */}
              <rect x="10" y="70" width="110" height="50" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="65" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">Search Console</text>
              <text x="65" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">유입 키워드 확인</text>

              <rect x="150" y="70" width="110" height="50" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="205" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">방향 조정</text>
              <text x="205" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">키워드·주제 선정</text>

              <rect x="290" y="70" width="120" height="50" rx="8" fill="#1a1a24" stroke="#7c6ff7" strokeWidth="1.5" />
              <text x="350" y="92" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="600">GAS + Gemini</text>
              <text x="350" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">콘텐츠 자동 생성</text>

              {/* Branch: two channels */}
              <rect x="460" y="35" width="130" height="44" rx="8" fill="#1a1a24" stroke="#34d399" strokeWidth="1.5" />
              <text x="525" y="55" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">babypick.co.kr</text>
              <text x="525" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">매일 4건 · 누적 183건+</text>

              <rect x="460" y="110" width="130" height="44" rx="8" fill="#1a1a24" stroke="#34d399" strokeWidth="1.5" />
              <text x="525" y="130" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">네이버 블로그</text>
              <text x="525" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">제품 추천글 · 일 1회</text>

              {/* Arrows: linear */}
              <line x1="120" y1="95" x2="148" y2="95" stroke="#7c6ff7" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="260" y1="95" x2="288" y2="95" stroke="#7c6ff7" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Arrows: branch */}
              <path d="M410,85 L435,85 L435,57 L458,57" fill="none" stroke="#7c6ff7" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <path d="M410,105 L435,105 L435,132 L458,132" fill="none" stroke="#7c6ff7" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Label */}
              <text x="445" y="97" textAnchor="middle" fill="#64748b" fontSize="9">멀티채널</text>

              {/* Feedback loop */}
              <path d="M590,79 L640,79 L640,175 L65,175 L65,122" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowGray)" />
              <text x="350" y="187" textAnchor="middle" fill="#64748b" fontSize="9">데이터 기반 피드백 루프</text>
            </svg>
          </div>
          <div className="pf-screenshots">
            <div>
              <img className="pf-screenshot" src="/portfolio/babypick-guide.png" alt="베이비픽 가이드 목록 — 매일 자동 발행된 글이 날짜별로 쌓여 있는 모습" />
              <p className="pf-screenshot-caption">가이드 목록 — 매일 자동 발행</p>
            </div>
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
            쇼츠 영상 설명란에 이 페이지 링크를 걸어 전환 유도 중.
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
          <div className="pf-screenshots pf-screenshots-2">
            <div>
              <img className="pf-screenshot" src="/portfolio/dailypick-mobile.png" alt="데일리픽아이템 — 모바일 랜딩 페이지" />
              <p className="pf-screenshot-caption">모바일 랜딩 페이지</p>
            </div>
            <div>
              <img className="pf-screenshot" src="/portfolio/dailypick-admin.png" alt="데일리픽아이템 — 어드민 대시보드 (통계 + 상품 관리)" />
              <p className="pf-screenshot-caption">어드민 대시보드</p>
            </div>
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
            직접 하는 건 영상 편집뿐. 매일 1편 페이스로 <strong>현재 100편 발행 완료</strong>.
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
          <div className="pf-screenshots pf-screenshots-2">
            <div>
              <img className="pf-screenshot" src="/portfolio/shorts-planner-1.png" alt="쇼츠 플래너 — 영상 업로드, 자동 짜르기, 훅 생성" />
              <p className="pf-screenshot-caption">영상 분석 + 훅 자동 생성</p>
            </div>
            <div>
              <img className="pf-screenshot" src="/portfolio/shorts-planner-2.png" alt="쇼츠 플래너 — TTS, 썸네일, SNS 패키지" />
              <p className="pf-screenshot-caption">TTS + 썸네일 + SNS 패키지</p>
            </div>
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
            이 파이프라인으로 블로그 기술 글을 꾸준히 발행 중.
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
          <div className="pf-screenshots pf-screenshots-4">
            <div>
              <img className="pf-screenshot" src="/portfolio/telegram-1.png" alt="텔레그램 봇 — GeekNews 기사 목록 발송" />
              <p className="pf-screenshot-caption">뉴스 목록 발송</p>
            </div>
            <div>
              <img className="pf-screenshot" src="/portfolio/telegram-2.png" alt="텔레그램 봇 — 번호 선택 후 분석 시작" />
              <p className="pf-screenshot-caption">기사 선택 → 분석 시작</p>
            </div>
            <div>
              <img className="pf-screenshot" src="/portfolio/telegram-3.png" alt="텔레그램 봇 — 심층 분석 결과 + 지식베이스 저장" />
              <p className="pf-screenshot-caption">심층 분석 + 지식베이스 저장</p>
            </div>
            <div>
              <img className="pf-screenshot" src="/portfolio/telegram-4.png" alt="GitHub PR — 봇이 자동 생성한 블로그 포스트 PR" />
              <p className="pf-screenshot-caption">GitHub PR 자동 생성</p>
            </div>
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
            AI 에이전트를 쓰다 보니 반복되는 문제가 있었습니다 — 단일 모델은 자기 답이 맞다고 확신하고, 세션이 끝나면 맥락을 잊음.
            이걸 해결하기 위해 여러 모델이 서로 검증하는 구조와, 세션을 넘어 학습이 쌓이는 메모리 시스템을 직접 설계했습니다.
            실제로 프로젝트 의사결정(아키텍처 선택, 마이그레이션 판단 등)에서 활용 중입니다.
          </p>

          <div className="pf-detail">
            <h4>구조</h4>
            <ul>
              <li><strong>Discord → OpenClaw → Ollama Cloud</strong> — 채널별 프로젝트 매핑, 역할별 모델 5개+ 자동 라우팅</li>
              <li><strong>초다중검토</strong> — 되돌리기 어려운 판단에서 3개 모델이 교차 비판 후 합의 검증. 단일 모델이 놓치는 빈틈을 구조적으로 발견하는 것이 목적</li>
              <li><strong>Self-Improving 메모리</strong> — 파일 기반 3단계 티어(HOT/WARM/COLD). 같은 실수가 반복되면 자동 승격 → 다음 세션부터 반영</li>
              <li><strong>MCP + Obsidian</strong> — 실제 코드 프로젝트를 읽고 수정, 작업 히스토리 축적</li>
            </ul>
          </div>

          <div style={{ margin: "20px 0" }}>
            <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#7c6ff7" />
                </marker>
                <marker id="arrow3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#64748b" />
                </marker>
              </defs>

              {/* Discord */}
              <rect x="20" y="70" width="100" height="60" rx="10" fill="#1a1a24" stroke="#5865F2" strokeWidth="1.5" />
              <text x="70" y="97" textAnchor="middle" fill="#5865F2" fontSize="12" fontWeight="700">Discord</text>
              <text x="70" y="115" textAnchor="middle" fill="#64748b" fontSize="9">작업 지시</text>

              {/* OpenClaw Gateway */}
              <rect x="180" y="50" width="140" height="100" rx="10" fill="#1a1a24" stroke="#7c6ff7" strokeWidth="2" />
              <text x="250" y="80" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">OpenClaw</text>
              <text x="250" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9">작업 분석</text>
              <text x="250" y="112" textAnchor="middle" fill="#94a3b8" fontSize="9">모델 라우팅</text>
              <text x="250" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9">초다중검토 오케스트레이션</text>

              {/* Model Pool */}
              <rect x="380" y="20" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="43" textAnchor="middle" fill="#e2e8f0" fontSize="10">kimi-k2.7 · 코딩</text>

              <rect x="380" y="64" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="87" textAnchor="middle" fill="#e2e8f0" fontSize="10">qwen3.5 · 한국어</text>

              <rect x="380" y="108" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="131" textAnchor="middle" fill="#e2e8f0" fontSize="10">deepseek-v4 · 분석</text>

              <rect x="380" y="152" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="175" textAnchor="middle" fill="#e2e8f0" fontSize="10">gpt-oss · 범용</text>

              <text x="445" y="12" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">Ollama Cloud (5+ 모델)</text>

              {/* Obsidian - bottom */}
              <rect x="180" y="165" width="140" height="30" rx="6" fill="#1a1a24" stroke="#34d399" strokeWidth="1" />
              <text x="250" y="184" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="600">Obsidian — 메모리 축적</text>

              {/* Output */}
              <rect x="560" y="70" width="100" height="60" rx="10" fill="#1a1a24" stroke="#34d399" strokeWidth="1.5" />
              <text x="610" y="95" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">실행 결과</text>
              <text x="610" y="112" textAnchor="middle" fill="#64748b" fontSize="9">코드 수정 · 리포트</text>

              {/* Arrows */}
              <line x1="120" y1="100" x2="178" y2="100" stroke="#7c6ff7" strokeWidth="1.5" markerEnd="url(#arrow2)" />
              <line x1="320" y1="80" x2="378" y2="42" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrow2)" />
              <line x1="320" y1="90" x2="378" y2="82" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrow2)" />
              <line x1="320" y1="110" x2="378" y2="122" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrow2)" />
              <line x1="320" y1="120" x2="378" y2="166" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrow2)" />
              <line x1="510" y1="100" x2="558" y2="100" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow2)" />

              {/* Memory feedback */}
              <line x1="250" y1="150" x2="250" y2="163" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrow3)" />
            </svg>
          </div>
          <div className="pf-screenshots">
            <div>
              <img className="pf-screenshot" src="/portfolio/openclaw-discord.png" alt="OpenClaw — Discord에서 작업 지시 후 에이전트가 상태 체크하고 응답하는 실제 대화" />
              <p className="pf-screenshot-caption">Discord 작업 지시 → 에이전트 자율 실행</p>
            </div>
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
        <h2 className="pf-section-title">그 외 만들어본 것들</h2>
        <p style={{ fontSize: 14, color: "var(--text3)", marginTop: -24 }}>
          위 서비스 외에도 아이디어가 떠오르면 빠르게 만들어보고 검증합니다 —
          AI 구매 합리화 서비스, 국어사전 재가공, 유튜브 댓글 분석, 콘텐츠 제작 내부 도구 등.
          대부분 1~2일 안에 MVP를 만들고, 반응을 보고 유지하거나 접습니다.
        </p>
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
          <a className="pf-blog-item" href="/tech/ai-build-in-a-day" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">AI로 서비스 하나를 하루 만에 만드는 실제 과정 ↗</div>
            <div className="pf-blog-desc">구독 서비스가 싫어서 직접 만든 이야기 — 기획부터 배포까지 하루 워크플로우</div>
          </a>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* FOOTER */}
      <div className="pf-footer">
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>김성재</p>
        <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 12, lineHeight: 1.7 }}>
          커머스·게임·플랫폼 서비스에서 다년간 UI/Frontend 개발<br />
          아이디어 → 검증 → 고도화를 반복하는 사람
        </p>
        <p>
          <a href="mailto:k.suzkim@gmail.com">k.suzkim@gmail.com</a>
        </p>
      </div>
    </>
  );
}
