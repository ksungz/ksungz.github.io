import "./portfolio.css";

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <div className="pf-hero">
        <h1>김성재</h1>
        <p className="pf-hero-desc">
          커머스·게임·플랫폼 서비스에서 다년간 UI 개발을 해왔습니다.
          <br /><br />
          최근에는 이 경험을 AI 개발 환경 쪽으로 넓히고 있습니다. 코드를 대신 써주는 도구보다,
          요구사항을 정리하고 작업을 쪼개고 리뷰와 문서화를 덜어주는{" "}
          <strong>실제 개발 흐름 안의 AI</strong>에 관심이 많습니다.
          <br /><br />
          회사에서는 팀이 같이 쓸 수 있는 AI 규칙과 리뷰 흐름을 만들고,
          개인 프로젝트에서는 에이전트, RAG, 자동화 파이프라인을 직접 만들며 실험하고 있습니다.
        </p>
      </div>

      <hr className="pf-divider" />

      {/* 포커스 */}
      <section className="pf-section">
        <h2 className="pf-section-title">요즘 집중하는 것</h2>
        <div className="pf-focus-grid">
          <div className="pf-focus-card">
            <h3>팀 개발 워크플로우</h3>
            <p>
              AI PR Review Agent와 Cursor 규칙·스킬을 팀 업무에 붙여보고 있습니다.
              반복되는 리뷰, PR 설명, 작업 계획, 위키 초안을 사람이 매번 처음부터 쓰지 않게 만드는 것이 목표입니다.
            </p>
          </div>
          <div className="pf-focus-card">
            <h3>큰 변경을 작게 나누기</h3>
            <p>
              SCSS 전환이나 React 이관처럼 손대기 부담스러운 작업을 작은 단위로 쪼개고,
              반복 수정과 확인은 AI에게 맡기면서 사람이 봐야 할 부분에 시간을 씁니다.
            </p>
          </div>
          <div className="pf-focus-card">
            <h3>잊어버리지 않는 에이전트</h3>
            <p>
              Obsidian, MCP, 로컬 RAG를 연결해 에이전트가 매번 같은 설명을 요구하지 않게 만들고 있습니다.
              문서와 작업 기록을 실제로 찾아 쓰는 쪽에 더 관심이 있습니다.
            </p>
          </div>
        </div>
      </section>

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
            <strong>문제</strong>: 육아용품 정보가 분산돼 있고, 매일 신제품 가이드를 손으로 쓰는 건 확장 불가능했습니다.
            <br /><br />
            <strong>가설</strong>: Search Console 키워드 + GAS + Gemini로 콘텐츠를 자동 생성·발행하면 사람 개입 없이도 유입 기반이 쌓일 것입니다.
            <br /><br />
            <strong>검증</strong>: 도메인 구매부터 쿠팡 파트너스 연동, SEO, 콘텐츠 자동 발행까지 직접 구축해 매일 4건씩 가이드를 발행하고, 유입 키워드를 확인하며 콘텐츠 방향을 조정 중입니다.
            <br /><br />
            <strong>결과</strong>: 수동 운영 대비 주당 약 10시간의 수작업을 줄였고, 누적 183건+의 가이드가 운영되고 있습니다.
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
            <svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#7c6ff7" />
                </marker>
                <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#34d399" />
                </marker>
                <marker id="arrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#64748b" />
                </marker>
              </defs>

              {/* Row 1: Content generation */}
              <text x="10" y="16" fill="#64748b" fontSize="10" fontWeight="600">콘텐츠 자동 생성</text>
              <rect x="10" y="25" width="100" height="44" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="60" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">키워드 분석</text>
              <text x="60" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9">Search Console</text>

              <rect x="140" y="25" width="110" height="44" rx="8" fill="#1a1a24" stroke="#7c6ff7" strokeWidth="1.5" />
              <text x="195" y="45" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="600">GAS + Gemini</text>
              <text x="195" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9">주제 선정 → 글 생성</text>

              <line x1="110" y1="47" x2="138" y2="47" stroke="#7c6ff7" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Row 2: Marketing channels */}
              <text x="10" y="100" fill="#64748b" fontSize="10" fontWeight="600">마케팅 채널 (유입 경로)</text>
              <rect x="10" y="109" width="130" height="44" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="75" y="129" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">/guide 가이드</text>
              <text x="75" y="144" textAnchor="middle" fill="#94a3b8" fontSize="9">구글 SEO · 매일 4건 · 183건+</text>

              <rect x="170" y="109" width="130" height="44" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="235" y="129" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">네이버 블로그</text>
              <text x="235" y="144" textAnchor="middle" fill="#94a3b8" fontSize="9">네이버 SEO · 일 1회</text>

              {/* Arrows from GAS to channels */}
              <path d="M195,69 L195,80 L75,80 L75,107" fill="none" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrow)" />
              <path d="M220,69 L220,80 L235,80 L235,107" fill="none" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrow)" />

              {/* Product: main destination */}
              <rect x="430" y="80" width="160" height="60" rx="12" fill="#1a1a24" stroke="#34d399" strokeWidth="2" />
              <text x="510" y="106" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="700">babypick.co.kr</text>
              <text x="510" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10">육아용품 추천 커머스</text>

              {/* Arrows: channels → product */}
              <path d="M140,131 L380,131 L380,110 L428,110" fill="none" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
              <path d="M300,131 L380,131" fill="none" stroke="#34d399" strokeWidth="1.5" />

              {/* Label on funnel arrow */}
              <text x="370" y="100" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="600">유입</text>

              {/* Feedback loop */}
              <path d="M590,110 L640,110 L640,195 L60,195 L60,155" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowGray)" />
              <text x="350" y="205" textAnchor="middle" fill="#64748b" fontSize="9">성과 확인 → 키워드·콘텐츠 방향 조정</text>
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
            <strong>문제</strong>: 쇼츠 영상에서 전환으로 이어지는 랜딩 페이지를 만들고 싶었는데, 기성 링크인바이오 서비스는 구독이 필요하고 UI 커스텀이 제한적이었습니다.
            <br /><br />
            <strong>가설</strong>: 직접 랜딩 페이지를 만들고 어드민까지 갖추면 영상 → 랜딩 → 쿠팡 제품 구매 전환 흐름을 내가 조율할 수 있습니다.
            <br /><br />
            <strong>검증</strong>: Claude Code로 Next.js 16 + Tailwind v4 기반 랜딩 페이지와 상품 등록·통계 어드민을 직접 구축했습니다.
            <br /><br />
            <strong>결과</strong>: 쇼츠 영상 설명란에 랜딩 링크를 걸어 전환 유도 중이며, 페이지 구조와 상품 노출을 직접 최적화할 수 있습니다.
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
            <strong>문제</strong>: 쇼츠 영상 하나를 만드는 데 레퍼런스 분석, 대본, TTS, 썸네일, 해시태그까지 반복 작업이 많았습니다.
            <br /><br />
            <strong>가설</strong>: Gemini API + Claude Code로 레퍼런스 구조·훅을 분석하고 대본·TTS·SNS 패키지를 자동 생성하면 일일 1편 페이스가 가능합니다.
            <br /><br />
            <strong>검증</strong>: 처음엔 Google AI Studio에서 시작해 Claude Code로 마이그레이션하고 고도화했습니다.
            <br /><br />
            <strong>결과</strong>: 직접 하는 건 영상 편집뿐, 현재 <strong>100편을 발행했습니다</strong>.
          </p>
          <div className="pf-detail">
            <h4>AI 활용 포인트</h4>
            <ul>
              <li>레퍼런스 영상을 Gemini API로 분석 → 구조·훅·전환 포인트 자동 추출</li>
              <li>분석 결과 기반으로 대본 자동 생성 → TTS 변환 → 썸네일 생성</li>
              <li>SNS 패키지(제목·설명·해시태그)까지 원클릭 출력</li>
              <li>출퇴근길 모바일 분석용 페이지도 별도 구축 — 틈틈이 레퍼런스 분석 후 저장</li>
              <li>처음엔 Google AI Studio에서 시작 → Claude Code로 마이그레이션해 지금까지 고도화 중</li>
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
            <strong>문제</strong>: 매일 기술 뉴스를 확인하고 블로그 글로 정리하는 과정이 지속되지 않았습니다.
            <br /><br />
            <strong>가설</strong>: RSS → AI 요약 → 텔레그램 선택 → AI 심층 분석 → GitHub PR이라는 데이터 파이프라인을 만들면 사람은 선별과 리뷰만 하게 됩니다.
            <br /><br />
            <strong>검증</strong>: Node.js + Telegraf + Claude CLI + GitHub API로 매일 08:00 자동 수집·발송 파이프라인을 구축했습니다.
            <br /><br />
            <strong>결과</strong>: 블로그 기술 글을 꾸준히 발행하는 파이프라인이 운영 중입니다.
          </p>
          <div className="pf-detail">
            <h4>실제 동작 흐름</h4>
            <ul>
              <li>매일 08:00 — GeekNews 크롤링</li>
              <li>텔레그램으로 기사 제목 목록 발송</li>
              <li>번호 선택 시 → Claude CLI로 심층 분석 + 지식베이스 저장</li>
              <li>블로그 MDX 초안 생성 → GitHub PR 자동 생성</li>
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

      {/* Hermes 에이전트 런타임 */}
      <section className="pf-section">
        <h2 className="pf-section-title">개인 AI 에이전트 런타임 — Hermes</h2>

        <div className="pf-project">
          <p className="pf-project-desc">
            OpenClaw로 개인 에이전트 환경을 먼저 만들었습니다. Discord에서 작업을 던지고,
            여러 모델을 역할별로 나누고, Obsidian에 작업 기록을 쌓는 방식이었습니다.
            <br /><br />
            쓰다 보니 점점 챗봇이 아니라 작은 작업 환경에 가까워졌습니다.
            지켜야 할 규칙이 늘고, 주기 작업과 작업 로그가 생기고, MCP와 RAG까지 붙으면서
            그냥 돌아가는 것보다 계속 운영할 수 있는가가 더 중요해졌습니다.
            <br /><br />
            그래서 Hermes로 옮기면서 작업 지시, 채널 매핑, MCP 서버, Obsidian RAG, 작업 로그를 다시 정리했습니다.
            모델을 바꾸는 작업이라기보다, 에이전트가 일하는 주변 환경을 다시 정돈한 작업에 가깝습니다.
            <br /><br />
            지금은 작업 지시 → 관련 문서 검색 → 도구 실행 → 로그 기록 → 다음 작업에 반영되는 흐름을 목표로 운영하고 있습니다.
          </p>

          <div className="pf-detail">
            <h4>바꾼 것</h4>
            <ul>
              <li><strong>OpenClaw → Hermes</strong> — 실험 중심 환경을 CLI로 계속 다룰 수 있는 작업 환경으로 전환</li>
              <li><strong>Discord 채널 정리</strong> — 일반 지시, 작업 로그, 아이디어 브리핑을 섞지 않도록 분리</li>
              <li><strong>모델 라우팅</strong> — 코딩, 장문 분석, 한국어 응답, 가벼운 작업을 모델별로 나눠 사용</li>
              <li><strong>MCP + Obsidian RAG</strong> — 에이전트가 프로젝트 문서와 작업 기록을 직접 찾아보게 연결</li>
              <li><strong>운영 작업</strong> — 주기 작업, 로그 저장, 헬스체크, 메모리 정리를 별도 관리 대상으로 분리</li>
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

              {/* Hermes Runtime */}
              <rect x="180" y="50" width="140" height="100" rx="10" fill="#1a1a24" stroke="#7c6ff7" strokeWidth="2" />
              <text x="250" y="80" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">Hermes</text>
              <text x="250" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9">작업 분석</text>
              <text x="250" y="112" textAnchor="middle" fill="#94a3b8" fontSize="9">컨텍스트 로딩</text>
              <text x="250" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9">도구 실행 · 로그 기록</text>

              {/* Model Pool */}
              <rect x="380" y="20" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="43" textAnchor="middle" fill="#e2e8f0" fontSize="10">kimi-k2.7 · 코딩</text>

              <rect x="380" y="64" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="87" textAnchor="middle" fill="#e2e8f0" fontSize="10">qwen3.5 · 한국어</text>

              <rect x="380" y="108" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="131" textAnchor="middle" fill="#e2e8f0" fontSize="10">deepseek-v4 · 분석</text>

              <rect x="380" y="152" width="130" height="36" rx="6" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="445" y="175" textAnchor="middle" fill="#e2e8f0" fontSize="10">gpt-oss · 범용</text>

              <text x="445" y="12" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">Model Pool</text>

              {/* Obsidian - bottom */}
              <rect x="180" y="165" width="140" height="30" rx="6" fill="#1a1a24" stroke="#34d399" strokeWidth="1" />
              <text x="250" y="184" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="600">Obsidian RAG</text>

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
              <img className="pf-screenshot" src="/portfolio/openclaw-discord.png" alt="Hermes 에이전트 런타임 — Discord에서 작업 지시 후 에이전트가 상태 체크하고 응답하는 실제 대화" />
              <p className="pf-screenshot-caption">Discord 작업 지시 → 에이전트 자율 실행</p>
            </div>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Hermes Agent</span>
            <span className="pf-chip">OpenClaw Migration</span>
            <span className="pf-chip">Ollama Cloud</span>
            <span className="pf-chip">Discord Bot</span>
            <span className="pf-chip">Obsidian</span>
            <span className="pf-chip">MCP</span>
            <span className="pf-chip">RAG</span>
          </div>
        </div>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>Obsidian RAG</h3>
            <span className="pf-badge pf-badge-running">로컬 운영</span>
          </div>
          <p className="pf-project-desc">
            Obsidian에는 프로젝트 문서와 작업 기록이 계속 쌓입니다. 문제는 에이전트가 그걸 알아서 찾아보지 못한다는 점이었습니다.
            Claude Code, Codex, Hermes를 번갈아 쓰다 보면 같은 맥락을 계속 다시 설명해야 했습니다.
            <br /><br />
            그래서 Obsidian Vault를 로컬 임베딩으로 인덱싱하고, 검색 서버와 MCP 툴을 붙였습니다.
            어느 에이전트를 쓰든 같은 문서 저장소를 검색하게 만드는 것이 목적이었습니다.
            <br /><br />
            FastAPI 검색 서버, ChromaDB, 로컬 Ollama 임베딩, 파일 변경 감지 watcher, MCP 서버를 구성했습니다.
            초기 인덱싱 기준 202개 문서, 3,045개 청크를 검색 가능하게 만들고, Claude Code·Hermes·CLI에서 같은 문맥을 조회하도록 연결했습니다.
            <br /><br />
            덕분에 Obsidian이 단순한 메모 저장소가 아니라, 에이전트가 작업 전에 참고할 수 있는 검색 레이어가 됐습니다.
          </p>

          <div className="pf-detail">
            <h4>챙긴 부분</h4>
            <ul>
              <li><strong>같은 문서 보기</strong> — Claude Code, Codex, Hermes가 같은 Obsidian 문서를 검색</li>
              <li><strong>로컬 비용 유지</strong> — 임베딩과 벡터 검색은 로컬에서 처리하고, 답변은 각 에이전트가 생성</li>
              <li><strong>자동 갱신</strong> — Markdown 파일이 바뀌면 watcher가 감지해 다시 인덱싱</li>
              <li><strong>출처 확인</strong> — 검색 결과에 원본 문서를 같이 반환해 사람이 다시 확인 가능</li>
            </ul>
          </div>

          <div style={{ margin: "20px 0" }}>
            <svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrowRag" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#7c6ff7" />
                </marker>
                <marker id="arrowRagGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#34d399" />
                </marker>
              </defs>

              <rect x="20" y="70" width="130" height="70" rx="8" fill="#1a1a24" stroke="#34d399" strokeWidth="1.5" />
              <text x="85" y="98" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">Obsidian Vault</text>
              <text x="85" y="116" textAnchor="middle" fill="#94a3b8" fontSize="9">문서 · 메모 · 작업 기록</text>

              <rect x="205" y="35" width="130" height="46" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="270" y="57" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">Watcher</text>
              <text x="270" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">변경 감지</text>

              <rect x="205" y="112" width="130" height="46" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="270" y="134" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">Local Embedding</text>
              <text x="270" y="147" textAnchor="middle" fill="#94a3b8" fontSize="9">Ollama</text>

              <rect x="390" y="70" width="130" height="70" rx="8" fill="#1a1a24" stroke="#7c6ff7" strokeWidth="1.5" />
              <text x="455" y="98" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="700">RAG Server</text>
              <text x="455" y="116" textAnchor="middle" fill="#94a3b8" fontSize="9">FastAPI + ChromaDB</text>

              <rect x="570" y="25" width="105" height="36" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="622" y="47" textAnchor="middle" fill="#e2e8f0" fontSize="10">Claude Code</text>

              <rect x="570" y="86" width="105" height="36" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="622" y="108" textAnchor="middle" fill="#e2e8f0" fontSize="10">Hermes</text>

              <rect x="570" y="147" width="105" height="36" rx="8" fill="#1a1a24" stroke="#2a2a3a" />
              <text x="622" y="169" textAnchor="middle" fill="#e2e8f0" fontSize="10">Codex / CLI</text>

              <line x1="150" y1="92" x2="203" y2="60" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#arrowRagGreen)" />
              <line x1="150" y1="118" x2="203" y2="135" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#arrowRagGreen)" />
              <line x1="335" y1="58" x2="388" y2="92" stroke="#7c6ff7" strokeWidth="1.4" markerEnd="url(#arrowRag)" />
              <line x1="335" y1="135" x2="388" y2="118" stroke="#7c6ff7" strokeWidth="1.4" markerEnd="url(#arrowRag)" />
              <line x1="520" y1="92" x2="568" y2="43" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrowRag)" />
              <line x1="520" y1="105" x2="568" y2="105" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrowRag)" />
              <line x1="520" y1="118" x2="568" y2="165" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#arrowRag)" />

              <text x="350" y="196" textAnchor="middle" fill="#64748b" fontSize="9">
                한 번 인덱싱한 Obsidian 문맥을 여러 에이전트가 같은 방식으로 검색
              </text>
            </svg>
          </div>

          <div className="pf-chips">
            <span className="pf-chip">FastAPI</span>
            <span className="pf-chip">ChromaDB</span>
            <span className="pf-chip">Ollama Embedding</span>
            <span className="pf-chip">MCP</span>
            <span className="pf-chip">watchdog</span>
            <span className="pf-chip">launchd</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* PoC / 실험 */}
      <section className="pf-section">
        <h2 className="pf-section-title">빠른 검증을 반복합니다</h2>
        <p style={{ fontSize: 14, color: "var(--text3)", marginTop: -24 }}>
          위 서비스 외에도 아이디어가 떠오르면 1~2일 안에 MVP를 만들어 검증합니다 —
          AI 구매 합리화, 국어사전 재가공, 유튜브 댓글 분석, 콘텐츠 제작 내부 도구 등.
          반응이 있는 것은 고도화하고, 없는 것은 빠르게 접어 다음 가설을 테스트합니다.
          이 과정이 제품 감각을 만들고, 기술로 문제를 푸는 방식을 단련합니다.
        </p>
      </section>

      <hr className="pf-divider" />

      {/* 블로그 */}
      <section className="pf-section">
        <h2 className="pf-section-title">관련 블로그 글</h2>

        <div className="pf-blog-list">
          <a className="pf-blog-item" href="/tech/ai-workspace" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">개인 AI 에이전트 워크스페이스 설계 ↗</div>
            <div className="pf-blog-desc">OpenClaw 기반 초기 에이전트 아키텍처와 설계 의도</div>
          </a>
          <a className="pf-blog-item" href="/tech/hermes-agent-runtime" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">OpenClaw에서 Hermes로 갈아탄 이유 ↗</div>
            <div className="pf-blog-desc">개인 에이전트 실험을 Discord, MCP, RAG, 작업 로그가 연결된 작업 환경으로 다시 정리한 과정</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-memory" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">AI 에이전트를 위한 Self-Improving 메모리 설계 ↗</div>
            <div className="pf-blog-desc">HOT/WARM/COLD 티어 시스템, 승격·디모션, Corrections 기록 구조</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-hybrid-audit" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">초다중검토 — 멀티 모델 심의 시스템 설계 ↗</div>
            <div className="pf-blog-desc">3개 모델 교차 비판 + 합의 검증 프로세스, 실제 운영 트레이드오프</div>
          </a>
          <a className="pf-blog-item" href="/tech/obsidian-rag" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">Obsidian RAG — 에이전트가 내 문서를 찾아보게 하기 ↗</div>
            <div className="pf-blog-desc">Obsidian 문서를 로컬 임베딩·ChromaDB·MCP로 연결해 여러 에이전트가 같은 맥락을 검색하는 구조</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-news-agent" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">텔레그램 봇으로 만드는 개인 뉴스 에이전트 ↗</div>
            <div className="pf-blog-desc">GeekNews 크롤링 → AI 분석 → 블로그 PR 자동 생성까지, 뉴스 소비를 콘텐츠 생산으로 바꾸는 파이프라인</div>
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
          커머스·게임·플랫폼 서비스에서 다년간 UI 개발<br />
          아이디어 → 검증 → 고도화를 반복하는 사람
        </p>
        <p>
          <a href="mailto:k.suzkim@gmail.com">k.suzkim@gmail.com</a>
        </p>
      </div>
    </>
  );
}
