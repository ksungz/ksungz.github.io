# CHANGELOG

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
