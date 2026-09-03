import Link from "next/link";
import "./portfolio.css";

/* eslint-disable @next/next/no-img-element */

export default function PortfolioPage() {
  return (
    <div className="pf-workspace">
      <header className="pf-cli-header">
        <a className="pf-cli-brand" href="#top" aria-label="포트폴리오 처음으로">
          <span aria-hidden="true">&gt;_</span> k.sungjae@portfolio:~$
        </a>
        <nav className="pf-cli-nav" aria-label="포트폴리오 탐색">
          <a href="#work">UI Experience</a>
          <a href="#react-work">Work Case</a>
          <a href="#case-study">Public UI</a>
          <a href="#workflow">AI-assisted Work</a>
          <a href="#ai-products">Side Projects</a>
          <a href="/career">Career</a>
          <a href="mailto:k.suzkim@gmail.com">Contact</a>
        </nav>
        <p className="pf-cli-status"><i aria-hidden="true" /> Frontend Engineer | Service UI</p>
      </header>

      <main className="pf-main">

      {/* HERO */}
      <header className="pf-hero" id="top">
        <div className="pf-hero-meta">
          <span>README.md / profile</span>
          <span><i aria-hidden="true" /> updated 2026</span>
        </div>
        <p className="pf-hero-command"><span aria-hidden="true">$</span> whoami</p>
        <h1>김성재</h1>
        <p className="pf-hero-statement">
          운영 중인 서비스 UI를 어떻게 바꾸고 검증했는지,
          오래된 화면을 새로운 구조로 옮기며 어떤 방식으로 진행했는지 정리했습니다.
        </p>
        <div className="pf-hero-actions">
          <a className="pf-scroll-link" href="#work"><span aria-hidden="true">$</span> open ./ui-work <span aria-hidden="true">↓</span></a>
          <Link className="pf-scroll-link" href="/engineering">
            <span aria-hidden="true">$</span> open ./engineering
          </Link>
          <Link
            className="pf-3d-link"
            href="/products"
            aria-label="개인 프로젝트 목록 열기"
          >
            <span aria-hidden="true">◆</span> open ./products
          </Link>
        </div>
      </header>

      <section className="pf-readme-output" aria-label="포트폴리오 소개">
        <div className="pf-readme-header">
          <span>README.md</span>
          <span>3 blocks</span>
        </div>
        <div className="pf-hero-copy">
          <p>
            11번가에서는 모바일웹 상품상세와 앱 WebView UI를 담당하며,
            다양한 상품 유형과 기기, 브라우저 환경에 미치는 영향을 확인하며 변경 사항을 반영했습니다.
            기획, 디자인, 백엔드 담당자와 범위를 맞추고 배포 전후 결과를 확인했습니다.
          </p>
          <p>
            React 기반 신규 UI 블록 약 18개를 구현하고, 공통 스타일을 제외한 운영 블록 SCSS 약 108개를
            컴포넌트 구조에 맞춰 재구성해 상품상세 첫 화면(ATF) 개선에 반영했습니다.
          </p>
          <p>
            하이브랩에서는 네이버, 커머스, 게임 프로젝트의 UI를 개발했고,
            약 3년간 팀장으로 업무 분배, 공수 산정, 품질 관리와
            클라이언트 커뮤니케이션을 담당했습니다.
            AI 도구는 반복 변환과 코드 검토를 보조하는 수단으로 사용하고 최종 결과는 직접 확인합니다.
          </p>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 서비스 UI 개발과 운영 개선 */}
      <section className="pf-section pf-section-dark" id="work">
        <h2 className="pf-section-title">서비스 UI 개발과 운영 개선</h2>
        <p className="pf-section-lead">
          운영 중인 화면을 바꿀 때는 구현뿐 아니라 영향 범위, 협업 대상, 검증 기준과 반영 이후의 결과까지 함께 확인합니다.
          여러 도메인이 맞물리는 화면을 운영하며 변경 단위를 나누고 안정적으로 반영하는 경험을 쌓았습니다.
        </p>
        <div className="pf-poc-grid">
          <div className="pf-poc-card">
            <h4>모바일웹 PDP와 WebView 운영</h4>
            <p>가격, 옵션, 리뷰, 배송, 프로모션처럼 여러 영역이 맞물리는 상품상세 UI를 운영하며 기획, 디자인, 백엔드 담당자와 영향 범위를 확인했습니다.</p>
          </div>
          <div className="pf-poc-card">
            <h4>React UI와 운영 SCSS 내재화</h4>
            <p>신규 UI 블록 약 18개를 구현하고, 별도 저장소의 운영 블록 SCSS 약 108개를 React 구조에 맞춰 재구성해 코드와 스타일을 같은 작업 맥락에서 확인할 수 있도록 했습니다.</p>
          </div>
          <div className="pf-poc-card">
            <h4>Dart Sass와 빌드 개선</h4>
            <p>약 2,384개 SCSS 파일을 Dart Sass로 전환하고 산출물을 직접 확인했습니다. 별도 작업으로 직렬 빌드를 병렬화해 약 24초에서 14초 내외로 줄였습니다.</p>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 실제 서비스에 반영한 구조 개선 */}
      <section className="pf-section" id="react-work">
        <h2 className="pf-section-title">React UI 블록 구현과 운영 SCSS 내재화</h2>
        <p className="pf-section-lead">
          React 컴포넌트와 운영 스타일이 서로 다른 저장소에 있어 변경에 필요한 맥락을 한 번에 확인하기 어려웠습니다.
          파일을 옮기는 데 그치지 않고 React 구조에 맞는 스타일 관리 단위를 다시 정해 실제 서비스에 반영했습니다.
        </p>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>상품상세 첫 화면(ATF) 구조 개선</h3>
            <Link className="pf-project-link" href="/engineering/react-pdp">상세 기록 →</Link>
            <span className="pf-badge pf-badge-live">서비스 반영</span>
          </div>
          <p className="pf-project-desc">
            React 기반 신규 UI 블록 약 18개를 구현했습니다. 공통 스타일을 제외한 기존 운영 블록 SCSS 약 108개는
            React 컴포넌트의 분리 기준에 맞춰 화면 블록 단위로 재구성하고 내재화했습니다.
          </p>
          <div className="pf-detail">
            <h4>판단한 기준</h4>
            <ul>
              <li>기존 SCSS와 React 컴포넌트의 분리 기준이 달라 모든 스타일을 강제로 1:1 매칭하지 않음</li>
              <li>기존 스타일은 화면 블록을 기준으로 관련 SCSS를 모아 관리</li>
              <li>신규 UI는 컴포넌트와 스타일 블록이 대응하도록 구성</li>
              <li>여러 화면이 함께 사용하는 공통 SCSS는 이번 내재화 범위에서 제외</li>
            </ul>
          </div>
          <div className="pf-detail">
            <h4>확인한 결과</h4>
            <ul>
              <li>대상으로 정한 운영 블록 SCSS를 React 저장소로 모두 이동</li>
              <li>컴포넌트 코드와 관련 스타일을 한 저장소에서 확인할 수 있는 구조 마련</li>
              <li>개발자와 AI 보조 도구가 코드와 스타일의 맥락을 함께 확인할 수 있도록 작업 범위 정리</li>
              <li>신규 UI 블록과 내재화된 스타일을 상품상세 첫 화면 개선에 반영</li>
            </ul>
          </div>
          <p className="pf-project-desc">
            운영 블록 약 108개와 신규 UI 블록 약 18개는 분류 기준이 달라 합산하지 않습니다.
            개발 시간이나 오류 감소율도 별도로 측정하지 않아 성과 수치로 사용하지 않습니다.
          </p>
          <div className="pf-chips">
            <span className="pf-chip">React</span>
            <span className="pf-chip">TypeScript</span>
            <span className="pf-chip">SCSS</span>
            <span className="pf-chip">Storybook</span>
            <span className="pf-chip">WebView</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 실무 경험을 바탕으로 만든 UI */}
      <section className="pf-section pf-section-feature" id="case-study">
        <h2 className="pf-section-title">업무 경험을 바탕으로 새로 만든 UI</h2>
        <p className="pf-section-lead">
          상품상세 UI를 운영하며 자주 마주친 상태와 예외 케이스를 바탕으로 옵션 선택 흐름을 새로 설계했습니다.
          색상과 사이즈 조합, 재고, 추가 금액, 모바일 화면 전환을 React 컴포넌트로 구현하고 확인 결과를 Storybook에 남겼습니다.
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
              <li>320px, 390px, 1440px 레이아웃과 모바일 하단 안전 영역 확인</li>
              <li>Storybook 접근성 위반 0건, TypeScript, ESLint, 테스트와 원격 빌드 통과</li>
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
        <h2 className="pf-section-title">개발 업무에 적용한 AI 도구와 규칙</h2>
        <p className="pf-section-lead">
          회사에서 제공한 도구와 승인된 연동을 실제 개발 흐름에 적용하고,
          반복 작업의 규칙과 사람이 최종 판단할 범위를 정리했습니다.
          도구 자체 개발과 제가 담당한 도입, 설정, 운영 범위는 구분해서 기록합니다.
        </p>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>팀에서 함께 쓰는 규칙과 작성 흐름</h3>
            <a className="pf-project-link" href="/case-studies/developer-workflow-ax">Case Study →</a>
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
              <li><strong>Cursor 규칙과 스킬</strong> — UI 개발 기준, Git/PR 흐름, 리뷰 기준을 팀에서 재사용할 수 있게 정리</li>
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
              <li>반복 항목은 AI의 1차 확인 대상으로 옮기고, 맥락, 영향 범위와 예외 케이스는 사람이 최종 검증</li>
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
            <a className="pf-project-link" href="/engineering/pr-review-agent" target="_blank" rel="noopener noreferrer">관련 글 ↗</a>
          </div>
          <p className="pf-project-desc">
            UI 개발 리뷰에서는 BEM 네이밍, SCSS 구조, 접근성 속성, 중복 스타일처럼 반복해서 보는 항목이 많습니다.
            회사에서 제공한 PR Review Agent의 여러 저장소 적용 과정에 참여해 이 항목들을 먼저 확인하도록 구성했습니다.
            Agent 자체를 개발한 것이 아니라 파일 필터, 검토 기준과 실행 방식을 실제 업무에 맞게 설정했습니다.
            설계, 영향 범위, 예외 케이스는 기존 코드 리뷰에서 별도로 확인했습니다.
          </p>
          <div className="pf-detail">
            <h4>한 일</h4>
            <ul>
              <li>여러 저장소의 파이프라인에 AI 리뷰 스텝 적용</li>
              <li>SCSS, HTML 마크업 중심으로 파일 필터링 규칙 설정</li>
              <li>팀의 접근성, BEM, SCSS 컨벤션을 리뷰 기준에 반영</li>
              <li>자동 트리거와 수동 트리거 방식을 나눠 실제 업무 흐름에 맞게 조정</li>
              <li>반복 컨벤션과 설계, 영향 범위 검토 항목을 분리</li>
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

      <hr className="pf-divider" />

      {/* 개인 서비스와 자동화 */}
      <section className="pf-section" id="ai-products">
        <h2 className="pf-section-title">직접 만든 제품과 자동화</h2>
        <p className="pf-section-lead">
          개인 프로젝트에서는 AI 코딩 도구를 활용해 화면, API, DB와 배치 작업을 구현합니다.
          배포 후 동작과 사용 흐름은 직접 확인하며 필요한 기능을 보완하고 있습니다.
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
                Search Console 키워드, GAS, LLM과 API 웹훅을 연결해 공식 가이드를 자동 발행하고 있습니다.
                네이버 블로그와 인스타그램은 초안과 콘텐츠 패키지, 검수 대기열까지만 준비하고 공개는 사람이 결정합니다.
              </p>
              <div className="pf-chips">
                <span className="pf-chip">Next.js</span>
                <span className="pf-chip">Supabase</span>
                <span className="pf-chip">GAS</span>
                <span className="pf-chip">LLM</span>
                <span className="pf-chip">Human-in-the-loop</span>
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
                랜딩 페이지와 상품 등록, 수정 어드민, 통계 화면을 함께 운영하며 노출 상품과 화면 구성을 조정하고 있습니다.
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
                <a className="pf-project-link" href="/engineering/ai-news-agent" target="_blank" rel="noopener noreferrer">관련 글 ↗</a>
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

      {/* FOOTER */}
      <div className="pf-footer">
        <p className="pf-footer-name">김성재</p>
        <p className="pf-footer-copy">
          서비스 UI를 오래 운영하며 쌓은 경험을 바탕으로,
          운영 중인 화면과 오래된 구조를 함께 다룹니다.
        </p>
        <nav className="pf-footer-actions" aria-label="Portfolio 다음 이동">
          <a href="/career">전체 경력 보기 →</a>
          <a href="/products">개인 프로젝트 보기 →</a>
          <a href="mailto:k.suzkim@gmail.com">이메일 보내기 →</a>
        </nav>
      </div>
      </main>

      <div className="pf-statusbar" role="status" aria-label="Portfolio 상태">
        <span><i aria-hidden="true" /> ready</span>
        <span>Frontend | Service UI</span>
        <span>UTF-8</span>
        <span>320, 390, 1440</span>
      </div>
    </div>
  );
}
