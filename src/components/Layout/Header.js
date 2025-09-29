import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

/**
 * Header 컴포넌트 - 사이트 로고와 네비게이션을 포함
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <div className={styles.header__logo}>
            <h1 className={styles.header__title}>
              성재의 개발 블로그
            </h1>
            <p className={styles.header__subtitle}>
              Frontend Developer
            </p>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
