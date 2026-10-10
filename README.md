# 김성재 포트폴리오

커머스, 게임, 플랫폼 서비스의 UI를 개발하고 운영해 왔습니다.
모바일웹 상품상세와 앱 WebView UI 운영, 기존 구조 개선과 팀 리딩 경험을 정리했습니다.
최근에는 공동 프로젝트에 참여해 AI 개발 도구를 활용한 서비스 홈페이지와 운영 관리 시스템을 만들고 있습니다.

각 작업에서 어떤 문제가 있었고 왜 그 방식으로 바꿨는지,
직접 맡은 범위와 적용 후 확인한 결과를 함께 적었습니다.

## 사이트 보기

- [홈](https://ksungz-github-io.vercel.app)
- [서비스와 업무 도구 개발](https://ksungz-github-io.vercel.app/products)
- [Case Studies](https://ksungz-github-io.vercel.app/case-studies)
- [Engineering Notes](https://ksungz-github-io.vercel.app/engineering)
- [Career](https://ksungz-github-io.vercel.app/career)

## 대표 내용

### 서비스 UI 경력

- 모바일웹 상품상세와 앱 WebView UI 개발, 운영과 변경 범위 조율
- 다양한 상품 유형과 기기, 브라우저 환경에서 발생하는 문제 대응
- 운영 SCSS를 React 저장소로 옮기면서 화면 블록별 스타일 관리 방식 결정
- AI를 활용한 약 2,384개 SCSS 파일의 Dart Sass 전환과 산출물 검증
- 별도 빌드 병렬화로 대표 실행 시간을 약 24초에서 14초 내외로 단축
- 약 3년간 팀장으로 고객사 요구사항, 공수, 업무 배분, 일정과 품질 관리
- 접근성, 반응형 UI, 크로스브라우징과 운영 문서화

### 최근 공동 프로젝트

- **서비스 홈페이지와 운영 관리 시스템**: 상담 신청과 관리자 화면을 연결하고 접수 조회, 상태 변경, 메모와 자료 내보내기 기능 구성
- AI 질의응답과 정기 요약을 협업에 활용하고 업무의 실제 완료 여부는 별도로 확인
- 원본을 보존하는 엑셀 처리 도구와 콘텐츠 게시 상태 관리 기능 구성
- 재직 경력과 구분한 공동 프로젝트 참여이며 필요한 기능을 정하고 AI 개발 도구를 활용해 구현, 검증, 배포 진행

### AI를 활용한 개발 도구와 작업

- **AX Doctor**: 새 AI 개발 도구를 설치하기 전에 설정 충돌과 미확인 범위를 점검하는 읽기 전용 CLI
- **Agent Bridge**: 이미 로그인해 사용하는 여러 AI 코딩 CLI를 한 작업 공간에서 연결하는 오픈소스 도구
- **Obsidian RAG**: 여러 AI 에이전트가 같은 프로젝트 문서와 결정 기록을 검색하는 로컬 지식 검색 환경
- **AI-assisted Development**: 회사 제공 AI 도구를 실제 개발 흐름에 적용하고 사람의 검증 범위를 정리한 사례

### 개인 서비스와 자동화

- **BabyPick**: 육아용품 탐색 서비스와 사람 검수형 콘텐츠 운영 자동화
- **News Automation**: 뉴스 선택부터 분석, 블로그 초안과 GitHub PR까지 이어지는 파이프라인

## 학습과 구현 공간

메인 포트폴리오 외에도 관심 있는 기술과 아이디어를 직접 다뤄보고,
작은 화면이나 도구로 만들어 기록하는 공간을 함께 운영합니다.

- [Info Feed](https://ksungz-github-io.vercel.app/feed): 여러 출처의 기술, 비즈니스 소식을 수집하고 분류, 검색하는 개인 정보 피드
- [Learning Space](https://ksungz-github-io.vercel.app/learning): FE, AX, LLM 학습 내용을 트랙과 챕터로 나누어 정리한 학습 공간
- [3D Portfolio](https://ksungz-github-io.vercel.app/three-blog): 캐릭터를 움직이며 Career, Engineering, Case Studies를 둘러보는 Three.js 기반 탐색 화면
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
