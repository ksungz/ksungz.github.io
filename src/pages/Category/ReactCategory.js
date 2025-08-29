import React from 'react';
import styles from './Category.module.scss';

const ReactCategory = () => {
  const posts = [
    {
      id: 1,
      title: 'React Hooks 완벽 가이드',
      date: '2024-01-26',
      excerpt: 'useState, useEffect, useContext부터 커스텀 훅 작성까지 React Hooks의 모든 것.',
      readTime: '15분'
    },
    {
      id: 2,
      title: '컴포넌트 설계 원칙과 패턴',
      date: '2024-01-23',
      excerpt: '재사용 가능하고 유지보수하기 쉬운 React 컴포넌트를 만드는 방법을 알아보세요.',
      readTime: '12분'
    }
  ];

  return (
    <div className={styles.category}>
      <header className={styles.category__header}>
        <h1 className={styles.category__title}>React</h1>
        <p className={styles.category__description}>
          현대적인 웹 애플리케이션 개발의 핵심, React를 깊이 있게 다룹니다. 
          컴포넌트 기반 개발부터 상태 관리까지 실무 중심의 내용을 제공합니다.
        </p>
        <div className={styles.category__stats}>
          <span className={styles.category__stat}>📝 {posts.length}개의 포스트</span>
          <span className={styles.category__stat}>🏷️ Hooks, 컴포넌트, 상태관리</span>
        </div>
      </header>
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
            <button className={styles.category__postButton}>자세히 보기 →</button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ReactCategory;
