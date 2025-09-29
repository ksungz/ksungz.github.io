import React from 'react';
import styles from './Category.module.scss';

const CssCategory = () => {
  const posts = [
    {
      id: 1,
      title: 'CSS Grid vs Flexbox 완벽 비교',
      date: '2024-01-22',
      excerpt: 'CSS 레이아웃의 두 강자를 비교하고 언제 어떤 것을 사용해야 하는지 알아보세요.',
      readTime: '8분'
    },
    {
      id: 2,
      title: 'SCSS 활용법과 BEM 방법론',
      date: '2024-01-19',
      excerpt: 'CSS 전처리기 SCSS와 BEM 네이밍 컨벤션으로 유지보수 가능한 스타일 작성하기.',
      readTime: '6분'
    }
  ];

  return (
    <div className={styles.category}>
      <header className={styles.category__header}>
        <h1 className={styles.category__title}>CSS</h1>
        <p className={styles.category__description}>
          아름다운 웹을 만드는 CSS 기술들을 다룹니다. 
          기본 스타일링부터 고급 레이아웃 기법까지 체계적으로 학습해보세요.
        </p>
        <div className={styles.category__stats}>
          <span className={styles.category__stat}>📝 {posts.length}개의 포스트</span>
          <span className={styles.category__stat}>🏷️ 스타일링, 레이아웃, 애니메이션</span>
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

export default CssCategory;
