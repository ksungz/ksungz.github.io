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
- **classnames**: 2.5.1 - CSS 클래스명 조합 유틸리티

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

## 🎨 SCSS CSS Modules + BEM 사용법

### 파일 명명 규칙
- `ComponentName.module.scss` 형식으로 파일 생성
- BEM(Block Element Modifier) 방법론 적용

### BEM 방법론
- **Block**: 독립적인 컴포넌트 (예: `card`, `header`, `button`)
- **Element**: 블록의 구성 요소 (예: `card__title`, `card__content`)
- **Modifier**: 블록이나 요소의 변형 (예: `button--primary`, `card--featured`)

### 사용 예시

```scss
// BlogCard.module.scss
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  // Element: 카드의 제목
  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
    
    &:hover {
      color: #007bff;
    }
  }
  
  // Element: 카드의 내용
  &__content {
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  // Element: 카드의 메타 정보
  &__meta {
    font-size: 0.875rem;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  // Element: 태그 리스트
  &__tags {
    display: flex;
    gap: 8px;
  }
  
  // Element: 개별 태그
  &__tag {
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    color: #666;
    
    // Modifier: 강조된 태그
    &--primary {
      background: #007bff;
      color: white;
    }
    
    &--secondary {
      background: #6c757d;
      color: white;
    }
  }
  
  // Modifier: 강조된 카드
  &--featured {
    border: 2px solid #007bff;
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2);
  }
  
  // Modifier: 다크 테마 카드
  &--dark {
    background: #2d3748;
    color: white;
    
    .card__title {
      color: white;
    }
    
    .card__content {
      color: #cbd5e0;
    }
  }
}

// Button 컴포넌트 예시
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  // Modifier: 버튼 스타일 variants
  &--primary {
    background: #007bff;
    color: white;
    
    &:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }
  }
  
  &--secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #545b62;
    }
  }
  
  &--outline {
    background: transparent;
    border: 2px solid #007bff;
    color: #007bff;
    
    &:hover {
      background: #007bff;
      color: white;
    }
  }
  
  // Modifier: 버튼 크기
  &--small {
    padding: 6px 12px;
    font-size: 0.875rem;
  }
  
  &--large {
    padding: 15px 30px;
    font-size: 1.125rem;
  }
  
  // Modifier: 버튼 상태
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  }
}
```

```jsx
// BlogCard.js
import styles from './BlogCard.module.scss';

function BlogCard({ title, content, tags, featured, theme = 'light' }) {
  const cardClasses = [
    styles.card,
    featured && styles['card--featured'],
    theme === 'dark' && styles['card--dark']
  ].filter(Boolean).join(' ');

  return (
    <article className={cardClasses}>
      <h2 className={styles.card__title}>{title}</h2>
      <p className={styles.card__content}>{content}</p>
      
      <div className={styles.card__meta}>
        <div className={styles.card__tags}>
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={`${styles.card__tag} ${
                index === 0 ? styles['card__tag--primary'] : styles['card__tag--secondary']
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <time>2024-01-31</time>
      </div>
    </article>
  );
}

// Button.js
import styles from './Button.module.scss';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick 
}) {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    size !== 'medium' && styles[`button--${size}`],
    disabled && styles['button--disabled']
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
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
2. SCSS CSS Modules + BEM 방법론 사용으로 스타일 캡슐화
3. PropTypes 또는 TypeScript로 타입 정의 권장

### BEM + CSS Modules 스타일링 규칙
1. **Block**: 컴포넌트의 루트 클래스 (예: `.card`, `.button`, `.header`)
2. **Element**: `&__element` 형태로 중첩 (예: `&__title`, `&__content`)
3. **Modifier**: `&--modifier` 형태로 변형 (예: `&--primary`, `&--large`)
4. CSS Modules를 통한 스타일 격리 및 자동 클래스명 생성
5. SCSS 기능 활용 (변수, 믹스인, 중첩 등)
6. 반응형 디자인 고려

### BEM 네이밍 컨벤션
```scss
// ✅ 올바른 BEM 구조
.card {
  // Block 스타일
  
  &__title {        // Element
    // 제목 스타일
  }
  
  &__content {      // Element
    // 내용 스타일
  }
  
  &--featured {     // Modifier
    // 강조된 카드 스타일
  }
  
  &--dark {         // Modifier
    // 다크 테마 스타일
    
    .card__title {  // Modifier 내부에서 Element 재정의
      // 다크 테마에서의 제목 스타일
    }
  }
}

// ❌ 피해야 할 구조
.card {
  .title {          // BEM Element 형태가 아님
    .subtitle {     // 과도한 중첩
      // ...
    }
  }
}
```

### 클래스명 조합 패턴
```jsx
// 단일 modifier
<div className={styles['card--featured']} />

// 여러 modifier 조합
const cardClasses = [
  styles.card,
  featured && styles['card--featured'],
  theme === 'dark' && styles['card--dark'],
  size && styles[`card--${size}`]
].filter(Boolean).join(' ');

// 유틸리티 함수 사용 (권장)
import classNames from 'classnames';

const cardClasses = classNames(styles.card, {
  [styles['card--featured']]: featured,
  [styles['card--dark']]: theme === 'dark',
  [styles[`card--${size}`]]: size
});
```

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