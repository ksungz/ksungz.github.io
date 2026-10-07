# ksungz-blog 프로젝트 규칙

> 공통 규칙은 [workspace AGENTS.md](../AGENTS.md)를 먼저 따른다. 이 문서는 ksungz-blog의 추가 규칙만 정의한다.

> 상세 지식은 Obsidian `projects/ksungz-blog.md` 참조

## 스택
- Next.js 16.2.3 · React 19 · TypeScript · Tailwind CSS 4
- 포트: `9999`
- GitHub: https://github.com/ksungz/ksungz.github.io

## 콘텐츠 규칙
- 모든 아티클: `src/content/tech/` 단일 디렉토리
- frontmatter `date` 필드: **반드시 따옴표** (`"2025-06-01"`)
- GeekNews Digest: `category: "GeekNews 픽"`, `badge: digest` 필수, 파일명 `geek-digest-YYYY-MM-DD[-N].mdx`
- career 링크: `/tech/[slug]` 형식만 사용. `/docs/`, `/projects/` 사용 금지

## MDX 렌더링 필수 형식
```tsx
// ✅ 올바른 방식
<MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
// ❌ spread 방식 금지 (테이블 깨짐)
```

## 주의사항
- **사내 정보 노출 금지**: 레포명, 팀 코드명, 사내 패키지명, 인프라 상세 → 일반명으로 표현
- `suppressHydrationWarning` 유지 (브라우저 익스텐션 hydration 경고 억제)
- Other Projects 테이블: `overflow-x-auto` + `min-w-[600px]` 유지

## NCS 연습 콘텐츠
- 사용자 제공 2026년 국가평생교육진흥원 필기 안내: 100문항, 110분, 의사소통/문제해결/자기관리/디지털/수리 영역.
- 창작 문항을 실제 기출, 검증된 실전 난도, 합격 가능성 지표로 표현하지 않는다. 영역별 문항 수는 연습용 배분임을 명시한다.
- 긴 지문, 표, 복합 조건을 포함하고 학습 모드와 정답을 숨기는 실전 모드를 구분한다. 기존 50문항 답안은 별도 키로 보존한다.
- 2026-10-07 사용자 승인: 이번 NCS 연습 페이지 변경을 기존 프로덕션에 배포한다. 관련 없는 미추적 학습 콘텐츠는 포함하지 않는다.
