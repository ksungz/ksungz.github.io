# 김성재 포트폴리오

13년간 제품 UI를 개발하고 운영하며 경험한 문제를 바탕으로,
AI Agent와 자동화를 실제 업무 시스템과 제품으로 연결하는 과정을 정리한 사이트입니다.

단순히 사용한 기술을 나열하기보다 다음 내용을 확인할 수 있도록 구성했습니다.

- 어떤 문제를 발견했는가
- 어디까지 직접 담당했는가
- AI와 사람이 각각 어떤 역할을 맡는가
- 무엇을 구현하고 검증했는가
- 아직 해결하지 못한 한계는 무엇인가

## 사이트 보기

- [홈](https://ksungz-github-io.vercel.app)
- [AX 시스템과 AI 제품](https://ksungz-github-io.vercel.app/products)
- [Case Studies](https://ksungz-github-io.vercel.app/case-studies)
- [Engineering Notes](https://ksungz-github-io.vercel.app/engineering)
- [Career](https://ksungz-github-io.vercel.app/career)
- [AX Engineer Portfolio](https://ksungz-github-io.vercel.app/)

## 대표 내용

### AX Systems

- **AX Doctor**: 새 AI 개발 도구를 설치하기 전에 설정 충돌과 미확인 범위를 점검하는 읽기 전용 CLI
- **Agent Bridge**: 이미 로그인해 사용하는 여러 AI 코딩 CLI를 한 작업 공간에서 연결하는 오픈소스 도구
- **Obsidian RAG**: 여러 AI 에이전트가 같은 프로젝트 문서와 결정 기록을 검색하는 로컬 지식 검색 환경
- **Developer Workflow AX**: 회사 제공 AI 도구를 실제 개발 흐름에 도입하고 사람의 검증 범위를 정리한 사례

### AI Products

- **BabyPick**: 육아용품 탐색 서비스와 사람 검수형 콘텐츠 운영 자동화
- **News Automation**: 뉴스 선택부터 분석, 블로그 초안과 GitHub PR까지 이어지는 파이프라인

### Product UI Background

- 모바일웹 상품상세와 신규 서비스 UI 개발·운영
- 2,384개 SCSS 파일의 Dart Sass 전환
- React·TypeScript 컴포넌트 이관과 Storybook 기반 검증 환경
- 접근성, 반응형 UI, 크로스브라우징과 운영 문서화

## 기술 구성

- Node.js 22
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- MDX
- Supabase
- Vercel

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:9999](http://localhost:9999)를 엽니다.

## 검증

```bash
npm run lint
npx tsc --noEmit
npx next build --webpack
```

`public/learning` 아래 파일은 별도 학습 콘텐츠의 빌드 결과물이므로 ESLint 검사 대상에서 제외합니다.

## 콘텐츠 원칙

- 회사 내부 저장소명, 팀 코드명, 비공개 인프라 정보는 공개하지 않습니다.
- 회사 제공 도구와 직접 개발한 도구를 구분합니다.
- 확인하지 못한 효과나 사용자 성과를 추측하지 않습니다.
- AI 결과는 초안과 확인 항목으로 다루고 최종 판단은 사람이 담당합니다.
- 실제 구현 범위와 현재 한계를 함께 기록합니다.
