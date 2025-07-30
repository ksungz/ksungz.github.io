# SungJae Kim's Personal Blog

🌐 **Live Site**: [https://ksungz.github.io](https://ksungz.github.io)

개인 블로그 사이트입니다. React와 SCSS CSS Modules를 사용하여 구축되었습니다.

## 🛠️ 기술 스택

### Core Technologies
- **React**: 19.1.1 - UI 라이브러리
- **React DOM**: 19.1.1 - DOM 렌더링
- **React Scripts**: 5.0.1 - Create React App 빌드 도구

### Styling
- **SCSS**: 1.89.2 - CSS 전처리기 (CSS Modules 지원)

### Testing
- **@testing-library/react**: 16.3.0 - React 컴포넌트 테스팅
- **@testing-library/jest-dom**: 6.6.4 - Jest DOM 매처
- **@testing-library/user-event**: 13.5.0 - 사용자 이벤트 시뮬레이션
- **@testing-library/dom**: 10.4.1 - DOM 테스팅 유틸리티

### Development & Deployment
- **gh-pages**: 6.3.0 - GitHub Pages 배포 도구
- **web-vitals**: 2.1.4 - 웹 성능 측정

## 🔧 환경 요구사항

- **Node.js**: v20.18.0
- **npm**: 10.8.2

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/ksungz/ksungz.github.io.git
cd ksungz.github.io
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm start
```
- 브라우저에서 http://localhost:3000 으로 접속
- 파일 변경 시 자동 리로드

## 🚀 빌드 및 배포

### 개발용 빌드
```bash
npm run build
```

### GitHub Pages 배포 (현재 방식)
```bash
# 1. React 앱 빌드
npm run build

# 2. 빌드 파일을 루트로 복사 및 배포
cp -r build/* . && rm -rf build
git add .
git commit -m "Deploy: Update blog"
git push origin master
```

### 자동 배포 스크립트 (참고용)
```bash
npm run deploy  # gh-pages 브랜치로 배포 (현재 미사용)
```

## 🎨 SCSS CSS Modules 사용법

### 파일 명명 규칙
- `ComponentName.module.scss` 형식으로 파일 생성

### 사용 예시
```scss
// App.module.scss
.container {
  padding: 20px;
  
  .title {
    color: #333;
    font-size: 2rem;
    
    &:hover {
      color: #007bff;
    }
  }
  
  .button {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
}
```

```jsx
// App.js
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Title</h1>
      <button className={styles.button}>Click Me</button>
    </div>
  );
}
```

## 📁 프로젝트 구조

```
ksungz.github.io/
├── public/                 # 정적 파일
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/                    # React 소스 코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── styles/            # 전역 스타일
│   ├── App.js             # 메인 앱 컴포넌트
│   ├── App.module.scss    # 앱 스타일
│   └── index.js           # 앱 진입점
├── package.json           # 프로젝트 설정 및 의존성
└── README.md             # 프로젝트 문서
```

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 커버리지 확인
npm test -- --coverage
```

## 🔍 유용한 명령어

```bash
# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# 패키지 보안 취약점 확인
npm audit

# 패키지 업데이트 확인
npm outdated

# 의존성 트리 확인
npm ls
```

## 📝 개발 가이드라인

### 컴포넌트 개발
1. 각 컴포넌트는 별도 폴더에 구성
2. SCSS CSS Modules 사용으로 스타일 캡슐화
3. PropTypes 또는 TypeScript로 타입 정의 권장

### 스타일링
1. CSS Modules를 통한 스타일 격리
2. SCSS 기능 활용 (변수, 믹스인, 중첩 등)
3. 반응형 디자인 고려

### 성능 최적화
1. `React.memo()` 활용한 컴포넌트 최적화
2. 이미지 최적화 및 lazy loading
3. 코드 스플리팅 적용

## 🔗 유용한 링크

- [React 공식 문서](https://reactjs.org/)
- [Create React App 문서](https://create-react-app.dev/)
- [SCSS 문서](https://sass-lang.com/)
- [CSS Modules 가이드](https://github.com/css-modules/css-modules)
- [GitHub Pages 문서](https://docs.github.com/en/pages)

## 📄 라이선스

이 프로젝트는 개인 블로그 용도로 사용됩니다.

---

⭐ **개발자**: SungJae Kim  
🌐 **블로그**: https://ksungz.github.io  
📧 **연락처**: [GitHub](https://github.com/ksungz) 