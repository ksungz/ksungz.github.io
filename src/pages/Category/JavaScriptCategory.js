import React from 'react';
import styles from './Category.module.scss';

const JavaScriptCategory = () => {
  const posts = [
    {
      id: 1,
      title: 'ES6+ 문법 정리 및 활용법',
      date: '2024-01-24',
      excerpt: '화살표 함수, 구조분해할당, 스프레드 연산자 등 모던 JavaScript 문법을 마스터하세요.',
      readTime: '12분'
    },
    {
      id: 2,
      title: '비동기 처리: Promise와 async/await',
      date: '2024-01-21',
      excerpt: 'JavaScript의 비동기 처리 방식을 이해하고 실무에서 활용하는 방법을 알아보세요.',
      readTime: '10분'
    }
  ];

  return (
    <div className={styles.category}>
      <header className={styles.category__header}>
        <h1 className={styles.category__title}>JavaScript</h1>
        <p className={styles.category__description}>
          웹을 동적으로 만드는 JavaScript의 세계를 탐험합니다. 
          기본 문법부터 고급 개념까지, 실무에서 바로 활용할 수 있는 내용들을 다룹니다.
        </p>
        <div className={styles.category__stats}>
          <span className={styles.category__stat}>📝 {posts.length}개의 포스트</span>
          <span className={styles.category__stat}>🏷️ ES6+, 비동기, DOM</span>
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

export default JavaScriptCategory;
