import React from 'react';
import styles from './Category.module.scss';

/**
 * 일상 카테고리 페이지 컴포넌트
 */
const DailyCategory = () => {
  const posts = [
    {
      id: 1,
      title: '개발자가 된 첫 해, 회고록',
      date: '2024-01-25',
      excerpt: '개발을 시작한 지 1년이 지났습니다. 그동안의 경험과 배움, 그리고 앞으로의 목표에 대해 이야기해보려 합니다.',
      readTime: '8분',
      mood: '🤔'
    },
    {
      id: 2,
      title: '코딩 테스트 준비하며 느낀 점',
      date: '2024-01-22',
      excerpt: '알고리즘 문제를 풀면서 논리적 사고력과 문제 해결 능력이 늘어가는 것을 느꼈습니다. 힘들지만 보람찬 과정이었어요.',
      readTime: '6분',
      mood: '💪'
    },
    {
      id: 3,
      title: '첫 프로젝트 배포 후기',
      date: '2024-01-20',
      excerpt: '처음으로 만든 웹사이트를 배포했습니다! 작은 프로젝트였지만 완성했을 때의 뿌듯함은 정말 컸어요.',
      readTime: '5분',
      mood: '🎉'
    },
    {
      id: 4,
      title: '개발자 커뮤니티 참여 후기',
      date: '2024-01-17',
      excerpt: '온라인 개발자 모임에 참여해서 다른 개발자들과 소통했던 경험을 공유합니다. 많은 것을 배울 수 있었어요.',
      readTime: '4분',
      mood: '🤝'
    },
    {
      id: 5,
      title: '개발 공부 루틴 만들기',
      date: '2024-01-15',
      excerpt: '꾸준한 학습을 위한 나만의 공부 루틴을 만들어봤습니다. 어떻게 하면 효율적으로 공부할 수 있을까요?',
      readTime: '6분',
      mood: '📚'
    }
  ];

  return (
    <div className={styles.category}>
      {/* 카테고리 헤더 */}
      <header className={styles.category__header}>
        <h1 className={styles.category__title}>일상 💭</h1>
        <p className={styles.category__description}>
          개발자로서의 일상과 생각들을 솔직하게 기록합니다. 
          성장 과정에서 느낀 점들과 개발 외적인 이야기들을 나눕니다.
        </p>
        <div className={styles.category__stats}>
          <span className={styles.category__stat}>
            📖 {posts.length}개의 이야기
          </span>
          <span className={styles.category__stat}>
            🏷️ 회고, 경험, 성장
          </span>
        </div>
      </header>

      {/* 포스트 목록 */}
      <section className={styles.category__posts}>
        {posts.map((post) => (
          <article key={post.id} className={`${styles.category__post} ${styles['category__post--daily']}`}>
            <div className={styles.category__postHeader}>
              <div className={styles.category__postTitleWrapper}>
                <span className={styles.category__postMood}>{post.mood}</span>
                <h2 className={styles.category__postTitle}>{post.title}</h2>
              </div>
              <div className={styles.category__postMeta}>
                <time className={styles.category__postDate}>{post.date}</time>
                <span className={styles.category__postReadTime}>{post.readTime} 읽기</span>
              </div>
            </div>
            <p className={styles.category__postExcerpt}>{post.excerpt}</p>
            <button className={styles.category__postButton}>
              이야기 읽기 →
            </button>
          </article>
        ))}
      </section>

      {/* 카테고리 특별 섹션 - 개발 여정 */}
      <section className={styles.category__special}>
        <h2 className={styles.category__sectionTitle}>나의 개발 여정 🛤️</h2>
        <div className={styles.category__timeline}>
          <div className={styles.category__timelineItem}>
            <div className={styles.category__timelineDate}>2023.03</div>
            <div className={styles.category__timelineContent}>
              <h3>개발 공부 시작</h3>
              <p>HTML/CSS부터 차근차근 시작한 웹 개발 여정</p>
            </div>
          </div>
          <div className={styles.category__timelineItem}>
            <div className={styles.category__timelineDate}>2023.06</div>
            <div className={styles.category__timelineContent}>
              <h3>JavaScript 입문</h3>
              <p>동적인 웹페이지의 매력에 빠지다</p>
            </div>
          </div>
          <div className={styles.category__timelineItem}>
            <div className={styles.category__timelineDate}>2023.09</div>
            <div className={styles.category__timelineContent}>
              <h3>React 시작</h3>
              <p>컴포넌트 기반 개발의 새로운 세계</p>
            </div>
          </div>
          <div className={styles.category__timelineItem}>
            <div className={styles.category__timelineDate}>2024.01</div>
            <div className={styles.category__timelineContent}>
              <h3>개인 블로그 런칭</h3>
              <p>지금까지의 학습을 정리하고 공유하는 공간 마련</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DailyCategory;
