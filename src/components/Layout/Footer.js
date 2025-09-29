import React from 'react';
import styles from './Footer.module.scss';

/**
 * Footer 컴포넌트 - 사이트 하단 정보
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <p className={styles.footer__copyright}>
            © {currentYear} 성재의 개발 블로그. All rights reserved.
          </p>
          <div className={styles.footer__links}>
            <a 
              href="https://github.com/ksungz" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              GitHub
            </a>
            <a 
              href="mailto:your.email@example.com"
              className={styles.footer__link}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
