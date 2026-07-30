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
          <a href="#workflow">AX Work</a>
          <a href="#ax-doctor">AX Doctor</a>
          <a href="#agents">Agent Systems</a>
          <a href="#ai-products">AI Products</a>
          <a href="#work">UI Background</a>
          <a href="#case-study">UI Case Study</a>
          <a href="/career">Career</a>
          <a href="mailto:k.suzkim@gmail.com">Contact</a>
        </nav>
        <p className="pf-cli-status"><i aria-hidden="true" /> AI Workflow &amp; Product Engineering</p>
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
          13년간 서비스 UI를 개발·운영하며 발견한 반복 업무와 맥락 단절을
          AI Agent와 자동화로 개선하고 있습니다.
        </p>
        <div className="pf-hero-actions">
          <a className="pf-scroll-link" href="#workflow"><span aria-hidden="true">$</span> open ./ax-work <span aria-hidden="true">↓</span></a>
          <Link className="pf-scroll-link" href="/engineering">
            <span aria-hidden="true">$</span> open ./engineering
          </Link>
          <Link
            className="pf-3d-link"
            href="/products"
            aria-label="AX 시스템과 AI 제품 목록 열기"
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
            커머스, 게임, 플랫폼 서비스에서 13년간 UI를 개발하고 운영했습니다.
            복잡한 변경 범위와 검증 기준을 기획, 디자인, 백엔드 담당자와 조율하고
            운영 중인 서비스에 안정적으로 반영해왔습니다.
          </p>
          <p>
            회사에서는 승인된 업무 문맥 연결과 회사 제공 PR Review Agent를
            실제 개발 흐름에 도입·설정했습니다. 반복 항목은 AI가 먼저 확인하고,
            설계와 영향 범위, 예외는 사람이 최종 검증하도록 운영 기준을 정리했습니다.
          </p>
          <p>
            개인 프로젝트는 문제와 범위, 완료 기준을 정한 뒤 AI 에이전트를 활용해 구현하고,
            실제 실행과 테스트로 검증합니다. AX Doctor와 Agent Bridge는 오픈소스로 공개했고,
            Obsidian RAG와 BabyPick은 운영하며 확인한 범위와 아직 해결하지 못한 한계까지 기록하고 있습니다.
          </p>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 서비스 UI 개발과 운영 개선 */}
      <section className="pf-section pf-section-dark" id="work">
        <h2 className="pf-section-title">서비스 UI 개발과 운영 개선</h2>
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
        <h2 className="pf-section-title">업무 경험을 바탕으로 새로 만든 UI</h2>
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
        <h2 className="pf-section-title">개발 업무에 적용한 AI 도구와 규칙</h2>
        <p className="pf-section-lead">
          회사에서 제공한 도구와 승인된 연동을 실제 개발 흐름에 적용하고,
          반복 작업의 규칙과 사람이 최종 판단할 범위를 정리했습니다.
          도구 자체 개발과 제가 담당한 도입·설정·운영 범위는 구분해서 기록합니다.
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
              <li>반복 항목은 AI의 1차 확인 대상으로 옮기고, 맥락·영향 범위·예외 케이스는 사람이 최종 검증</li>
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
            회사에서 제공한 PR Review Agent를 여러 저장소의 파이프라인에 적용해 이 항목들을 먼저 확인하도록 구성했습니다.
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

      <hr className="pf-divider" />

      {/* AI 개발 환경 도입 전 점검 도구 */}
      <section className="pf-section pf-section-dark" id="ax-doctor">
        <h2 className="pf-section-title">AI 개발 환경 도입 전 점검 도구</h2>
        <p className="pf-section-lead">
          개인 AI 작업 환경을 정리하면서 새 설정을 설치하기 전에 기존 도구와 충돌하지 않는지,
          확인하지 못한 영역은 없는지 먼저 점검할 필요가 있었습니다.
          설치기와 분리된 읽기 전용 CLI로 문제와 판정 기준을 다시 정의하고,
          AI 코딩 에이전트를 활용해 구현한 뒤 합성 시나리오와 테스트로 검증했습니다.
        </p>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>AX Doctor</h3>
            <a className="pf-project-link" href="/engineering/ax-doctor-preflight" target="_blank" rel="noopener noreferrer">만든 과정 ↗</a>
            <a className="pf-project-link" href="https://github.com/ksungz/ax-doctor" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <span className="pf-badge pf-badge-live">오픈소스</span>
          </div>
          <p className="pf-project-desc">
            현재 환경에 이미 있는 AI 클라이언트와 공용 자산, 개인·조직 정책, 새로 도입할 대상을 나눠 입력받고
            충돌과 정책 차이, 미확인 범위를 근거와 함께 보고서로 남기는 도구입니다.
            자동 설치나 수정은 하지 않고 도입 진행 여부를 판단하는 데 필요한 정보만 제공합니다.
          </p>
          <figure className="pf-demo-figure">
            <img
              src="/portfolio/ax-doctor-live-demo.png"
              alt="AX Doctor 합성 safe 시나리오가 READY_WITH_CONDITIONS, risky 시나리오가 NOT_READY로 판정된 실제 CLI 실행 화면"
            />
            <figcaption>
              2026년 7월 26일 실제 명령 실행 결과입니다. 두 시나리오 모두 합성 데이터만 사용하며,
              실제 HOME, AI 설정, 인증정보, 프로세스와 네트워크는 읽지 않습니다.
            </figcaption>
          </figure>
          <div className="pf-detail">
            <h4>문제를 나눈 방식</h4>
            <ul>
              <li><strong>Profile</strong> — 허용할 클라이언트와 파일 접근, 네트워크, 비밀정보 보관 기준을 선언</li>
              <li><strong>Target manifest</strong> — 새 패키지가 만들거나 바꾸려는 파일과 설정을 실행 없이 기술</li>
              <li><strong>Read-only preflight</strong> — 승인된 범위만 조사하고 현재 상태와 도입 이후 상태를 비교</li>
              <li><strong>Evidence report</strong> — 판정뿐 아니라 근거, 검사 범위와 확인하지 못한 항목을 함께 기록</li>
            </ul>
          </div>
          <div className="pf-detail">
            <h4>현재 검증한 범위</h4>
            <ul>
              <li>Codex, Claude와 공용 자산을 가정한 합성 환경에서 <strong>scope → scan → report</strong> 흐름 재현</li>
              <li><strong>safe</strong>는 READY_WITH_CONDITIONS, <strong>risky</strong>는 NOT_READY로 판정하는 CLI 데모 구현</li>
              <li>각 실행 결과는 JSON, Markdown, 검사 범위 기록 세 파일로 생성</li>
              <li>미지원 입력은 무시하지 않고 중단하며, 확인하지 못한 항목은 통과로 추정하지 않도록 처리</li>
              <li>macOS arm64에서 전체 테스트 게이트와 종료 코드를 재검증하고, 비정규 출력 경로는 <strong>AXD-OUTPUT-UNSAFE</strong>로 중단되는 동작 확인</li>
              <li>실제 사용자 환경을 읽는 기능이 연결되기 전까지 일반 실행 명령은 의도적으로 비활성화</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Go</span>
            <span className="pf-chip">CLI</span>
            <span className="pf-chip">JSON Schema</span>
            <span className="pf-chip">Threat Modeling</span>
            <span className="pf-chip">Synthetic Test</span>
            <span className="pf-chip">AI Agent</span>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 개인 서비스와 자동화 */}
      <section className="pf-section" id="ai-products">
        <h2 className="pf-section-title">직접 만든 제품과 자동화</h2>
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
                Search Console 키워드, GAS, LLM과 API 웹훅을 연결해 공식 가이드를 자동 발행하고 있습니다.
                네이버 블로그와 인스타그램은 초안·콘텐츠 패키지와 검수 대기열까지만 준비하고 공개는 사람이 결정합니다.
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

      {/* 에이전트 운영 환경 */}
      <section className="pf-section pf-section-dark" id="agents">
        <h2 className="pf-section-title">AI 에이전트 작업 환경</h2>
        <p className="pf-section-lead">
          기존 로그인·구독 환경을 유지한 여러 AI CLI를 한 작업 단위로 연결하고,
          Hermes와 Obsidian RAG를 조합해 개인 작업 환경을 구성했습니다.
          문서 출처와 접근 범위, 작업 로그를 남겨 결과와 실행 과정을 다시 확인할 수 있게 했습니다.
        </p>

        <div className="pf-project" id="agent-bridge">
          <div className="pf-project-header">
            <h3>Agent Bridge</h3>
            <a className="pf-project-link" href="https://github.com/ksungz/agent-bridge" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <span className="pf-badge pf-badge-live">오픈소스</span>
          </div>
          <p className="pf-project-desc">
            Claude Code, Codex와 Gemini CLI를 각각 구독·로그인한 상태에서
            API 키 기반 모델 라우터 없이 하나의 작업에 함께 사용하기 위해 만든 로컬 오케스트레이션 CLI입니다.
            각 도구의 인증과 결제는 그대로 유지하고, 공통 목표와 결정, 실행·리뷰 기록과 인계 문서만 한 작업 폴더에서 관리합니다.
          </p>
          <figure className="pf-demo-figure">
            <img
              src="/portfolio/agent-bridge-live-demo.png"
              alt="Agent Bridge가 공개 샘플 작업을 만들고 로그인된 Codex CLI의 실행 기록과 handoff 문서를 생성한 실제 화면"
            />
            <figcaption>
              사용자 파일이 없는 공개 샘플 작업에서 로그인된 Codex CLI를 실제 연결했습니다.
              Agent Bridge는 실행 결과를 작업 폴더에 기록하고 다음 도구가 이어갈 handoff 문서를 생성합니다.
            </figcaption>
          </figure>
          <div className="pf-detail">
            <h4>만든 이유</h4>
            <ul>
              <li>각각 로그인된 로컬 CLI를 한 작업 안에서 선택해 실행</li>
              <li>다음 에이전트에게 요청과 이전 결정을 다시 설명하는 과정 축소</li>
              <li>여러 에이전트의 실행 결과와 리뷰를 비교 가능한 기록으로 보존</li>
              <li>API 프록시나 구독 우회 없이 기존 도구의 실행 환경 유지</li>
            </ul>
          </div>
          <div className="pf-detail">
            <h4>현재 구현 범위</h4>
            <ul>
              <li><strong>Task workspace</strong> — 목표, 공통 맥락, 결정과 실행 기록을 파일로 관리</li>
              <li><strong>CLI adapter</strong> — 명령어 기반 AI 도구를 JSON 설정으로 연결</li>
              <li><strong>Review</strong> — 여러 에이전트에 같은 검토 요청을 실행하고 결과 기록</li>
              <li><strong>Handoff</strong> — 다음 에이전트가 이어갈 목표, 결정과 최근 실행을 문서로 생성</li>
              <li>공개 GitHub 설치부터 Codex CLI 실행과 handoff 생성을 재검증하고, 기록에 포함된 홈 경로를 <strong>v0.1.1</strong>에서 마스킹</li>
              <li>컨텍스트 자동 압축이나 에이전트별 파일 선별은 아직 구현하지 않음</li>
            </ul>
          </div>
          <div className="pf-chips">
            <span className="pf-chip">Node.js</span>
            <span className="pf-chip">TypeScript</span>
            <span className="pf-chip">CLI</span>
            <span className="pf-chip">Multi-Agent</span>
            <span className="pf-chip">Handoff</span>
            <span className="pf-chip">MIT</span>
          </div>
        </div>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>Hermes와 Obsidian RAG를 연결한 작업 환경</h3>
            <a className="pf-project-link" href="/engineering/ai-workspace" target="_blank" rel="noopener noreferrer">초기 구조 ↗</a>
            <a className="pf-project-link" href="/engineering/hermes-agent-runtime" target="_blank" rel="noopener noreferrer">전환 과정 ↗</a>
            <a className="pf-project-link" href="/engineering/obsidian-rag" target="_blank" rel="noopener noreferrer">RAG 글 ↗</a>
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

      {/* FOOTER */}
      <div className="pf-footer">
        <p className="pf-footer-name">김성재</p>
        <p className="pf-footer-copy">
          서비스 UI 개발·운영 경험을 기반으로 문제와 적용 범위를 정하고,
          AI 코딩 에이전트로 구현한 결과를 실제 실행과 테스트로 검증하고 있습니다.
        </p>
        <nav className="pf-footer-actions" aria-label="Portfolio 다음 이동">
          <a href="/career">전체 경력 보기 →</a>
          <a href="mailto:k.suzkim@gmail.com">이메일 보내기 →</a>
        </nav>
      </div>
      </main>

      <div className="pf-statusbar" role="status" aria-label="Portfolio 상태">
        <span><i aria-hidden="true" /> ready</span>
        <span>AI Workflow</span>
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
