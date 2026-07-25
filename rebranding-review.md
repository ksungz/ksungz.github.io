# ksungz-blog 리브랜딩 페이지 구성 문서

> 브랜치: `rebrand/product-engineer`
> 작성일: 2026-07-23
> 목적: ChatGPT 검토 요청용 페이지별 구성 및 콘텐츠 정리

---

## 전체 라우트 구조

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | AI Product Engineer 히어로 + Featured Products |
| `/products` | Products | 대표 제품 5개 (Problem → Solution → Stack → Status) |
| `/case-studies` | Case Studies 목록 | 4개 케이스 스터디 링크 |
| `/case-studies/ax-doctor` | AX Doctor Case Study | 7단구 구조 상세 |
| `/case-studies/news-automation` | News Automation Case Study | 7단구 구조 상세 |
| `/case-studies/babypick-ai` | BabyPick AI Case Study | 7단구 구조 상세 |
| `/case-studies/commerce-ai` | Commerce AI Case Study | 7단구 구조 상세 |
| `/engineering` | Engineering 블로그 | 카테고리별 글 목록 (Engineering / AI Engineering / Automation / Other) |
| `/engineering/[slug]` | 개별 포스트 | 기존 /tech/[slug]와 동일 구조 |
| `/career` | Career | 회사별 Summary / Top 3 Achievement / Action / Impact |
| `/about` | About | 접근 방식, 링크 |
| `/portfolio` | 기존 포트폴리오 | CLI 스타일 (PE 톤 문구 교체, 리다이렉트 없이 직접 접근) |
| `/feed` | 기존 피드 리더 | RSS 피드 + AI 분석 스튜디오 (변경 없음) |
| `/three-blog` | 기존 3D 블로그 | Three.js 인터랙티브 (변경 없음) |

### 리다이렉트

- `/tech` → `/engineering` (301)
- `/tech/:slug` → `/engineering/:slug` (301)
- `/tech/digest` → `/engineering?category=digest` (301)
- `/life` → `/about` (301)
- `/portfolio` → 리다이렉트 없음 (직접 접근 유지)

---

## 1. Home (`/`)

### Hero

```
AI Product Engineer

I build AI-powered products
from idea to production.

13년 동안 커머스 서비스를 만들었고,
현재는 AI Agent를 활용해 제품을 기획하고 개발하고 배포하고 운영하고 있습니다.
```

### CTA

- View Products → `/products`
- View GitHub → `https://github.com/ksungz`
- Read Case Studies → `/case-studies`

### Featured Products (5개)

1. **AX Doctor** — AI 개발 환경 도입 전 점검 CLI
   - 기존 설정과 충돌, 권한, 미확인 범위를 읽기 전용으로 진단하는 Go 기반 preflight 도구
   - Tags: Go, CLI, Preflight

2. **News Automation** — 뉴스 선택부터 블로그 PR까지 자동화
   - GeekNews 큐레이션 → AI 분석 → MDX 초안 → GitHub PR 자동 생성 파이프라인
   - Tags: AI Agent, Automation, Telegram Bot

3. **BabyPick AI** — AI 콘텐츠 자동 발행으로 220개+ 가이드 운영
   - 키워드 선택 → AI 생성 → 검증 → 발행 → 블로그·인스타 자동화까지 구축·운영 중
   - Tags: AI Content, Automation, Supabase

4. **Commerce AI** — 커머스 서비스에 AI 도입
   - 2,384개 SCSS 파일 Dart Sass 전환, PR Review Agent 8개 저장소 적용, 반복 작업 자동화
   - Tags: Sass Migration, PR Review Agent, Cursor

5. **OpenClaw Lab** — 다중 AI 에이전트 연결 CLI
   - Claude Code, Codex, Gemini CLI의 작업 맥락과 실행 기록을 공통 관리하는 오픈소스
   - Tags: Open Source, Multi-Agent, MIT

### What I Do (3개 카드)

1. **문제 정의** — 왜 만들었는가부터 시작합니다. 기술 선택보다 문제가 먼저입니다.
2. **AI 활용 구현** — AI Agent로 반복 작업을 줄이고, 사람은 결정과 검증에 집중합니다.
3. **운영과 개선** — 배포로 끝내지 않습니다. 운영 데이터와 피드백으로 다음 반복을 설계합니다.

---

## 2. About (`/about`)

### 소개 글

> 13년 동안 UI를 만들어왔습니다.
> 하지만 지금은 좋은 제품을 빠르게 만드는 것에 더 관심이 있습니다.
>
> AI Agent를 이용해 기획, 개발, 배포, 운영, 자동화를 구축하고 있습니다.
> 커머스 서비스에서 쌓은 UI 개발과 운영 경험을 바탕으로,
> 문제 정의부터 구현, 검증, 운영까지 직접 다루는 Product Engineer로 일하고 있습니다.
>
> 기술보다 Problem Solving, Decision Making, Iteration, Impact를 더 중요하게 생각합니다.
> AI가 판단을 대신하기보다 필요한 맥락을 찾아 초안과 확인 항목을 준비하고,
> 사람은 제품과 사용자에게 영향을 주는 결정에 집중하는 개발 환경을 만들고 있습니다.

### Approach (5개 항목)

- 왜 만들었는가 — 문제 정의가 기술 선택보다 먼저입니다.
- 어떤 문제를 해결했는가 — 반복되는 작업과 맥락 단절을 줄입니다.
- 어떤 선택을 했는가 — 도구 중심이 아니라 역량 중심으로 판단합니다.
- 무엇을 배웠는가 — AI 결과는 초안이고, 최종 판단은 사람이 합니다.
- 다음에는 어떻게 개선할 것인가 — 운영 데이터와 피드백으로 다음 반복을 설계합니다.

### Links

- Products → `/products`
- Career → `/career`
- GitHub → `https://github.com/ksungz`

---

## 3. Products (`/products`)

### 페이지 설명

> 회사 경력보다 대표 제품이 먼저 보여야 합니다.
> 각 제품은 Problem → Solution → Stack → Status 구조로 작성했습니다.

### 제품 1: AX Doctor

- **Tagline**: AI 개발 환경 도입 전 점검 CLI
- **Problem**: 새 AI 도구를 설치하기 전에 기존 설정과 충돌, 권한, 미확인 범위를 확인할 방법이 없었습니다.
- **Solution**: 기존 환경과 도입 대상을 읽기 전용으로 비교해 판단 근거를 남기는 Go 기반 preflight CLI를 만들었습니다.
- **Stack**: Go, JSON Schema, CLI, Synthetic Test
- **Status**: 합성 데모 완료 · public 전환 보류
- **Links**: GitHub(https://github.com/ksungz/ax-doctor)

### 제품 2: News Automation

- **Tagline**: 뉴스 선택부터 블로그 PR까지 자동화 파이프라인
- **Problem**: 매일 기술 뉴스를 읽지만 읽는 데서 끝나고, 며칠 뒤 내용을 다시 찾기 어려웠습니다.
- **Solution**: GeekNews 큐레이션 → 텔레그램 선택 → AI 분석 → MDX 초안 → GitHub PR 자동 생성 파이프라인을 구축했습니다.
- **Stack**: Telegram Bot, AI Agent, MDX, GitHub API
- **Status**: 운영 중 · 10편+ 블로그 초안 생성
- **Links**: 없음

### 제품 3: BabyPick AI

- **Tagline**: AI 콘텐츠 자동 발행으로 220개+ 가이드 운영
- **Problem**: 혼자 서비스 개발과 콘텐츠 작성을 함께 하기에는 시간이 부족했습니다.
- **Solution**: 키워드 선택 → AI 생성 → 형식 검증 → API 발행 → 블로그·인스타 자동화까지 구축하고 운영 중입니다.
- **Stack**: Google Apps Script, Gemini, Ollama, Supabase, Next.js
- **Status**: 운영 중 · 220개+ 가이드, 블로그·인스타 자동화
- **Links**: 사이트(https://babypick.co.kr/guide)

### 제품 4: OpenClaw Lab

- **Tagline**: 다중 AI 에이전트 연결 CLI
- **Problem**: Claude Code, Codex, Gemini CLI를 바꿀 때마다 작업 맥락을 다시 설명해야 했습니다.
- **Solution**: 에이전트 연결 정보를 JSON 어댑터로 분리하고, 작업 맥락과 실행 기록을 공통 관리하는 오픈소스 CLI를 만들었습니다.
- **Stack**: Node.js, CLI, MIT License
- **Status**: 공개 중 · Hermes Agent의 전신
- **Links**: GitHub(https://github.com/ksungz/agent-bridge)

### 제품 5: Commerce AI

- **Tagline**: 커머스 서비스에 AI 도입
- **Problem**: 2,384개 SCSS 파일 전환, 반복 산출물 작성, PR 리뷰 등 반복 작업이 많았습니다.
- **Solution**: Cursor·Claude 기반 변환 스크립트, PR Review Agent 8개 저장소 적용, 커밋·PR·QA 체크리스트 작성 흐름을 정리했습니다.
- **Stack**: Cursor, Claude, Codex, Bitbucket Pipelines, Storybook
- **Status**: 재직 중 · 2,384파일 Sass 전환, PR Review Agent 운영
- **Links**: 없음

---

## 4. Case Studies

### 목록 페이지 (`/case-studies`)

> 기술보다 문제 해결 과정을 보여줍니다.
> Problem → Hypothesis → Architecture → Implementation → Challenges → Result → Next Step.

4개 케이스:

1. AX Doctor — AI 도입 전 점검 도구
2. News Automation — 뉴스 선택부터 블로그 PR까지
3. BabyPick AI — 220개+ 육아 가이드 자동 발행
4. Commerce AI — 2,384개 SCSS 파일 Dart Sass 전환

### Case Study 1: AX Doctor (`/case-studies/ax-doctor`)

- **Problem**: 새로운 AI 도구를 개발 환경에 설치하려면 기존 설정 파일, 환경 변수, 권한, 디스크 용량 등이 충돌할 수 있습니다. 설치 후 충돌이 발생하면 원인 추적에 더 많은 시간이 들고, 최악의 경우 기존 환경이 손상됩니다.
- **Hypothesis**: 도입 대상과 기존 환경을 정적인 프로필로 비교하면, 실행 없이도 충돌 가능성을 사전에 식별할 수 있다. 판정 기준을 명시적으로 정의하고 fail-closed로 설계하면, 알 수 없는 상태를 안전하게 차단할 수 있다.
- **Architecture**: scope → scan → report 3단계 흐름. 각 단계는 독립 실행, 중간 결과 JSON 저장, read-only 설계.
- **Implementation**: Go로 CLI 작성. 환경 프로필을 JSON Schema로 정의. 합성 데모에서 safe=READY_WITH_CONDITIONS, risky=NOT_READY 판정 검증.
- **Challenges**: safe 기준 정의가 가장 어려웠음. fail-closed로 오탐율이 높아질 수 있어 근거를 함께 제시하는 것으로 보완.
- **Result**: 합성 환경에서 scope → scan → report 흐름 정상 동작 확인. 판정과 근거가 보고서로 남음. 현재 합성 데모 단계, public 전환 보류.
- **Next Step**: 실제 환경 프로필 추가, 점검 항목 확장. 규칙 정의를 외부 JSON으로 분리. CI 통합 검토.
- **Tags**: Go, CLI, Preflight, Privacy-by-design, Fail-closed
- **Links**: GitHub(https://github.com/ksungz/ax-doctor)

### Case Study 2: News Automation (`/case-studies/news-automation`)

- **Problem**: 매일 기술 뉴스를 읽지만 읽는 데서 끝나고, 며칠 뒤 내용을 다시 찾기 어려웠습니다. 읽고 정리하는 반복 작업이 지속됐지만, 블로그 글로 만들 시간은 부족했습니다.
- **Hypothesis**: 뉴스 선택과 분석은 AI가 자동화할 수 있지만, 최종 판단은 사람이 담당하면 품질을 유지하면서 반복 작업을 줄일 수 있다. 원문뿐 아니라 커뮤니티 댓글까지 수집해 분석하면, 단순 요약보다 맥락이 있는 글을 만들 수 있다.
- **Architecture**: GeekNews 큐레이션 → 텔레그램 봇 후보 발송 → 번호 선택 → AI 분석(원문 + 커뮤니티 댓글 수집) → MDX 초안 → GitHub PR 자동 생성. Claude CLI 우선, 실패 시 Ollama 폴백. 글 선택과 최종 검수는 사람.
- **Implementation**: 텔레그램 봇으로 후보 뉴스 발송, 번호 선택 시 파이프라인 시작. 원문과 댓글 수집해 AI에 입력. AI가 MDX 초안 작성, GitHub API로 PR 자동 생성. 사람이 검수 후 병합.
- **Challenges**: AI 분석 품질이 입력 데이터 품질에 크게 좌우됨. Claude CLI 실패 시 Ollama 전환 폴백 로직 안정화가 복잡함.
- **Result**: 10편 이상 블로그 초안 생성·운영. 뉴스 선택부터 PR 생성까지 자동화, 사람은 검수와 수정에 집중.
- **Next Step**: 댓글 수집 범위 확대, 품질 가중 평가 로직 추가. 초안 품질 자동 평가 단계 검토.
- **Tags**: AI Agent, Telegram Bot, MDX, GitHub API, Automation

### Case Study 3: BabyPick AI (`/case-studies/babypick-ai`)

- **Problem**: 육아용품 가이드 서비스에 가이드 콘텐츠가 필요했지만, 혼자 서비스 개발과 콘텐츠 작성을 함께 하기에는 시간이 부족했습니다.
- **Hypothesis**: 키워드를 사람이 관리하고, 제목·본문·메타는 AI가 생성하면, 콘텐츠 품질을 유지하면서 발행량을 늘릴 수 있다. 생성 결과를 형식과 금지 표현 기준으로 검사하면, 서비스 품질 기준을 자동으로 유지할 수 있다.
- **Architecture**: Google Apps Script에서 키워드 관리, Gemini/Ollama로 제목·본문·메타 생성. 형식/금지 표현 검사 후 BabyPick API로 발행. 블로그(네이버)와 인스타그램 자동화 포함.
- **Implementation**: GAS로 키워드 관리 인터페이스 구축. 키워드 선택 시 Gemini로 콘텐츠 생성, 실패 시 Ollama 폴백. 형식 규칙과 금지 표현 목록으로 검사. 통과 시 API 발행, 네이버 블로그와 인스타그램에 자동 전송.
- **Challenges**: AI 생성 텍스트에 금지 표현 포함 빈도가 잦음. 문맥 자연스러움 유지하면서 자동 필터링이 어려움. Gemini와 Ollama 출력 품질 차이로 폴백 시 결과 변동 최소화.
- **Result**: 220개 이상 육아 가이드 자동 발행 운영 중. 블로그·인스타 자동화 포함, 단일 키워드에서 다 채널 발행까지 하나의 흐름으로 연결.
- **Next Step**: 키워드 관리 체계화, 발행 결과 모니터링 대시보드 추가. 과거 발행 결과 기반 프롬프트 자동 개선 실험 검토.
- **Tags**: AI Content, Automation, Supabase, Gemini, Ollama
- **Links**: 사이트(https://babypick.co.kr/guide)

### Case Study 4: Commerce AI (`/case-studies/commerce-ai`)

- **Problem**: 커머스 서비스에 2,384개 SCSS 파일이 있었고, Dart Sass로 전환해야 했습니다. 사람이 수작업으로 전환하면 몇 달이 걸릴 수 있는 규모. 반복 산출물 작성, PR 리뷰 등 반복 작업도 많았음.
- **Hypothesis**: AI 도구(Cursor, Claude)를 활용해 변환 규칙을 학습시키면, 반복적인 SCSS 변환을 빠르게 수행할 수 있다. PR 리뷰 중 반복적인 체크 항목을 AI가 담당하면, 사람은 예외 판단과 최종 검증에 집중할 수 있다.
- **Architecture**: Cursor와 Claude를 활용해 SCSS 변환 스크립트 작성·실행. 예외 판단과 최종 검증은 사람. PR Review Agent 8개 저장소 적용. 커밋·PR·QA 체크리스트 작성 흐름 표준화.
- **Implementation**: Cursor와 Claude를 함께 활용해 SCSS 파일을 분석하고 변환 규칙을 만들었습니다. 변환 스크립트를 단계별로 실행하면서 오류 발생 시 규칙 수정 루프 반복. PR Review Agent는 커밋 메시지, PR 설명, QA 체크리스트 자동 작성 흐름으로 구성, 8개 저장소에 순차 적용.
- **Challenges**: 2,384개 파일 한 번에 변환 시 오류 누적 추적 어려움. 작은 단위로 나누되 단위 크기 결정이 어려웠음. 저장소마다 컨벤션 달라 각각 조정 필요. AI 산출물 무조건 신뢰하지 않도록 검증 단계 명확화.
- **Result**: 2,384개 SCSS 파일 3주 안에 Dart Sass 전환 완료. PR Review Agent 8개 저장소 적용. 반복 작업 AI, 예외 판단과 최종 검증 사람 담당 구조 정착.
- **Next Step**: PR Review Agent 학습 데이터 확장. 변환 규칙 재사용 가능 형태로 정리. 반복 작업 자동화 범위 지속 확대.
- **Tags**: Sass Migration, PR Review Agent, Cursor, Claude, Codex

---

## 5. Engineering (`/engineering`)

### 페이지 설명

> 기술 구현, AI 도입, 자동화 과정에서 배운 것을 기록합니다.

### 카테고리 분류 기준

- **Engineering**: React, CSS, Storybook, Lighthouse, Performance, Sass, 마크업, 접근성, 반응형, CDN, CLS, PDP
- **AI Engineering**: AI, Prompt, Context, Memory, Tool Calling, Agent, RAG, Ollama, Hermes, OpenClaw, 하네스, 에이전트
- **Automation**: Automation, Cursor, Codex, Claude, Telegram, 파이프라인, 자동화, PR Review, GeekNews, Digest
- **Other**: 위 카테고리에 속하지 않은 글

### 기존 MDX 아티클 (43개, src/content/tech/)

변경 없이 전부 유지. 주요 글:

- 모바일웹 상품상세(PDP) 전체 UI 개발
- React 기반 PDP 컴포넌트 개발
- Dart Sass 마이그레이션
- CDN CSS 점진적 내재화 시리즈 (7편)
- AI 기반 개발 환경 구축
- AI PR Review Agent 적용 및 운영
- AX Doctor preflight — AI 도입 전 점검 도구
- 개인 AI 에이전트 워크스페이스 설계
- OpenClaw에서 Hermes로 갈아탄 이유
- Obsidian RAG — 에이전트가 내 문서를 찾아보게 하기
- 모델은 바뀌었는데, 하네스는 그대로였다
- AI 뉴스 에이전트 — 뉴스 선택부터 블로그 PR까지
- GeekNews Digest (14편)
- 기타 (체험단 서비스, 반응형, 인프라, 크로스브라우저 등)

---

## 6. Career (`/career`)

### 페이지 설명

> AI Product Engineer · 13년 커머스·게임·플랫폼 UI 개발

### 소개

> 13년 동안 커머스, 게임, 플랫폼 서비스에서 UI를 개발하고 운영해왔습니다.
> 현재는 모바일웹 상품상세(PDP)를 포함한 핵심 서비스 UI를 담당하면서, AI 도구를 도입해 반복 작업을 줄이고 제품 개발 과정으로 역할을 넓히고 있습니다.
> 개인적으로는 AX Doctor, News Automation, BabyPick AI, OpenClaw Lab을 직접 기획·구현·운영하며 Product Engineer로서의 역량을 쌓고 있습니다.

### 회사별 경력 (Top 3 Achievement)

**11번가 (2020.12 ~ 현재) — UI 개발자 → AI Product Engineer**

1. Dart Sass 마이그레이션 — 2,384개 파일, 3주 완료
   - Action: AI 코딩 도구(Cursor, Claude)로 패턴별 변환 스크립트 생성, 폴더 단위 적용, 변환 전후 CSS 산출물 비교
   - Impact: 빌드 오류 없이 운영 반영, 다른 저장소에도 동일 방식 적용해 SCSS 환경 통일

2. AI PR Review Agent — 8개 저장소 적용
   - Action: 사내 제공 AI Agent를 파이프라인에 연결, SCSS/HTML 중심 파일 필터링, 접근성·BEM·SCSS 컨벤션 리뷰 기준 정리
   - Impact: 반복 컨벤션 확인 자동화, 리뷰 단계에서 설계·영향 범위 검토에 집중 가능

3. React 기반 PDP 컴포넌트 전환 및 CSS 내재화
   - Action: HTML/SCSS 산출물을 React 컴포넌트+CSS Modules로 이관, CDN 의존 CSS를 프로젝트 내부로 단계적 내재화(7편 시리즈), Storybook 기반 확인 환경 구축
   - Impact: 화면 코드와 스타일 변경 맥락을 하나의 저장소에서 관리, 신규 작업자 온보딩 기준 정리

**스마일게이트 알피지 (2019.10 ~ 2020.12) — UI 개발자**

1. 로스트아크 이벤트 페이지 구축·운영
   - Action: 출석체크, 룰렛, 투표형 인터랙티브 프로모션 페이지 구축, API 연동
   - Impact: 매주 정기배포 전담, 게임 서비스 특성에 맞춘 빠른 운영 대응 체계 구축

2. 공식사이트 콘텐츠 업데이트
   - Action: 정기 콘텐츠 업데이트, CSS/이미지 배포, 게임정보 API 연동
   - Impact: 서비스 안정성 유지, 고빈도 배포 경험 축적

3. 크로스브라우저 이슈 대응
   - Action: iOS/Android 모바일 환경별 렌더링 차이 대응
   - Impact: 모바일 웹 크로스브라우저 대응 역량 확보

**하이브랩 (2012.07 ~ 2019.06) — UI 개발자 → 팀장 (약 3년)**

1. 네이버 웨일 브라우저 공식사이트 — i-award 최우수상
   - Action: 브라우저 공식사이트 UI 개발 전담
   - Impact: i-award 최우수상 수상

2. 배틀그라운드 공식사이트 구축 — i-award 대상
   - Action: PUBG 공식사이트 구축 참여
   - Impact: i-award 대상 수상

3. 팀장 역할 — 업무 분배·품질 관리·클라이언트 커뮤니케이션
   - Action: 여러 프로젝트 동시 진행 시 팀원 경험 차이로 품질 흔들리는 문제 해결. 업무 난이도·일정 위험도 분류 후 팀원별 배분, 중간 확인 시점 설정. 반복 이슈는 공통 기준으로 정리.
   - Impact: 수정이 마지막에 몰리는 일 감소. 새 팀원도 기준 이해 후 업무 진입 가능.

### Products 링크

> AX Doctor, News Automation, BabyPick AI, Commerce AI, OpenClaw Lab
> 문제 정의부터 AI 활용, 구현, 배포, 운영까지 직접 만든 제품들을 확인하세요.
> → `/products` 링크

---

## 7. 기존 페이지 (변경 최소)

### Portfolio (`/portfolio`)

- CLI 스타일 포트폴리오 페이지 (기존 디자인 유지)
- 텍스트만 PE 톤으로 교체:
  - hero statement: "제품을 기획하고 AI를 활용해 구현하고 배포하고 운영합니다."
  - statusbar: "AI Product Engineer"
  - footer: "제품을 기획하고 AI를 활용해 만들고 운영하는 Product Engineer입니다."
- 내부 링크 `/tech/` → `/engineering/` 교체 (12개)
- 리다이렉트 없이 직접 접근 가능

### Feed (`/feed`)

- RSS 피드 리더 + AI 분석 스튜디오
- 변경 없음

### Three-Blog (`/three-blog`)

- Three.js 인터랙티브 3D 블로그
- 내부 링크 `/tech` → `/engineering` 교체 (1개)
- 3D 탐험 개선사항 포함 (모바일 조작, WASD, 접근성)

### Life (`/life`)

- 빈 페이지 ("준비 중입니다")
- `/about`으로 301 리다이렉트

### Tech (`/tech`, `/tech/[slug]`, `/tech/digest`)

- 기존 라우트 유지, `/engineering`으로 301 리다이렉트
- 내부 링크 `/tech/` → `/engineering/` 교체
- metadata Engineering으로 교체

---

## 헤더 메뉴

```
ksungz    Products  Case Studies  Engineering  Career  About
```

## Footer

```
© 2026 Sungjae Kim · AI Product Engineer
```

## Metadata (layout.tsx)

```
title: ksungz
description: 김성재 — AI Product Engineer. 제품을 기획하고 AI를 활용해 구현·배포·운영합니다.
```

---

## 검증 상태

- tsc --noEmit: 0 에러
- eslint (변경 파일): 0 에러 0 워닝
- npm run build: CPU 과부하 제약으로 미실행 (AGENTS.md 제약)
- 기존 콘텐츠 43개 MDX 아티클 전부 유지, 삭제 없음
- 기존 라우트 전부 보존 (리다이렉트로 연결)