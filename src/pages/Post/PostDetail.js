import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { renderMarkdown } from '../../utils/markdownRenderer';
import styles from './PostDetail.module.scss';

/**
 * 포스트 상세 페이지 컴포넌트
 * URL 파라미터로 포스트 ID를 받아서 해당 포스트를 표시
 */
const PostDetail = () => {
  const { category, postId } = useParams();
  const navigate = useNavigate();

  // 샘플 포스트 데이터 (실제로는 API나 데이터베이스에서 가져올 것)
  const samplePosts = {
    'react-hooks-guide': {
      id: 'react-hooks-guide',
      title: 'React Hooks 완벽 가이드',
      category: 'React',
      date: '2024-01-26',
      readTime: '15분',
      author: '김성재',
      tags: ['React', 'Hooks', 'useState', 'useEffect'],
      content: `
# React Hooks 완벽 가이드

React Hooks는 React 16.8에서 도입된 혁신적인 기능입니다. 함수형 컴포넌트에서도 상태 관리와 생명주기 메서드를 사용할 수 있게 해주어 코드를 더 간결하고 재사용 가능하게 만들어줍니다.

## 🎯 왜 Hooks를 사용해야 할까요?

### 1. 코드 재사용성 향상
기존 클래스 컴포넌트에서는 로직을 재사용하기 위해 HOC(Higher-Order Components)나 Render Props 패턴을 사용해야 했습니다. 하지만 이런 패턴들은 "wrapper hell"을 만들어 코드를 복잡하게 만들었죠.

\`\`\`jsx
// 기존 방식 (복잡함)
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }
  
  componentDidMount() {
    this.fetchUser();
  }
  
  fetchUser = async () => {
    // 사용자 정보 가져오기
  }
  
  render() {
    // JSX 반환
  }
}
\`\`\`

\`\`\`jsx
// Hooks 방식 (간결함)
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  const fetchUser = async () => {
    // 사용자 정보 가져오기
  }
  
  return (
    // JSX 반환
  );
}
\`\`\`

### 2. 상태 로직의 분리
커스텀 Hook을 만들어서 상태 로직을 컴포넌트에서 분리할 수 있습니다.

\`\`\`jsx
// 커스텀 Hook
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading };
}

// 컴포넌트에서 사용
function UserProfile({ userId }) {
  const { user, loading } = useUser(userId);
  
  if (loading) return <div>로딩 중...</div>;
  return <div>{user.name}</div>;
}
\`\`\`

## 📚 주요 Hooks 살펴보기

### useState
가장 기본적인 Hook으로 함수형 컴포넌트에서 상태를 관리할 수 있게 해줍니다.

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}
\`\`\`

### useEffect
컴포넌트의 사이드 이펙트를 처리합니다. 데이터 가져오기, 구독 설정, DOM 조작 등에 사용됩니다.

\`\`\`jsx
function UserList() {
  const [users, setUsers] = useState([]);
  
  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []); // 빈 배열: 한 번만 실행
  
  // users 상태가 변경될 때마다 실행
  useEffect(() => {
    document.title = \`사용자 \${users.length}명\`;
  }, [users]); // users 의존성
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## 🎨 실무에서의 활용 팁

### 1. 커스텀 Hook으로 로직 분리
반복되는 로직은 커스텀 Hook으로 만들어 재사용하세요.

### 2. useCallback과 useMemo 적절히 활용
성능 최적화가 필요한 경우에만 사용하세요. 무분별한 사용은 오히려 성능을 해칠 수 있습니다.

### 3. useEffect의 의존성 배열 주의
의존성 배열을 정확히 설정하지 않으면 무한 루프나 예상치 못한 동작이 발생할 수 있습니다.

## 🚀 마무리

React Hooks는 함수형 컴포넌트의 가능성을 크게 확장시켜주었습니다. 처음에는 어색할 수 있지만, 익숙해지면 더 깔끔하고 재사용 가능한 코드를 작성할 수 있게 됩니다.

다음 포스트에서는 커스텀 Hook을 만드는 방법과 실무에서 자주 사용되는 Hook 패턴들을 자세히 살펴보겠습니다.

---

**참고 자료:**
- [React 공식 문서 - Hooks](https://react.dev/reference/react)
- [Hooks FAQ](https://react.dev/reference/react/hooks)
`
    },
    'html-semantic-guide': {
      id: 'html-semantic-guide',
      title: 'HTML5 시맨틱 태그 완벽 가이드',
      category: 'HTML',
      date: '2024-01-20',
      readTime: '8분',
      author: '김성재',
      tags: ['HTML5', 'Semantic', 'Accessibility', 'SEO'],
      content: `
# HTML5 시맨틱 태그 완벽 가이드

HTML5에서 도입된 시맨틱 태그들은 웹 문서의 구조를 더 명확하게 표현할 수 있게 해줍니다. 단순히 \`div\`와 \`span\`으로만 구성된 문서보다 의미있는 구조를 만들 수 있어요.

## 🏗️ 주요 시맨틱 태그들

### \`<header>\`
페이지나 섹션의 헤더를 나타냅니다.

\`\`\`html
<header>
  <h1>사이트 제목</h1>
  <nav>
    <ul>
      <li><a href="/">홈</a></li>
      <li><a href="/about">소개</a></li>
    </ul>
  </nav>
</header>
\`\`\`

### \`<nav>\`
네비게이션 링크들을 그룹화합니다.

### \`<main>\`
문서의 주요 콘텐츠를 나타냅니다. 페이지당 하나만 사용해야 합니다.

### \`<article>\`
독립적으로 배포 가능한 콘텐츠를 나타냅니다.

### \`<section>\`
문서의 섹션을 나타냅니다.

## 💡 왜 시맨틱 태그를 사용해야 할까요?

1. **접근성 향상**: 스크린 리더 사용자에게 더 나은 경험 제공
2. **SEO 개선**: 검색 엔진이 콘텐츠 구조를 더 잘 이해
3. **코드 가독성**: 개발자가 코드 구조를 쉽게 파악
4. **유지보수성**: 명확한 구조로 수정이 용이

이런 이유로 시맨틱 태그를 적극 활용하는 것이 좋습니다!
`
    }
  };

  // URL에서 postId를 가져와서 해당 포스트 찾기
  const post = samplePosts[postId];

  // 포스트가 없는 경우 404 처리
  if (!post) {
    return (
      <div className={styles.postDetail}>
        <div className={styles.postDetail__notFound}>
          <h1>포스트를 찾을 수 없습니다</h1>
          <p>요청하신 포스트가 존재하지 않거나 삭제되었습니다.</p>
          <Link to="/" className={styles.postDetail__backButton}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.postDetail}>
      {/* 포스트 헤더 */}
      <header className={styles.postDetail__header}>
        <div className={styles.postDetail__breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/category/${category}`}>{post.category}</Link>
          <span>/</span>
          <span>{post.title}</span>
        </div>
        
        <div className={styles.postDetail__meta}>
          <span className={styles.postDetail__category}>{post.category}</span>
          <div className={styles.postDetail__info}>
            <time className={styles.postDetail__date}>{post.date}</time>
            <span className={styles.postDetail__readTime}>📖 {post.readTime} 읽기</span>
            <span className={styles.postDetail__author}>✍️ {post.author}</span>
          </div>
        </div>

        <h1 className={styles.postDetail__title}>{post.title}</h1>
        
        <div className={styles.postDetail__tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.postDetail__tag}>
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 포스트 내용 */}
      <div className={styles.postDetail__content}>
        <div 
          className={styles.postDetail__markdown}
          dangerouslySetInnerHTML={{ 
            __html: renderMarkdown(post.content)
          }}
        />
      </div>

      {/* 포스트 하단 네비게이션 */}
      <footer className={styles.postDetail__footer}>
        <div className={styles.postDetail__navigation}>
          <button 
            onClick={() => navigate(-1)}
            className={styles.postDetail__navButton}
          >
            ← 이전으로
          </button>
          <Link 
            to={`/category/${category}`}
            className={styles.postDetail__navButton}
          >
            📂 {post.category} 목록
          </Link>
        </div>

        <div className={styles.postDetail__share}>
          <h3>이 포스트가 도움이 되셨나요?</h3>
          <div className={styles.postDetail__shareButtons}>
            <button className={styles.postDetail__shareButton}>
              👍 좋아요
            </button>
            <button className={styles.postDetail__shareButton}>
              💬 댓글
            </button>
            <button className={styles.postDetail__shareButton}>
              📤 공유
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default PostDetail;
