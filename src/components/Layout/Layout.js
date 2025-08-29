import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.scss';

/**
 * Layout 컴포넌트 - 전체 페이지의 기본 구조를 제공
 * Header, Main Content, Footer로 구성
 */
const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
