import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';

/**
 * HTML 카테고리 페이지 컴포넌트
 */
const HtmlCategory = () => {
  const posts = [
    {
      id: 'html-semantic-guide',
      title: 'HTML5 시맨틱 태그 완벽 가이드',
      date: '2024-01-20',
      excerpt: 'header, nav, main, article, section 등 HTML5 시맨틱 태그의 올바른 사용법을 알아보세요.',
      readTime: '8분',
      link: '/post/html/html-semantic-guide'
    },
    {
      id: 2,
      title: '웹 접근성을 위한 HTML 작성법',
      date: '2024-01-18',
      excerpt: 'ARIA 속성과 시맨틱 마크업을 통해 모든 사용자가 접근 가능한 웹을 만드는 방법.',
      readTime: '7분',
      link: '#'
    },
    {
      id: 3,
      title: 'HTML Form 요소 완전 정복',
      date: '2024-01-15',
      excerpt: 'input, select, textarea 등 폼 요소의 다양한 속성과 유효성 검사 방법을 다룹니다.',
      readTime: '10분',
      link: '#'
    }
  ];

  return (
    <div className={styles.category}>
      {/* 카테고리 헤더 */}
      <header className={styles.category__header}>
        <h1 className={styles.category__title}>HTML</h1>
        <p className={styles.category__description}>
          웹의 기초, HTML에 대한 모든 것을 다룹니다. 
          시맨틱 마크업부터 최신 HTML5 기능까지 체계적으로 학습해보세요.
        </p>
        <div className={styles.category__stats}>
          <span className={styles.category__stat}>
            📝 {posts.length}개의 포스트
          </span>
          <span className={styles.category__stat}>
            🏷️ 웹 표준, 시맨틱, 접근성
          </span>
        </div>
      </header>

      {/* 포스트 목록 */}
      <section className={styles.category__posts}>
        {posts.map((post) => (
          <article key={post.id} className={styles.category__post}>
            <div className={styles.category__postHeader}>
              <h2 className={styles.category__postTitle}>{post.title}</h2>
              <div className={styles.category__postMeta}>
                <time className={styles.category__postDate}>{post.date}</time>
                <span className={styles.category__postReadTime}>{post.readTime} 읽기</span>
              </div>
            </div>
            <p className={styles.category__postExcerpt}>{post.excerpt}</p>
            <Link to={post.link} className={styles.category__postButton}>
              자세히 보기 →
            </Link>
          </article>
        ))}
      </section>

      {/* 관련 카테고리 */}
      <section className={styles.category__related}>
        <h2 className={styles.category__sectionTitle}>관련 카테고리</h2>
        <div className={styles.category__relatedList}>
          <a href="/category/css" className={styles.category__relatedItem}>
            <h3>CSS</h3>
            <p>HTML과 함께하는 스타일링</p>
          </a>
          <a href="/category/javascript" className={styles.category__relatedItem}>
            <h3>JavaScript</h3>
            <p>동적 웹페이지 구현</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HtmlCategory;
