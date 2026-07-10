interface HeroSectionProps {
  sourceCount: number;
  articleCount: number;
  categoryCount: number;
}

export function HeroSection({
  sourceCount,
  articleCount,
  categoryCount,
}: HeroSectionProps) {
  return (
    <div className="feed-hero">
      <div className="feed-hero-content">
        <div className="feed-hero-label">Info Feed</div>
        <h1>테크 · 비즈니스 뉴스 큐레이션</h1>
        <p className="feed-hero-desc">
          개발 · 비즈니스 · 소셜 미디어의 주요 흐름을 한곳에서
        </p>
        <div className="feed-hero-stats">
          <div className="feed-hero-stat">
            <span className="feed-hero-stat-value">{sourceCount}</span>
            <span className="feed-hero-stat-unit">개 소스</span>
          </div>
          <span className="feed-hero-stat-label">·</span>
          <div className="feed-hero-stat">
            <span className="feed-hero-stat-value">{articleCount.toLocaleString()}</span>
            <span className="feed-hero-stat-unit">건 기사</span>
          </div>
          <span className="feed-hero-stat-label">·</span>
          <div className="feed-hero-stat">
            <span className="feed-hero-stat-value">{categoryCount}</span>
            <span className="feed-hero-stat-unit">개 카테고리</span>
          </div>
        </div>
      </div>
      <div className="feed-hero-deco">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="64" height="56" rx="8" stroke="#333" strokeWidth="2" />
          <line x1="8" y1="26" x2="72" y2="26" stroke="#333" strokeWidth="2" />
          <circle cx="16" cy="19" r="2" fill="#fe6500" />
          <circle cx="23" cy="19" r="2" fill="#444" />
          <circle cx="30" cy="19" r="2" fill="#444" />
          <rect x="16" y="34" width="48" height="4" rx="2" fill="#222" />
          <rect x="16" y="44" width="36" height="4" rx="2" fill="#1a1a1a" />
          <rect x="16" y="54" width="40" height="4" rx="2" fill="#1a1a1a" />
        </svg>
      </div>
    </div>
  );
}