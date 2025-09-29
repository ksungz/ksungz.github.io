import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

/**
 * Navigation 컴포넌트 - 메인 네비게이션 메뉴
 * 드롭다운 카테고리 메뉴 포함
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' }
  ];

  const categoryItems = [
    { path: '/category/html', label: 'HTML' },
    { path: '/category/css', label: 'CSS' },
    { path: '/category/javascript', label: 'JavaScript' },
    { path: '/category/react', label: 'React' },
    { path: '/category/daily', label: '일상' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.nav}>
      {/* 모바일 햄버거 메뉴 버튼 */}
      <button 
        className={styles.nav__toggle}
        onClick={toggleMenu}
        aria-label="메뉴 열기/닫기"
      >
        <span className={styles.nav__hamburger}></span>
        <span className={styles.nav__hamburger}></span>
        <span className={styles.nav__hamburger}></span>
      </button>

      {/* 네비게이션 메뉴 */}
      <ul className={`${styles.nav__menu} ${isMenuOpen ? styles['nav__menu--open'] : ''}`}>
        {menuItems.map((item) => (
          <li key={item.path} className={styles.nav__item}>
            <Link 
              to={item.path}
              className={`${styles.nav__link} ${isActive(item.path) ? styles['nav__link--active'] : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
        
        {/* Category 드롭다운 메뉴 */}
        <li className={`${styles.nav__item} ${styles['nav__item--dropdown']}`}>
          <button 
            className={`${styles.nav__link} ${styles['nav__link--dropdown']} ${location.pathname.startsWith('/category') ? styles['nav__link--active'] : ''}`}
            onClick={toggleCategory}
            aria-expanded={isCategoryOpen}
          >
            Category
            <span className={`${styles.nav__arrow} ${isCategoryOpen ? styles['nav__arrow--open'] : ''}`}>
              ▼
            </span>
          </button>
          
          <ul className={`${styles.nav__dropdown} ${isCategoryOpen ? styles['nav__dropdown--open'] : ''}`}>
            {categoryItems.map((item) => (
              <li key={item.path} className={styles.nav__dropdownItem}>
                <Link 
                  to={item.path}
                  className={`${styles.nav__dropdownLink} ${isActive(item.path) ? styles['nav__dropdownLink--active'] : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCategoryOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
