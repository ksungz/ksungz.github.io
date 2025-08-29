# 성재의 개발 블로그

React 기반의 개인 블로그입니다. GitHub Pages를 통해 배포되며, SCSS 모듈과 BEM 방법론을 활용한 깔끔한 디자인을 제공합니다.

## 🚀 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경에서 최적화된 경험
- **카테고리별 포스트**: HTML, CSS, JavaScript, React, 일상 카테고리로 구분
- **모던 기술 스택**: React 18, React Router v6, SCSS 모듈 사용
- **깔끔한 UI/UX**: 화이트/네이비/회색 톤의 미니멀한 디자인
- **GitHub Pages 배포**: 자동 배포 워크플로우 구성

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Layout/         # 레이아웃 관련 컴포넌트
│   │   ├── Layout.js   # 메인 레이아웃 컴포넌트
│   │   ├── Header.js   # 헤더 컴포넌트
│   │   └── Footer.js   # 푸터 컴포넌트
│   └── Navigation/     # 네비게이션 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── Home/          # 홈페이지
│   ├── About/         # 소개 페이지
│   └── Category/      # 카테고리별 페이지
├── styles/            # 스타일 파일
│   ├── base/         # 기본 스타일 (reset, global)
│   ├── components/   # 컴포넌트별 스타일
│   └── pages/        # 페이지별 스타일
└── utils/            # 유틸리티 함수
```

## 🛠️ 기술 스택

- **Frontend**: React 18, React Router DOM v6
- **Styling**: SCSS, CSS Modules, BEM 방법론
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages, GitHub Actions
- **Package Manager**: npm

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16 이상
- npm 또는 yarn

### 로컬 개발 환경 설정

1. **저장소 클론**
   ```bash
   git clone https://github.com/ksungz/ksungz.github.io.git
   cd ksungz.github.io
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm start
   ```
   
   브라우저에서 `http://localhost:3000`으로 접속하여 확인할 수 있습니다.

4. **빌드**
   ```bash
   npm run build
   ```

## 🚀 배포 방법

### GitHub Pages 자동 배포

이 프로젝트는 GitHub Actions를 통해 자동 배포됩니다.

1. **main 브랜치에 푸시**
   ```bash
   git add .
   git commit -m "feat: 블로그 업데이트"
   git push origin main
   ```

2. **자동 배포 확인**
   - GitHub Actions 탭에서 배포 진행 상황 확인
   - 배포 완료 후 `https://ksungz.github.io`에서 확인

### 수동 배포 (선택사항)

```bash
npm run build
npm run deploy
```

## 🎨 스타일링 가이드

### SCSS 모듈 사용법

```scss
/* Component.module.scss */
.component {
  // 블록 (Block)
  
  &__element {
    // 요소 (Element)
  }
  
  &--modifier {
    // 수정자 (Modifier)
  }
}
```

### BEM 네이밍 컨벤션

- **Block**: 독립적인 컴포넌트 (예: `.header`)
- **Element**: 블록의 구성 요소 (예: `.header__title`)
- **Modifier**: 블록이나 요소의 변형 (예: `.header--dark`)

## 📝 새 포스트 추가하기

1. 해당 카테고리 페이지 컴포넌트 수정
2. `posts` 배열에 새 포스트 객체 추가
3. 필요시 새 페이지 컴포넌트 생성 및 라우팅 설정

## 🔧 커스터마이징

### 색상 테마 변경

`src/styles/base/global.scss` 파일의 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다.

```scss
:root {
  --color-primary: #1a365d;    // 주 색상
  --color-secondary: #2d3748;  // 보조 색상
  --color-accent: #3182ce;     // 강조 색상
  // ... 기타 색상 변수
}
```

### 새 카테고리 추가

1. `src/pages/Category/` 에 새 카테고리 컴포넌트 생성
2. `src/App.js`에 라우트 추가
3. `src/components/Navigation/Navigation.js`의 `categoryItems`에 메뉴 추가

## 📄 라이선스

MIT License

## 📞 문의

- GitHub: [https://github.com/ksungz](https://github.com/ksungz)
- Email: your.email@example.com

---

⭐ 이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!
