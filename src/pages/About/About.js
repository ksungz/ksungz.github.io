import React from 'react';
import styles from './About.module.scss';

/**
 * About 페이지 컴포넌트 - 개발자 소개 페이지
 */
const About = () => {
  const skills = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3/SCSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Git/GitHub', level: 70 }
  ];

  return (
    <div className={styles.about}>
      {/* 프로필 섹션 */}
      <section className={styles.about__profile}>
        <div className={styles.about__profileContent}>
          <div className={styles.about__avatar}>
            <div className={styles.about__avatarPlaceholder}>
              👨‍💻
            </div>
          </div>
          <div className={styles.about__info}>
            <h1 className={styles.about__name}>김성재</h1>
            <p className={styles.about__title}>Frontend Developer</p>
            <p className={styles.about__description}>
              웹 개발에 열정을 가진 프론트엔드 개발자입니다. 
              사용자 경험을 중시하며, 깔끔하고 효율적인 코드를 작성하는 것을 지향합니다.
              새로운 기술을 배우고 적용하는 것을 즐기며, 지속적인 성장을 추구합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className={styles.about__skills}>
        <h2 className={styles.about__sectionTitle}>기술 스택</h2>
        <div className={styles.about__skillsList}>
          {skills.map((skill) => (
            <div key={skill.name} className={styles.about__skill}>
              <div className={styles.about__skillHeader}>
                <span className={styles.about__skillName}>{skill.name}</span>
                <span className={styles.about__skillLevel}>{skill.level}%</span>
              </div>
              <div className={styles.about__skillBar}>
                <div 
                  className={styles.about__skillProgress}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 관심사 섹션 */}
      <section className={styles.about__interests}>
        <h2 className={styles.about__sectionTitle}>관심사</h2>
        <div className={styles.about__interestsList}>
          <div className={styles.about__interest}>
            <h3>🎨 UI/UX 디자인</h3>
            <p>사용자 중심의 인터페이스 설계와 접근성 향상에 관심이 많습니다.</p>
          </div>
          <div className={styles.about__interest}>
            <h3>⚡ 성능 최적화</h3>
            <p>웹 성능 향상과 사용자 경험 개선을 위한 다양한 기법을 연구합니다.</p>
          </div>
          <div className={styles.about__interest}>
            <h3>🔧 개발 도구</h3>
            <p>효율적인 개발 워크플로우와 도구 활용에 대해 탐구합니다.</p>
          </div>
          <div className={styles.about__interest}>
            <h3>📚 지속적 학습</h3>
            <p>새로운 기술 트렌드를 학습하고 실무에 적용하는 것을 즐깁니다.</p>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className={styles.about__contact}>
        <h2 className={styles.about__sectionTitle}>연락처</h2>
        <div className={styles.about__contactInfo}>
          <a 
            href="https://github.com/ksungz" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.about__contactLink}
          >
            <span>📧</span>
            GitHub
          </a>
          <a 
            href="mailto:your.email@example.com"
            className={styles.about__contactLink}
          >
            <span>💌</span>
            Email
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
