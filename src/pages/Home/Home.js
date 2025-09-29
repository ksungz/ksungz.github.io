import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

/**
 * Home 페이지 컴포넌트 - 메인 랜딩 페이지
 */
const Home = () => {
  const recentPosts = [
    {
      id: 'react-hooks-guide',
      title: 'React Hooks 완벽 가이드',
      category: 'React',
      date: '2024-01-26',
      excerpt: 'useState, useEffect부터 커스텀 훅까지 React Hooks의 모든 것을 알아보세요.',
      link: '/post/react/react-hooks-guide'
    },
    {
      id: 'html-semantic-guide',
      title: 'HTML5 시맨틱 태그 완벽 가이드',
      category: 'HTML',
      date: '2024-01-20',
      excerpt: 'header, nav, main, article, section 등 HTML5 시맨틱 태그의 올바른 사용법을 알아보세요.',
      link: '/post/html/html-semantic-guide'
    },
    {
      id: 3,
      title: '개발자로서의 첫 회고',
      category: '일상',
      date: '2024-01-05',
      excerpt: '개발을 시작한 지 1년, 그동안의 경험과 앞으로의 다짐을 정리해봤습니다.',
      link: '/category/daily'
    }
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.home__hero}>
        <h1 className={styles.home__title}>
          Welcome to ksungz's dev 👋
        </h1>
        <p className={styles.home__description}>
          프론트엔드 개발과 웹 기술에 대한 이야기를 나누는 공간입니다.<br />
          HTML, CSS, JavaScript, React를 중심으로 개발 경험과 일상을 공유합니다.
        </p>
        <div className={styles.home__actions}>
          <Link to="/about" className={styles.home__button}>
            👋 About Me
          </Link>
          <Link to="/category/react" className={`${styles.home__button} ${styles['home__button--outline']}`}>
            📚 최신 포스트 보기
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className={styles.home__recent}>
        <h2 className={styles.home__sectionTitle}>최근 포스트</h2>
        <div className={styles.home__posts}>
          {recentPosts.map((post) => (
            <article key={post.id} className={styles.home__post}>
              <div className={styles.home__postHeader}>
                <span className={styles.home__postCategory}>{post.category}</span>
                <time className={styles.home__postDate}>{post.date}</time>
              </div>
              <h3 className={styles.home__postTitle}>
                <Link to={post.link}>{post.title}</Link>
              </h3>
              <p className={styles.home__postExcerpt}>{post.excerpt}</p>
              <Link to={post.link} className={styles.home__postLink}>
                더 읽기 →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.home__categories}>
        <h2 className={styles.home__sectionTitle}>카테고리</h2>
        <div className={styles.home__categoryGrid}>
          <Link to="/category/html" className={styles.home__category}>
            <h3>🏗️ HTML</h3>
            <p>시맨틱 마크업과 웹 표준</p>
          </Link>
          <Link to="/category/css" className={styles.home__category}>
            <h3>🎨 CSS</h3>
            <p>스타일링과 레이아웃 기법</p>
          </Link>
          <Link to="/category/javascript" className={styles.home__category}>
            <h3>⚡ JavaScript</h3>
            <p>모던 JavaScript와 ES6+</p>
          </Link>
          <Link to="/category/react" className={styles.home__category}>
            <h3>⚛️ React</h3>
            <p>컴포넌트와 상태 관리</p>
          </Link>
          <Link to="/category/daily" className={styles.home__category}>
            <h3>💭 일상</h3>
            <p>개발자의 일상과 생각</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
