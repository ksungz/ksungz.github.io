import "./portfolio.css";

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <div className="pf-hero">
        <h1>김성재</h1>
        <p className="pf-hero-desc">
          오래 운영되는 서비스에서 제품 변경이 느려지는 지점을 찾아,
          화면·운영·협업 도구까지 함께 고치는 개발자입니다.
          <br /><br />
          13년 동안 커머스·게임·플랫폼 UI를 만들고 운영하며, 반복 리뷰와 문서화, 배포 확인, 레거시 변경이 제품 속도를 늦추는 장면을 많이 겪었습니다.
          <br />
          최근에는 이 문제를 작은 자동화와 개발 워크플로우 개선으로 줄이며 Product Engineer 역할로 확장하고 있습니다.
          <br />
          제가 보고 싶은 결과는 새 도구 도입 자체가 아니라, 제품을 더 빨리 바꾸고 더 안전하게 검증하는 흐름입니다.
        </p>
      </div>

      <hr className="pf-divider" />

      {/* 포커스 */}
      <section className="pf-section">
        <h2 className="pf-section-title">요즘 집중하는 것</h2>
        <div className="pf-focus-grid">
          <div className="pf-focus-card">
            <h3>제품 변경의 영향 범위 보기</h3>
            <p>
              PDP처럼 여러 도메인이 맞물리는 화면에서 무엇이 바뀌고 어디까지 확인해야 하는지 먼저 나누는 데 집중합니다.
            </p>
          </div>
          <div className="pf-focus-card">
            <h3>반복 업무를 작업 흐름으로 만들기</h3>
            <p>
              리뷰, 문서화, 작업 정리처럼 매번 반복되는 일을 팀이 같은 기준으로 다시 쓸 수 있게 정리합니다.
            </p>
          </div>
          <div className="pf-focus-card">
            <h3>작게 만들고 지표로 확인하기</h3>
            <p>
              개인 서비스와 자동화 도구를 직접 배포하고, 발행 수·검색 반응·클릭 흐름을 보며 다음 수정을 정합니다.
            </p>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 제품 운영 근거 */}
      <section className="pf-section">
        <h2 className="pf-section-title">제품과 운영을 함께 본 경험</h2>
        <p className="pf-section-lead">
          Product Engineer 역할로 확장할 수 있다고 보는 근거는 AI 도구 경험보다, 오래 운영되는 제품에서 문제를 나누고 끝까지 확인해온 경험에 있습니다.
          화면 구현에만 머무르지 않고 영향 범위, 이해관계자, 검증 기준, 운영 피드백을 같이 보려고 합니다.
        </p>
        <div className="pf-poc-grid">
          <div className="pf-poc-card">
            <h4>모바일웹 PDP 운영</h4>
            <p>가격, 옵션, 리뷰, 배송, 프로모션처럼 여러 도메인이 맞물리는 상품상세 UI를 맡으며 기획·디자인·백엔드와 영향 범위를 확인했습니다.</p>
          </div>
          <div className="pf-poc-card">
            <h4>대규모 레거시 전환</h4>
            <p>2,384개 SCSS 파일 규모의 Dart Sass 전환을 약 3주 동안 진행하며 변경 단위, 빌드 결과, CSS 산출물 차이를 나눠 검증했습니다.</p>
          </div>
          <div className="pf-poc-card">
            <h4>작은 제품 직접 운영</h4>
            <p>Next.js, Supabase, API 웹훅, 배치 자동화를 묶어 개인 서비스를 배포하고 콘텐츠 발행 수와 검색 반응을 보며 계속 수정하고 있습니다.</p>
          </div>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* 회사 안에서 적용한 AI 워크플로우 */}
      <section className="pf-section">
        <h2 className="pf-section-title">회사 안에서 붙여본 AI 워크플로우</h2>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>팀 AI 개발 환경 정리</h3>
            <span className="pf-badge pf-badge-running">실무 적용</span>
          </div>
          <p className="pf-project-desc">
            팀에서 AI 코딩 도구를 쓰기 시작하면, 개인마다 프롬프트와 규칙이 흩어집니다.
            저는 이 문제를 개인 생산성 문제가 아니라 팀 운영 문제로 보고, Cursor 규칙·스킬을 팀 기준으로 정리했습니다.
            PR 설명, 커밋 메시지, 작업 계획, 위키 작성, QA 체크리스트처럼 매번 새로 쓰던 산출물을 먼저 대상으로 잡고,
            저장소별로 같은 기준을 재사용할 수 있는 흐름을 만들었습니다.
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
              <li>AI 사용을 개인별 요령이 아니라 팀에서 재사용 가능한 규칙과 산출물 형식으로 고정</li>
              <li>PR, 커밋, 위키, QA처럼 매번 새로 쓰던 내용을 검토 가능한 초안으로 먼저 만들도록 정리</li>
              <li>사람은 초안 작성보다 맥락 확인, 영향 범위 판단, 예외 케이스 검토에 시간을 쓰도록 역할을 분리</li>
              <li>AI가 참고할 문맥, 사람이 확인할 지점, 공개 문서에 남기지 말아야 할 정보를 함께 정리</li>
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
            이 부분을 사람이 매번 처음부터 확인하지 않도록, 8개 저장소의 파이프라인에 PR diff 기반 AI 리뷰 스텝을 붙였습니다.
            목표는 사람 리뷰를 없애는 것이 아니라, 반복 컨벤션 체크와 사람이 판단해야 하는 설계·영향 범위 검토를 분리하는 것이었습니다.
          </p>
          <div className="pf-detail">
            <h4>한 일</h4>
            <ul>
              <li>8개 저장소의 파이프라인에 AI 리뷰 스텝 적용</li>
              <li>SCSS, HTML 마크업 중심으로 파일 필터링 규칙 설정</li>
              <li>팀의 접근성, BEM, SCSS 컨벤션을 리뷰 기준에 반영</li>
              <li>자동 트리거와 수동 트리거 방식을 나눠 실제 업무 흐름에 맞게 조정</li>
              <li>AI 코멘트를 그대로 믿지 않고, 사람이 확인해야 할 항목과 단순 반복 체크를 분리</li>
            </ul>
          </div>
          <div className="pf-detail">
            <h4>운영 기준</h4>
            <ul>
              <li>반복 컨벤션 체크는 AI가 먼저 확인하고, 사람 리뷰는 구조·영향 범위·예외 판단에 집중하도록 분리</li>
              <li>리뷰 기준을 개인 기억에 의존하지 않고 접근성, BEM, SCSS 규칙으로 명문화</li>
              <li>AI 리뷰 결과를 머지 판단이 아니라 사람이 확인할 체크리스트 초안으로 다루는 방식으로 운영</li>
              <li>과한 코멘트와 오탐은 리뷰 기준을 조정하는 입력으로 보고, 자동 차단보다 사람 검토를 우선</li>
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

      {/* 개인 서비스 실험 */}
      <section className="pf-section">
        <h2 className="pf-section-title">작게 만든 제품 실험</h2>
        <p className="pf-section-lead">
          E2E 제품 감각은 작은 서비스를 직접 만들고 운영하면서 넓히고 있습니다.
          작은 가설을 서비스로 만들고, API·DB·배치·어드민·배포까지 묶어 운영하면서 어떤 지표를 보고 다음 수정을 할지 확인합니다.
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
                검색 유입형 육아용품 가이드가 쌓이면 커머스 진입점을 만들 수 있다는 가설로 시작했습니다.
                Search Console 키워드, GAS, Gemini, API 웹훅을 연결해 매일 4건씩 자동 발행하고, 누적 183건 이상의 콘텐츠 반응을 보며 방향을 조정합니다.
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
                쇼츠 영상에서 상품 랜딩으로 이어지는 전환 흐름을 직접 검증하기 위해 만들었습니다.
                랜딩, 상품 등록·수정 어드민, 통계 확인 화면을 묶어 영상 반응에 따라 노출 상품과 구성을 바꿔봅니다.
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
            <img src="/portfolio/shorts-planner-1.png" alt="쇼츠 플래너 — 영상 분석과 훅 생성 화면" />
            <div>
              <div className="pf-project-header">
                <h3>쇼츠 플래너</h3>
                <span className="pf-badge pf-badge-running">운영 중</span>
              </div>
              <p>
                콘텐츠 제작에서 반복되는 준비 시간을 줄이기 위해 만든 내부 도구입니다.
                레퍼런스 분석, 대본, TTS, 썸네일, 제목·해시태그 초안을 만들고 사람은 최종 편집과 업로드 판단에 집중합니다.
              </p>
              <div className="pf-chips">
                <span className="pf-chip">Next.js</span>
                <span className="pf-chip">Gemini API</span>
                <span className="pf-chip">TTS</span>
                <span className="pf-chip">Vercel</span>
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
                GeekNews 수집, 텔레그램 후보 발송, 기사 선택, AI 분석, 블로그 MDX 초안, GitHub PR 생성을 묶고 사람은 선별과 최종 리뷰를 맡습니다.
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
      <section className="pf-section">
        <h2 className="pf-section-title">개인 에이전트 실험에서 확인한 운영 조건</h2>
        <p className="pf-section-lead">
          이 섹션은 회사 적용 사례가 아니라, AI 워크플로우를 제품 환경에 붙일 때 필요한 조건을 확인한 개인 실험입니다.
          도구 이름보다 문서 출처, 접근 범위, 작업 로그, 사람 검토 지점을 어떻게 남길지가 핵심이라고 봅니다.
        </p>

        <div className="pf-project">
          <div className="pf-project-header">
            <h3>문서·도구·로그가 분리된 작업 환경</h3>
            <a className="pf-project-link" href="/tech/ai-workspace" target="_blank" rel="noopener noreferrer">초기 구조 ↗</a>
            <a className="pf-project-link" href="/tech/hermes-agent-runtime" target="_blank" rel="noopener noreferrer">전환 과정 ↗</a>
            <a className="pf-project-link" href="/tech/obsidian-rag" target="_blank" rel="noopener noreferrer">RAG 글 ↗</a>
          </div>
          <p className="pf-project-desc">
            OpenClaw로 시작한 개인 에이전트 환경을 Hermes 중심으로 정리하고, Obsidian Vault를 로컬 RAG로 인덱싱했습니다.
            초기 기준 202개 문서, 3,045개 청크를 검색 가능하게 만들며, 에이전트가 답을 만들기 전에 어떤 문서를 참고했는지 사람이 다시 확인할 수 있게 했습니다.
          </p>
          <div className="pf-detail">
            <h4>확인한 운영 조건</h4>
            <ul>
              <li><strong>문서 출처</strong> — 답변에 사용한 원본 문서를 함께 반환해 사람이 근거를 확인할 수 있게 설계</li>
              <li><strong>접근 범위</strong> — 에이전트가 읽을 수 있는 파일과 실행할 수 있는 도구를 분리해서 생각해야 함</li>
              <li><strong>작업 로그</strong> — 결과만 남기지 않고 판단 근거, 실패 지점, 다음 액션을 함께 기록해야 재사용 가능함</li>
              <li><strong>사람 검토</strong> — AI 결과는 최종 판단이 아니라 코드, 문서, 체크리스트 초안으로 남겨야 함</li>
              <li><strong>로컬 검색</strong> — 민감한 문맥을 다룰 때는 외부 전송 범위와 로컬 처리 범위를 먼저 나눠야 함</li>
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

      {/* PoC / 실험 */}
      <section className="pf-section">
        <h2 className="pf-section-title">빠른 검증을 반복합니다</h2>
        <p className="pf-section-lead">
          위 서비스 외에도 아이디어가 생기면 1~2일 안에 MVP를 만들어 확인합니다.
          AI 구매 합리화, 국어사전 재가공, 유튜브 댓글 분석, 콘텐츠 제작 내부 도구처럼
          반응이 있는 것은 고도화하고, 없는 것은 빠르게 접어 다음 가설을 테스트합니다.
        </p>
      </section>

      <hr className="pf-divider" />

      {/* 블로그 */}
      <section className="pf-section">
        <h2 className="pf-section-title">관련 글</h2>

        <div className="pf-blog-list">
          <a className="pf-blog-item" href="/tech/ai-tools" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">AI 기반 개발 환경 구축 ↗</div>
            <div className="pf-blog-desc">팀에서 쓰는 AI 규칙, 스킬, MCP 연동, PR 리뷰 흐름을 정리한 기록</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-workspace" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">개인 AI 에이전트 워크스페이스 설계 ↗</div>
            <div className="pf-blog-desc">OpenClaw, Ollama Cloud, Discord, Obsidian을 묶으며 확인한 에이전트 운영 조건</div>
          </a>
          <a className="pf-blog-item" href="/tech/hermes-agent-runtime" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">OpenClaw에서 Hermes로 갈아탄 이유 ↗</div>
            <div className="pf-blog-desc">지시 채널, MCP, RAG, 작업 로그, 사람 검토 단계를 분리해 다시 정리한 과정</div>
          </a>
          <a className="pf-blog-item" href="/tech/obsidian-rag" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">Obsidian RAG — 에이전트가 내 문서를 찾아보게 하기 ↗</div>
            <div className="pf-blog-desc">Obsidian 문서를 로컬 임베딩·ChromaDB·MCP로 연결해 여러 에이전트가 같은 맥락을 검색하는 구조</div>
          </a>
          <a className="pf-blog-item" href="/tech/pr-review-agent" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">AI PR Review Agent 적용 및 운영 ↗</div>
            <div className="pf-blog-desc">반복 리뷰를 AI가 먼저 확인하고 사람이 판단하는 흐름으로 바꾼 작업</div>
          </a>
          <a className="pf-blog-item" href="/tech/ai-news-agent" target="_blank" rel="noopener noreferrer">
            <div className="pf-blog-title">텔레그램 봇으로 만드는 개인 뉴스 에이전트 ↗</div>
            <div className="pf-blog-desc">GeekNews 크롤링 → AI 분석 → 블로그 PR 자동 생성까지</div>
          </a>
        </div>
      </section>

      <hr className="pf-divider" />

      {/* FOOTER */}
      <div className="pf-footer">
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>김성재</p>
        <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 12, lineHeight: 1.7 }}>
          오래 운영되는 제품 UI 경험을 바탕으로 제품 변경 속도와 검증 흐름을 개선합니다.
        </p>
        <p>
          <a href="mailto:k.suzkim@gmail.com">k.suzkim@gmail.com</a>
        </p>
      </div>
    </>
  );
}

function ObsidianRagDiagram() {
  return (
    <div style={{ margin: "20px 0" }}>
      <svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Obsidian RAG 검색 레이어 구조" style={{ width: "100%", height: "auto" }}>
        <defs>
          <marker id="ragArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#7c6ff7" />
          </marker>
          <marker id="ragArrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
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

        <line x1="150" y1="92" x2="203" y2="60" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#ragArrowGreen)" />
        <line x1="150" y1="118" x2="203" y2="135" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#ragArrowGreen)" />
        <line x1="335" y1="58" x2="388" y2="92" stroke="#7c6ff7" strokeWidth="1.4" markerEnd="url(#ragArrow)" />
        <line x1="335" y1="135" x2="388" y2="118" stroke="#7c6ff7" strokeWidth="1.4" markerEnd="url(#ragArrow)" />
        <line x1="520" y1="92" x2="568" y2="43" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#ragArrow)" />
        <line x1="520" y1="105" x2="568" y2="105" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#ragArrow)" />
        <line x1="520" y1="118" x2="568" y2="165" stroke="#7c6ff7" strokeWidth="1.2" markerEnd="url(#ragArrow)" />

        <text x="350" y="196" textAnchor="middle" fill="#64748b" fontSize="9">
          한 번 인덱싱한 Obsidian 문맥을 여러 에이전트가 같은 방식으로 검색
        </text>
      </svg>
    </div>
  );
}
