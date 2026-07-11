# CHANGELOG

## 2026-07-11 — Info Feed 운영 구조 보강

### 공개 피드
- `/feed`를 읽기 전용 큐레이션 화면으로 정리하고 실제 기사·소스·분석 통계를 연결
- 다크 테마를 쿨그레이 배경과 흰 콘텐츠 면 중심의 라이트 테마로 전환
- 카테고리, 검색, 주간 토픽, 전체 데이터 기반 페이지네이션 추가
- `/feed/sources`, `/feed/archive`, `/feed/[id]`를 실제 데이터 구조에 맞게 재작성
- 공개 API와 RSC 데이터에서 수집 본문, 운영 메모, 관련 프로젝트, 발행 브랜치 정보를 제거
- 모바일 카테고리 탐색과 기사 목록 레이아웃 개선

### Feed Studio
- 토큰 인증과 HTTP-only 세션 쿠키를 사용하는 `/feed/studio` 추가
- Inbox, 분석 완료, PR 생성, 보관 상태별 작업 목록과 상세 화면 제공
- 읽음, 분석, 보관, 블로그 초안 생성 API를 관리자 전용으로 전환
- 저장된 분석 결과와 PR 상태를 재접속 후에도 조회하도록 관계 데이터 로딩 수정

### 분석·발행 파이프라인
- 분석 입력 URL 검증, 구조화 JSON 검증, 실패 시 상태 보존 로직 추가
- 로컬 Git 명령 기반 발행을 GitHub API의 브랜치·MDX 커밋·Draft PR 생성 방식으로 교체
- 날짜가 같은 초안은 `[-N]` 접미사를 사용하고 기존 PR 요청은 재사용하도록 멱등성 보강
- RSS 링크는 배포 환경 URL을 기준으로 생성하고 원문 링크를 별도로 제공

### 수집·큐레이션 품질
- Reddit 소스 4개를 비활성화하고 비활성 소스 기사 799건을 공개 피드에서 보관 처리
- 소스 분류와 별개인 기사 카테고리 8종, 정규화 토픽, 관련도 점수, 공개·검토 상태 추가
- 공개 기준 75점, 검토 기준 55점과 일일·소스별 공개 상한을 적용해 저품질 후보 자동 제외
- RSS 구조 파싱, URL·제목 중복 제거, Ollama 배치 분류를 포함한 버전 관리 수집기 추가
- GitHub Actions에서 매일 06:00 KST에 수집기를 실행하도록 스케줄 구성
- Studio에서 검토 후보를 공개 피드로 승인하는 관리자 전용 기능 추가
- GeekNews 상세 JSON-LD에서 본문과 실제 원문 URL을 보강하고 출처 URL을 분리
- 자동 요약을 한줄 요약·핵심 포인트·중요성 구조로 확장
- 본문 400자 이상, 말줄임 종료 아님, 핵심 포인트 3개 이상을 공개 필수 조건으로 적용
- 기존 공개 45건을 재검사해 14건만 유지하고 나머지는 Studio 검토함으로 이동
- 품질 백필은 Ollama 구조화 응답이 일부라도 실패하면 전체 반영을 중단하도록 보호

### 검증
- TypeScript 검사, Feed 관련 ESLint, Next.js 프로덕션 빌드 통과
- 공개/관리 API 경계, 인증 차단, 필터, 검색, 토픽, 20→40건 페이지네이션 확인
- 데스크톱 및 390×844 모바일 브라우저 렌더링과 콘솔 오류 확인
- 운영 데이터 기준 활성 소스 4개, 공개 44건, 검토 58건, 분석 상태 불일치 0건 확인
- 본문 완성도 재검사 후 공개 14건, `fenic` 본문 1,119자·핵심 포인트 6개·관련도 90점 확인

## 2026-05-22~23 — GeekNews Digest 전용 섹션 추가

### 신규
- `src/app/tech/digest/page.tsx` — GeekNews Digest 전용 목록 페이지
  - `category === "GeekNews 픽"` 필터링
  - AI 작성 안내 배너 상단 고정
- `next.config.mjs` — `next.config.ts` 대체 (SWC 바이너리 미존재 환경 대응)

### 변경

**`src/components/layout/Header.tsx`**
- Digest 메뉴 항목 추가 (`/tech/digest`)
- active state 로직 수정: `/tech/digest` 하위 경로에서는 Tech 탭 비활성화

**`src/app/tech/page.tsx`**
- `getAllPosts()` → `getAllPosts().filter(p => p.category !== "GeekNews 픽")`
- Digest 포스트가 Tech 목록에 노출되지 않도록 제외

**`src/app/tech/[slug]/page.tsx`**
- `isDigest = post.category === "GeekNews 픽"` 조건 추가
- `← Tech` / `← Digest` 백링크 분기
- AI 작성 안내 배너 위치: 헤더(제목·태그) **아래**, 본문 **위**로 배치
- 배너 텍스트: "매일 GeekNews의 최신 내용을 스크랩하여 개인 프롬프트를 활용해 분석한 포스팅입니다. AI가 작성한 초안을 검토 후 게시하며, 원문 링크는 각 포스팅 내에서 확인할 수 있습니다."

**`src/lib/mdx.ts`**
- `PostMeta` 인터페이스에 `category?: string` 추가
- `getAllPosts()` / `getPostBySlug()` 모두 `category` 필드 반환

### GeekNews Digest MDX frontmatter 규격
```yaml
---
title: "GeekNews 픽: [키워드]"
date: "YYYY-MM-DD"
category: "GeekNews 픽"
badge: digest
description: "한 줄 요약"
tags: ["tag1", "tag2"]
---
```

---

## 2026-04-14

### Phase 2-2 Bulk 이관 완료

**docs 이관 (9건)**
- `dart-sass-retro` — CSS 전처리기 마이그레이션 회고
- `design-system-retro` — 디자인 시스템 인프라 구축 회고
- `monorepo-review` — 모노레포 구조 검토 및 전환 제안
- `pdp-cls` — 상품 상세 페이지 CLS 개선
- `pr-review-agent` — AI 기반 PR 자동 리뷰 시스템 구축
- `server-error-analysis` — 정적 리소스 서버 간헐적 에러 분석
- `svg-sprite` — SVG Sprite 환경 구성 및 적용
- `ui-module` — Monolithic UI 개선을 위한 모듈 관리 전략
- `ui-scripts` — AI 개발 설정 관리 및 배포 자동화 도구

**projects 이관 (9건)** + `/projects/[slug]` 신규 라우트
- `pdp-ui` — 모바일웹 상품상세(PDP) 전체 UI 개발
- `sample-service` — 체험단 서비스 전체 신규 구축
- `react-pdp` — React 기반 PDP 컴포넌트 개발
- `dart-sass` — Dart Sass 마이그레이션
- `ai-tools` — AI 기반 개발 도구 체계 구축 및 팀 전파
- `infra` — 서버/인프라 관리 및 환경 업데이트
- `responsive` — 반응형 웹 전환 추진 및 기반 구축
- `whale-browser` — 네이버 웨일 브라우저 공식사이트
- `battlegrounds` — 배틀그라운드 공식사이트 구축

### Phase 2-3 Mapping 완료

`career/page.tsx`의 경력 프로젝트 항목 및 Key Documents 항목에 `<Link>` 연결:
- 경력 프로젝트 9건 → `/projects/[slug]` 링크
- Key Documents 6건 → `/docs/[slug]` 링크

---

## 2026-04-13

### Phase 2-1 PoC 완료

- `cdn-css-series.mdx` 이관 완료 (DocDiagram SVG + GFM 테이블 렌더링 검증)
- `remark-gfm` 설치 및 docs/tech 양쪽 페이지에 remarkPlugins 주입

### 프로젝트 초기 구축

- Next.js 16.2.3 + Tailwind CSS 4 + TypeScript 기반 블로그 신규 구축
- 페이지: 홈, /career, /tech/[slug], /life, /docs/[slug]
- MDX 파이프라인: next-mdx-remote/rsc + gray-matter + remark-gfm
- DocDiagram 컴포넌트: SVG 모노톤 스타일링
- MDXComponents: h1~h6, p, ul, ol, blockquote, code, pre, table 등
- 개발 서버 포트: 9999
