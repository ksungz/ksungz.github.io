# ksungz-blog — CLAUDE.md

## 프로젝트 개요

김성재 포트폴리오 블로그. 경력기술서 + 기술 아티클 통합 사이트.

- **스택**: Next.js 16.2.3 · React 19 · TypeScript · Tailwind CSS 4
- **포트**: `9999` (`npm run dev`)
- **배포**: Vercel (예정)

---

## 라우트 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 — 소개, Skills, 최근 Tech 포스트 |
| `/career` | 경력기술서 — Experience, Other Projects, Key Documents, Side Projects |
| `/tech` | Tech 아티클 목록 |
| `/tech/[slug]` | Tech 아티클 상세 |
| `/life` | 라이프 페이지 |
| `/docs/[slug]` | (구) docs 라우트 — 콘텐츠 없음, 레거시 유지 |
| `/projects/[slug]` | (구) projects 라우트 — 콘텐츠 없음, 레거시 유지 |

---

## 콘텐츠 구조

모든 아티클은 `src/content/tech/` 단일 디렉토리에서 관리. `/docs/`, `/projects/`는 Phase 5에서 `/tech/`로 통합 완료.

### MDX frontmatter 필드

```yaml
---
title: 제목
period: 2025.06 ~ 2025.07       # 프로젝트 기간 (career 연동용)
date: "2025"                     # tech 목록 정렬용 (없으면 빈 문자열)
company: 11번가 UI개발팀
role: 역할 설명
description: 한 줄 요약
tags: [React, TypeScript]
---
```

### 콘텐츠 읽기 함수 (`src/lib/`)

| 파일 | 함수 | 대상 디렉토리 |
|------|------|-------------|
| `mdx.ts` | `getAllPosts()`, `getPostBySlug()` | `src/content/tech/` |
| `docs.ts` | `getAllDocs()`, `getDocBySlug()` | `src/content/docs/` (비어있음) |
| `projects.ts` | `getAllProjects()`, `getProjectBySlug()` | `src/content/projects/` (비어있음) |

---

## MDX 렌더링

`next-mdx-remote/rsc` + `remark-gfm` 사용. **반드시 아래 형식으로 options 전달.**

```tsx
// ✅ 올바른 방식
<MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />

// ❌ 잘못된 방식 (테이블 깨짐)
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };
<MDXRemote {...mdxOptions} />  // spread하면 options prop이 아닌 mdxOptions prop으로 전달됨
```

### MDXComponents (`src/components/mdx/MDXComponents.tsx`)

h1~h6, p, a, ul, ol, blockquote, code, pre, hr, strong, table/thead/tbody/tr/th/td, `DocDiagram` 커스텀 컴포넌트 포함.

---

## 주요 컴포넌트

| 경로 | 설명 |
|------|------|
| `src/components/layout/Header.tsx` | 글로벌 헤더 |
| `src/components/layout/Footer.tsx` | 글로벌 푸터 |
| `src/components/mdx/DocDiagram.tsx` | SVG 다이어그램 래퍼 (모노톤 스타일) |
| `src/components/mdx/MDXComponents.tsx` | MDX 렌더링 컴포넌트 맵 |
| `src/components/ui/Card.tsx` | 카드 UI |
| `src/components/ui/Timeline.tsx` | 타임라인 UI |

---

## CSS 변수 (테마)

Tailwind `var()` 기반 테마 사용. 주요 변수:

```
--color-background   배경
--color-foreground   기본 텍스트
--color-muted        보조 텍스트
--color-border       테두리
--color-accent       hover 배경 등 강조 배경
```

---

## career/page.tsx 데이터 구조

`src/app/career/page.tsx`에 데이터가 직접 인라인으로 정의되어 있음 (별도 CMS 없음).

- `careers[]` — Experience 섹션. `projects[].link`는 `/tech/[slug]` 형식
- `otherProjects[]` — Other Projects 테이블
- `keyDocs[]` — Key Documents. `items[].link`는 `/tech/[slug]` 형식
- `sideProjects[]` — Side Projects 카드
- `PRIMARY_SKILLS` — Skills 강조 뱃지 (`HTML5`, `SCSS/Sass`, `React 18`, `TypeScript`, `Cursor AI`)

**링크 추가/수정 시**: `/tech/[slug]` 형식으로만 연결. `/docs/`, `/projects/` 사용 금지.

---

## 주의사항

- **사내 정보 노출 금지**: 저장소 실명(숫자 시작 레포, 팀 코드명), 사내 패키지명(`@회사/...`), 사내 인프라 상세(서버명, VIP 등)를 MDX 콘텐츠에 작성하지 말 것. 기능 기반 일반명으로 표현.
- `<body suppressHydrationWarning>` — 브라우저 익스텐션 주입 속성으로 인한 hydration 경고 억제용. 유지 필요.
- `Other Projects` 테이블: 부모에 `overflow-x-auto`, `<table>`에 `min-w-[600px]` 유지 (모바일 가로 스크롤).
