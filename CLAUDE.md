# ksungz-blog 프로젝트 규칙

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
