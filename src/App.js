import logo from './logo.svg';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <img src={logo} className={styles.app__logo} alt="logo" />
        <h1 className={`${styles.app__title} ${styles['app__title--highlighted']}`}>
          Welcome to ksungz.github.io
        </h1>
        <p className={styles.app__description}>
          React with SCSS CSS Modules + BEM is working!
        </p>
        
        <div className={styles.app__features}>
          <div className={`${styles['app__features-item']} ${styles['app__features-item--highlight']}`}>
            ⚛️ React 19.1.1 with Latest Features
          </div>
          <div className={styles['app__features-item']}>
            🎨 SCSS CSS Modules + BEM Methodology
          </div>
          <div className={styles['app__features-item']}>
            🚀 GitHub Pages Deployment Ready
          </div>
          <div className={styles['app__features-item']}>
            📝 Personal Blog Platform
          </div>
        </div>
        
        <a
          className={`${styles.app__link} ${styles['app__link--button']}`}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        <a
          className={styles.app__link}
          href="https://github.com/ksungz/ksungz.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source Code
        </a>
      </header>
    </div>
  );
}

export default App;
