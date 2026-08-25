# 김성재 포트폴리오

13년 동안 커머스·게임·플랫폼 서비스의 UI를 개발하고 운영했습니다.
모바일웹 상품상세와 앱 WebView UI 운영, 공통 UI와 스타일 구조 정리,
레거시 UI 전환 경험을 경력과 공개 프로젝트로 정리한 개인 포트폴리오입니다.

경력과 프로젝트마다 제가 맡은 범위, 실제로 구현한 내용과 확인한 결과를
구분해 정리했습니다.

## 사이트 보기

- [홈](https://ksungz-github-io.vercel.app)
- [AI를 활용한 프로젝트와 실험](https://ksungz-github-io.vercel.app/products)
- [Case Studies](https://ksungz-github-io.vercel.app/case-studies)
- [Engineering Notes](https://ksungz-github-io.vercel.app/engineering)
- [Career](https://ksungz-github-io.vercel.app/career)

## 대표 내용

### 서비스 UI 경력

- 모바일웹 상품상세와 앱 WebView UI 개발·운영
- 다양한 상품 유형과 기기·브라우저 환경에서 발생하는 문제 대응
- 공통 UI와 SCSS 구조 정리, 2,384개 SCSS 파일의 Dart Sass 전환
- HTML/SCSS 기반 화면의 React·TypeScript 컴포넌트 이관 참여
- 접근성, 반응형 UI, 크로스브라우징과 운영 문서화

### AI를 활용한 개발 도구와 실험

- **AX Doctor**: 새 AI 개발 도구를 설치하기 전에 설정 충돌과 미확인 범위를 점검하는 읽기 전용 CLI
- **Agent Bridge**: 이미 로그인해 사용하는 여러 AI 코딩 CLI를 한 작업 공간에서 연결하는 오픈소스 도구
- **Obsidian RAG**: 여러 AI 에이전트가 같은 프로젝트 문서와 결정 기록을 검색하는 로컬 지식 검색 환경
- **AI-assisted Development**: 회사 제공 AI 도구를 실제 개발 흐름에 적용하고 사람의 검증 범위를 정리한 사례

### 개인 서비스와 자동화

- **BabyPick**: 육아용품 탐색 서비스와 사람 검수형 콘텐츠 운영 자동화
- **News Automation**: 뉴스 선택부터 분석, 블로그 초안과 GitHub PR까지 이어지는 파이프라인

## 실험과 학습 공간

메인 포트폴리오 외에도 관심 있는 기술과 아이디어를 직접 시험하고,
작은 화면이나 도구로 만들어 공개하는 공간을 함께 운영합니다.

- [Info Feed](https://ksungz-github-io.vercel.app/feed): 여러 출처의 기술·비즈니스 소식을 수집하고 분류·검색하는 개인 정보 피드
- [Learning Space](https://ksungz-github-io.vercel.app/learning): FE·AX·LLM 학습 내용을 트랙과 챕터로 나누어 정리한 학습 공간
- [3D Portfolio](https://ksungz-github-io.vercel.app/three-blog): 캐릭터를 움직이며 Career, Engineering, Case Studies를 둘러보는 Three.js 기반 탐색 실험
- [Terminal Portfolio](https://ksungz-github-io.vercel.app/portfolio): 경력과 프로젝트를 터미널 콘셉트의 한 페이지로 정리한 대안형 포트폴리오

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
