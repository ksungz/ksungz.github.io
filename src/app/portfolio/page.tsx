import "./portfolio.css";

export default function PortfolioPage() {
  return (
    <div className="pf-workspace">
      <header className="pf-cli-header">
        <a className="pf-cli-brand" href="#top" aria-label="포트폴리오 처음으로">
          <span aria-hidden="true">&gt;_</span> k.sungjae@portfolio:~$
        </a>
        <nav className="pf-cli-nav" aria-label="포트폴리오 탐색">
          <a href="#work">Work</a>
          <a href="#case-study">Case Study</a>
          <a href="#services">Services</a>
          <a href="#writing">Writing</a>
          <a href="/career">Career</a>
          <a href="mailto:k.suzkim@gmail.com">Contact</a>
        </nav>
        <p className="pf-cli-status"><i aria-hidden="true" /> UI / Frontend</p>
      </header>

      <main className="pf-main">

      {/* HERO */}
      <header className="pf-hero" id="top">
        <div className="pf-hero-meta">
          <span>README.md / profile</span>
          <span><i aria-hidden="true" /> updated · 2026</span>
        </div>
        <p className="pf-hero-command"><span aria-hidden="true">$</span> whoami</p>
        <h1>김성재</h1>
        <p className="pf-hero-statement">
          서비스 UI를 만들고 운영하며,<br className="pf-break-desktop" />{" "}
          복잡한 구조를 꾸준히 개선해왔습니다.
        </p>
        <a className="pf-scroll-link" href="#work"><span aria-hidden="true">$</span> open ./work <span aria-hidden="true">↓</span></a>
      </header>

      <section className="pf-readme-output" aria-label="포트폴리오 소개">
        <div className="pf-readme-header">
          <span>README.md</span>
          <span>3 blocks</span>
        </div>
        <div className="pf-hero-copy">
          <p>
            커머스, 게임, 플랫폼 서비스에서 UI 개발과 운영을 해왔습니다.
            웹 표준, 접근성, 마크업 구조화, SCSS 설계, 반응형 UI 구현을 바탕으로
            서비스 화면의 구조와 유지보수성을 개선해왔습니다.
          </p>
          <p>
            현재는 모바일웹 상품상세처럼 여러 도메인이 맞물리는 화면을 운영하며,
            HTML/SCSS 기반 산출물을 React 환경으로 옮기고 CSS 의존성을 프로젝트 안으로 정리하고 있습니다.
            Storybook과 문서화, 리뷰 기준으로 컴포넌트 단위 검증 흐름도 만들고 있습니다.
          </p>
          <p>
            반복되는 리뷰 항목과 PR 설명, 문서 초안, QA 체크리스트는 AI로 먼저 정리한 뒤 검토해 활용합니다.
            이를 팀에서 재사용할 수 있도록 규칙과 작업 흐름도 함께 정리하고 있습니다.
          </p>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 서비스 UI 운영과 개선 */}
      <section className="pf-section pf-section-dark" id="work">
        <h2 className="pf-section-title"><span>$ cat work.md</span>서비스 UI 운영과 개선</h2>
        <p className="pf-section-lead">
          운영 중인 화면을 바꿀 때는 구현뿐 아니라 영향 범위, 협업 대상, 검증 기준과 반영 이후의 결과까지 함께 확인합니다.
          여러 도메인이 맞물리는 화면을 맡으며 변경 단위를 나누고 안정적으로 반영하는 경험을 쌓았습니다.
        </p>
        <div className="pf-poc-grid">
          <div className="pf-poc-card">
            <h4>모바일웹 PDP 운영</h4>
            <p>가격, 옵션, 리뷰, 배송, 프로모션처럼 여러 도메인이 맞물리는 상품상세 UI를 맡으며 기획·디자인·백엔드와 영향 범위를 확인했습니다.</p>
          </div>
          <div className="pf-poc-card">
            <h4>SCSS 구조와 CSS 의존성 개선</h4>
            <p>2,384개 SCSS 파일을 Dart Sass로 전환하며 CSS 산출물 차이를 확인했습니다. 이후 분산된 CSS를 React 프로젝트 안으로 옮겨 화면 코드와 스타일 변경 맥락을 함께 관리하도록 정리했습니다.</p>
          </div>
          <div className="pf-poc-card">
            <h4>컴포넌트 검증과 문서화</h4>
            <p>Storybook 기반 확인 환경과 기술 문서로 신규 작업자 온보딩, 기존 화면 수정, 컴포넌트 단위 커뮤니케이션에 필요한 기준을 정리했습니다.</p>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 실무 경험을 바탕으로 만든 UI */}
      <section className="pf-section pf-section-feature" id="case-study">
        <h2 className="pf-section-title"><span>$ open ui-case.tsx</span>업무 경험을 바탕으로 새로 만든 UI</h2>
        <p className="pf-section-lead">
          상품상세 UI를 운영하며 자주 마주친 상태와 예외 케이스를 바탕으로 옵션 선택 흐름을 새로 설계했습니다.
          색상·사이즈 조합, 재고, 추가 금액, 모바일 화면 전환을 공개 컴포넌트로 구현하고 확인 결과를 Storybook에 남겼습니다.
        </p>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>상품 옵션 선택 화면</h3>
            <a className="pf-project-link" href="https://ksungz-ui.vercel.app/?path=/story/patterns-commerce-상품-옵션-선택--default" target="_blank" rel="noopener noreferrer">구현 화면 ↗</a>
            <a className="pf-project-link" href="https://ksungz-ui.vercel.app/?path=/story/case-studies-상품-옵션-선택--design-and-verification" target="_blank" rel="noopener noreferrer">설계 기록 ↗</a>
            <a className="pf-project-link" href="https://github.com/ksungz/ksungz-ui" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <span className="pf-badge pf-badge-live">공개</span>
          </div>
          <p className="pf-project-desc">
            색상과 사이즈 조합에 따라 재고와 추가 금액이 달라지는 구매 화면입니다.
            데스크톱에서는 우측 구매 패널로, 모바일에서는 바텀시트로 제공하되 같은 선택 상태와 계산 규칙을 사용합니다.
          </p>

          <div className="pf-case-media">
            <div className="pf-terminal-panel-bar">
              <span>preview/commerce-options</span>
              <span><i aria-hidden="true" /> running</span>
            </div>
            <figure>
              <img className="pf-screenshot" src="/portfolio/ks-ui-product-options-desktop.jpg" alt="데스크톱 상품 옵션 선택 화면" />
              <figcaption className="pf-screenshot-caption">데스크톱 구매 패널</figcaption>
            </figure>
            <figure>
              <img className="pf-screenshot" src="/portfolio/ks-ui-product-options-mobile.jpg" alt="모바일 상품 옵션 선택 바텀시트" />
              <figcaption className="pf-screenshot-caption">모바일 바텀시트</figcaption>
            </figure>
          </div>

          <div className="pf-detail">
            <h4>확인한 상태</h4>
            <ul>
              <li>색상 변경 시 기존 사이즈가 품절이면 선택 해제</li>
              <li>품절, 재고 부족, 옵션 추가 금액, 최대 구매 수량 처리</li>
              <li>필수 옵션 누락 시 오류 메시지와 해당 그룹으로 포커스 이동</li>
              <li>320px·390px·1440px 레이아웃과 모바일 하단 안전 영역 확인</li>
              <li>Storybook 접근성 위반 0건, TypeScript·ESLint·테스트·원격 빌드 통과</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">React 19</span>
            <span className="pf-chip">TypeScript</span>
            <span className="pf-chip">SCSS Modules</span>
            <span className="pf-chip">Storybook</span>
            <span className="pf-chip">Accessibility</span>
            <span className="pf-chip">Vitest</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 회사 안에서 적용한 AI 보조 흐름 */}
      <section className="pf-section pf-section-tinted" id="workflow">
        <h2 className="pf-section-title"><span>$ tail ai-workflow.log</span>개발 업무에 적용한 AI 도구와 규칙</h2>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>팀에서 함께 쓰는 규칙과 작성 흐름</h3>
            <span className="pf-badge pf-badge-running">실무 적용</span>
          </div>
          <p className="pf-project-desc">
            Cursor 규칙과 스킬을 팀의 UI 개발 기준에 맞춰 정리했습니다.
            PR 설명, 커밋 메시지, 작업 계획, 위키 초안, QA 체크리스트처럼 자주 작성하는 산출물에 공통 형식을 적용했고,
            여러 저장소에서 같은 설정을 재사용할 수 있도록 관리와 동기화 흐름을 구성했습니다.
          </p>
          <div className="pf-detail">
            <h4>한 일</h4>
            <ul>
              <li><strong>Cursor 규칙·스킬</strong> — UI 개발 기준, Git/PR 흐름, 리뷰 기준을 팀에서 재사용할 수 있게 정리</li>
              <li><strong>MCP 연동</strong> — 승인된 업무 범위 안에서 Jira, Confluence, 코드 저장소 문맥을 참고하는 흐름 구성</li>
              <li><strong>설정 배포</strong> — 여러 저장소에 흩어진 AI 설정을 한 곳에서 관리하고 동기화하는 방식 구성</li>
              <li><strong>반복 산출물 표준화</strong> — PR 설명, 커밋 메시지, 작업 계획, 위키 초안을 같은 형식으로 생성하도록 정리</li>
              <li><strong>문서화</strong> — 팀원이 따라 쓸 수 있도록 사용 흐름, 예시, 주의사항을 위키로 정리</li>
            </ul>
          </div>
          <div className="pf-detail">
            <h4>바뀐 점</h4>
            <ul>
              <li>개인마다 달랐던 프롬프트와 작성 형식을 팀 공통 규칙으로 정리</li>
              <li>PR, 커밋, 위키, QA 산출물을 일정한 형식의 초안으로 생성</li>
              <li>리뷰 단계에서 맥락, 영향 범위, 예외 케이스 확인에 집중할 수 있도록 반복 작성 작업 축소</li>
              <li>참고할 문맥의 범위와 공개 문서에 남기지 말아야 할 정보를 사용 기준에 포함</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Cursor Rules</span>
            <span className="pf-chip">Skills</span>
            <span className="pf-chip">MCP</span>
            <span className="pf-chip">Jira</span>
            <span className="pf-chip">Confluence</span>
            <span className="pf-chip">Node.js</span>
          </div>
        </div>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>AI PR Review Agent 적용</h3>
            <a className="pf-project-link" href="/tech/pr-review-agent" target="_blank" rel="noopener noreferrer">관련 글 ↗</a>
          </div>
          <p className="pf-project-desc">
            UI 개발 리뷰에서는 BEM 네이밍, SCSS 구조, 접근성 속성, 중복 스타일처럼 반복해서 보는 항목이 많습니다.
            여러 저장소의 파이프라인에 PR diff 기반 AI 리뷰 스텝을 붙여 이 항목들을 먼저 확인하도록 구성했습니다.
            설계, 영향 범위, 예외 케이스는 기존 코드 리뷰에서 별도로 확인했습니다.
          </p>
          <div className="pf-detail">
            <h4>한 일</h4>
            <ul>
              <li>여러 저장소의 파이프라인에 AI 리뷰 스텝 적용</li>
              <li>SCSS, HTML 마크업 중심으로 파일 필터링 규칙 설정</li>
              <li>팀의 접근성, BEM, SCSS 컨벤션을 리뷰 기준에 반영</li>
              <li>자동 트리거와 수동 트리거 방식을 나눠 실제 업무 흐름에 맞게 조정</li>
              <li>반복 컨벤션과 설계·영향 범위 검토 항목을 분리</li>
            </ul>
          </div>
          <div className="pf-detail">
            <h4>운영 기준</h4>
            <ul>
              <li>접근성, BEM, SCSS 규칙처럼 명확한 항목부터 확인</li>
              <li>리뷰 기준을 개인 기억에 의존하지 않고 접근성, BEM, SCSS 규칙으로 명문화</li>
              <li>리뷰 결과는 머지 조건이 아닌 확인 항목으로 제공</li>
              <li>과한 코멘트와 오탐은 규칙을 조정하는 기준으로 기록</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">AI Review</span>
            <span className="pf-chip">CI Pipeline</span>
            <span className="pf-chip">SCSS</span>
            <span className="pf-chip">Accessibility</span>
            <span className="pf-chip">Code Review</span>
          </div>
        </div>

      </section>

      {/* 개인 서비스와 자동화 */}
      <section className="pf-section" id="services">
        <h2 className="pf-section-title"><span>$ ls side-projects/</span>직접 만든 서비스와 자동화</h2>
        <p className="pf-section-lead">
          개인 프로젝트에서는 화면 구현부터 API, DB, 배치 작업과 배포까지 직접 다룹니다.
          서비스와 자동화를 직접 운영하면서 사용 흐름을 확인하고 필요한 기능을 보완하고 있습니다.
        </p>

        <div className="pf-service-grid">
          <div className="pf-service-card">
            <img src="/portfolio/babypick-guide.png" alt="베이비픽 가이드 목록 — 매일 자동 발행된 글이 날짜별로 쌓여 있는 모습" />
            <div>
              <div className="pf-project-header">
                <h3>베이비픽</h3>
                <a className="pf-project-link" href="https://babypick.co.kr" target="_blank" rel="noopener noreferrer">사이트 ↗</a>
                <a className="pf-project-link" href="https://blog.naver.com/babypick_blog" target="_blank" rel="noopener noreferrer">블로그 ↗</a>
                <span className="pf-badge pf-badge-live">운영 중</span>
              </div>
              <p>
                육아용품 가이드와 상품 정보를 함께 제공하는 커머스 서비스입니다.
                Search Console 키워드, GAS, Gemini, API 웹훅을 연결해 매일 콘텐츠를 발행하고 있습니다.
              </p>
              <div className="pf-chips">
                <span className="pf-chip">Next.js</span>
                <span className="pf-chip">Supabase</span>
                <span className="pf-chip">GAS</span>
                <span className="pf-chip">Gemini API</span>
              </div>
            </div>
          </div>

          <div className="pf-service-card">
            <img src="/portfolio/dailypick-mobile.png" alt="데일리픽아이템 — 모바일 랜딩 페이지" />
            <div>
              <div className="pf-project-header">
                <h3>데일리픽아이템</h3>
                <a className="pf-project-link" href="https://dailypickitem.kr" target="_blank" rel="noopener noreferrer">사이트 ↗</a>
                <span className="pf-badge pf-badge-live">운영 중</span>
              </div>
              <p>
                쇼츠 영상에서 소개한 상품을 한곳에서 확인할 수 있도록 만든 서비스입니다.
                랜딩 페이지와 상품 등록·수정 어드민, 통계 화면을 함께 운영하며 노출 상품과 화면 구성을 조정하고 있습니다.
              </p>
              <div className="pf-chips">
                <span className="pf-chip">Next.js 16</span>
                <span className="pf-chip">React 19</span>
                <span className="pf-chip">Tailwind v4</span>
                <span className="pf-chip">Supabase</span>
              </div>
            </div>
          </div>

          <div className="pf-service-card">
            <img src="/portfolio/telegram-1.png" alt="텔레그램 봇 — GeekNews 기사 목록 발송" />
            <div>
              <div className="pf-project-header">
                <h3>텔레그램 뉴스 봇</h3>
                <a className="pf-project-link" href="/tech/ai-news-agent" target="_blank" rel="noopener noreferrer">관련 글 ↗</a>
                <span className="pf-badge pf-badge-running">상시 실행</span>
              </div>
              <p>
                매일 뉴스를 읽고 글로 남기는 과정이 끊기지 않도록 만든 자동화입니다.
                GeekNews 수집, 텔레그램 후보 발송, 기사 선택, AI 분석, 블로그 MDX 초안과 GitHub PR 생성을 하나의 흐름으로 연결했습니다.
              </p>
              <div className="pf-chips">
                <span className="pf-chip">Node.js</span>
                <span className="pf-chip">Telegraf</span>
                <span className="pf-chip">Claude CLI</span>
                <span className="pf-chip">GitHub API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 에이전트 운영 환경 */}
      <section className="pf-section pf-section-dark" id="agents">
        <h2 className="pf-section-title"><span>$ cat agent-workspace.md</span>AI 에이전트 작업 환경</h2>
        <p className="pf-section-lead">
          OpenClaw, Hermes, Obsidian RAG를 조합해 개인 작업 환경을 구성했습니다.
          문서 출처와 접근 범위, 작업 로그를 남겨 결과와 실행 과정을 다시 확인할 수 있게 했습니다.
        </p>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>Hermes와 Obsidian RAG를 연결한 작업 환경</h3>
            <a className="pf-project-link" href="/tech/ai-workspace" target="_blank" rel="noopener noreferrer">초기 구조 ↗</a>
            <a className="pf-project-link" href="/tech/hermes-agent-runtime" target="_blank" rel="noopener noreferrer">전환 과정 ↗</a>
            <a className="pf-project-link" href="/tech/obsidian-rag" target="_blank" rel="noopener noreferrer">RAG 글 ↗</a>
          </div>
          <p className="pf-project-desc">
            OpenClaw로 시작한 개인 에이전트 환경을 Hermes 중심으로 정리하고, Obsidian 문서를 로컬 RAG로 인덱싱했습니다.
            답변에 사용된 문서와 작업 과정을 함께 남겨 이후에도 출처와 실행 내용을 확인할 수 있게 했습니다.
          </p>
          <div className="pf-detail">
            <h4>운영하며 정한 기준</h4>
            <ul>
              <li><strong>문서 출처</strong> — 답변에 사용한 원본 문서를 함께 반환하도록 설계</li>
              <li><strong>접근 범위</strong> — 읽을 수 있는 파일과 실행할 수 있는 도구를 각각 제한</li>
              <li><strong>작업 로그</strong> — 판단 근거, 실패 지점, 다음 액션을 함께 기록</li>
              <li><strong>결과 확인</strong> — 코드, 문서, 체크리스트 초안을 실행 전후에 확인할 수 있도록 기록</li>
              <li><strong>로컬 검색</strong> — 외부 전송 범위와 로컬 처리 범위를 구분</li>
            </ul>
          </div>
          <ObsidianRagDiagram />
          <div className="pf-chips">
            <span className="pf-chip">OpenClaw</span>
            <span className="pf-chip">Hermes Agent</span>
            <span className="pf-chip">Obsidian RAG</span>
            <span className="pf-chip">MCP</span>
            <span className="pf-chip">FastAPI</span>
            <span className="pf-chip">ChromaDB</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 블로그 */}
      <section className="pf-section" id="writing">
        <h2 className="pf-section-title"><span>$ find writing/</span>기술 기록</h2>

        <div className="pf-blog-list">
          <a className="pf-blog-item" href="/tech/pdp-ui" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">모바일웹 상품상세(PDP) 전체 UI 개발 ↗</div>
            <div className="pf-blog-desc">상품상세 화면 운영, 도메인 영향 범위, 모바일 UI 구조를 정리한 기록</div>
          </a>
          <a className="pf-blog-item" href="/tech/react-pdp" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">React 기반 PDP 컴포넌트 개발 ↗</div>
            <div className="pf-blog-desc">HTML/SCSS 기반 산출물을 React 컴포넌트와 CSS Modules 환경으로 옮긴 작업</div>
          </a>
          <a className="pf-blog-item" href="/tech/dart-sass" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">Dart Sass 마이그레이션 ↗</div>
            <div className="pf-blog-desc">대규모 SCSS 전환에서 산출물 차이와 운영 화면 영향을 줄인 방식</div>
          </a>
          <a className="pf-blog-item" href="/tech/cdn-css-series" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">CDN CSS 점진적 내재화 시리즈 ↗</div>
            <div className="pf-blog-desc">외부 CSS 의존성을 React 번들 안으로 단계적으로 옮긴 기록</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-tools" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">AI 기반 개발 환경 구축 ↗</div>
            <div className="pf-blog-desc">팀에서 쓰는 AI 규칙, 스킬, MCP 연동, PR 리뷰 흐름을 정리한 기록</div>
          </a>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* FOOTER */}
      <div className="pf-footer">
        <p className="pf-footer-name">김성재</p>
        <p className="pf-footer-copy">
          서비스 UI를 운영하며 쌓은 경험으로 화면 변경과 검증 흐름을 개선합니다.
        </p>
        <nav className="pf-footer-actions" aria-label="포트폴리오 다음 이동">
          <a href="/career">전체 경력 보기 →</a>
          <a href="mailto:k.suzkim@gmail.com">이메일 보내기 →</a>
        </nav>
      </div>
      </main>

      <div className="pf-statusbar" role="status" aria-label="포트폴리오 상태">
        <span><i aria-hidden="true" /> ready</span>
        <span>UI / Frontend Developer</span>
        <span>UTF-8</span>
        <span>320 · 390 · 1440</span>
      </div>
    </div>
  );
}

function ObsidianRagDiagram() {
  return (
    <div className="pf-diagram">
      <svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Obsidian RAG 검색 레이어 구조" style={{ width: "100%", height: "auto" }}>
        <defs>
          <marker id="ragArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#2457d6" />
          </marker>
          <marker id="ragArrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#2457d6" />
          </marker>
        </defs>

        <rect x="20" y="70" width="130" height="70" rx="8" fill="#f4f6f7" stroke="#2457d6" strokeWidth="1.5" />
        <text x="85" y="98" textAnchor="middle" fill="#2457d6" fontSize="12" fontWeight="700">Obsidian Vault</text>
        <text x="85" y="116" textAnchor="middle" fill="#5b6367" fontSize="9">문서 · 메모 · 작업 기록</text>

        <rect x="205" y="35" width="130" height="46" rx="8" fill="#f4f6f7" stroke="#d8dee1" />
        <text x="270" y="57" textAnchor="middle" fill="#111413" fontSize="11" fontWeight="600">Watcher</text>
        <text x="270" y="70" textAnchor="middle" fill="#5b6367" fontSize="9">변경 감지</text>

        <rect x="205" y="112" width="130" height="46" rx="8" fill="#f4f6f7" stroke="#d8dee1" />
        <text x="270" y="134" textAnchor="middle" fill="#111413" fontSize="11" fontWeight="600">Local Embedding</text>
        <text x="270" y="147" textAnchor="middle" fill="#5b6367" fontSize="9">Ollama</text>

        <rect x="390" y="70" width="130" height="70" rx="8" fill="#f4f6f7" stroke="#2457d6" strokeWidth="1.5" />
        <text x="455" y="98" textAnchor="middle" fill="#2457d6" fontSize="12" fontWeight="700">RAG Server</text>
        <text x="455" y="116" textAnchor="middle" fill="#5b6367" fontSize="9">FastAPI + ChromaDB</text>

        <rect x="570" y="25" width="105" height="36" rx="8" fill="#f4f6f7" stroke="#d8dee1" />
        <text x="622" y="47" textAnchor="middle" fill="#111413" fontSize="10">Claude Code</text>
        <rect x="570" y="86" width="105" height="36" rx="8" fill="#f4f6f7" stroke="#d8dee1" />
        <text x="622" y="108" textAnchor="middle" fill="#111413" fontSize="10">Hermes</text>
        <rect x="570" y="147" width="105" height="36" rx="8" fill="#f4f6f7" stroke="#d8dee1" />
        <text x="622" y="169" textAnchor="middle" fill="#111413" fontSize="10">Codex / CLI</text>

        <line x1="150" y1="92" x2="203" y2="60" stroke="#2457d6" strokeWidth="1.4" markerEnd="url(#ragArrowGreen)" />
        <line x1="150" y1="118" x2="203" y2="135" stroke="#2457d6" strokeWidth="1.4" markerEnd="url(#ragArrowGreen)" />
        <line x1="335" y1="58" x2="388" y2="92" stroke="#2457d6" strokeWidth="1.4" markerEnd="url(#ragArrow)" />
        <line x1="335" y1="135" x2="388" y2="118" stroke="#2457d6" strokeWidth="1.4" markerEnd="url(#ragArrow)" />
        <line x1="520" y1="92" x2="568" y2="43" stroke="#2457d6" strokeWidth="1.2" markerEnd="url(#ragArrow)" />
        <line x1="520" y1="105" x2="568" y2="105" stroke="#2457d6" strokeWidth="1.2" markerEnd="url(#ragArrow)" />
        <line x1="520" y1="118" x2="568" y2="165" stroke="#2457d6" strokeWidth="1.2" markerEnd="url(#ragArrow)" />

        <text x="350" y="196" textAnchor="middle" fill="#5b6367" fontSize="9">
          한 번 인덱싱한 Obsidian 문맥을 여러 에이전트가 같은 방식으로 검색
        </text>
      </svg>
    </div>
  );
}
