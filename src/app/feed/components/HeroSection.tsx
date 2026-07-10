import { Newspaper } from "lucide-react";

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
    <section className="feed-hero" aria-labelledby="feed-title">
      <div className="feed-hero-content">
        <div className="feed-hero-label">Info Feed</div>
        <h1 id="feed-title">테크 · 비즈니스 뉴스 큐레이션</h1>
        <p className="feed-hero-desc">원문과 자동 요약, 상세 분석을 한곳에서 확인합니다.</p>
        <div className="feed-hero-stats" aria-label="피드 현황">
          <div className="feed-hero-stat">
            <span className="feed-hero-stat-value">{sourceCount}</span>
            <span className="feed-hero-stat-unit">활성 소스</span>
          </div>
          <div className="feed-hero-stat">
            <span className="feed-hero-stat-value">{articleCount.toLocaleString()}</span>
            <span className="feed-hero-stat-unit">수집 기사</span>
          </div>
          <div className="feed-hero-stat">
            <span className="feed-hero-stat-value">{categoryCount}</span>
            <span className="feed-hero-stat-unit">카테고리</span>
          </div>
        </div>
      </div>
      <div className="feed-hero-mark" aria-hidden="true">
        <Newspaper size={42} strokeWidth={1.5} />
      </div>
    </section>
  );
}
