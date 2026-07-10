import Link from "next/link";
import { fetchSources } from "@/lib/feed-data";
import { CategorySidebar } from "../components/CategorySidebar";
import { FeedSidebar } from "../components/FeedSidebar";
import "../feed.css";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  dev: "#4dabf7",
  business: "#ffa94d",
  youtube: "#ff6b6b",
  social: "#b197fc",
};

const CATEGORY_LABELS: Record<string, string> = {
  dev: "개발",
  business: "비즈니스",
  youtube: "YouTube",
  social: "소셜",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function SourcesPage() {
  const sources = await fetchSources();
  const totalArticles = sources.reduce((sum, s) => sum + s.article_count, 0);

  return (
    <div className="feed-layout">
      {/* 좌측: 카테고리 사이드바 */}
      <div className="feed-left-sidebar">
        <CategorySidebar activeCat="all" />
      </div>

      {/* 메인 */}
      <main className="feed-main">
        {/* Breadcrumb */}
        <div className="feed-breadcrumb">
          <Link href="/feed">홈</Link>
          <span>/</span>
          <span className="feed-breadcrumb-current">출처</span>
        </div>

        {/* 페이지 헤더 */}
        <div className="feed-page-header">
          <h1>📡 큐레이션 출처</h1>
          <p className="feed-page-header-desc">
            총 {sources.length}개 매체 · {totalArticles.toLocaleString()}건 기사 수집 중
          </p>
        </div>

        {/* 매체 리스트 */}
        <div className="source-list">
          {sources.length === 0 ? (
            <div className="feed-empty">
              등록된 큐레이션 출처가 없습니다.
            </div>
          ) : (
            sources.map((src) => {
              const catColor = CATEGORY_COLORS[src.category] || "#888";
              const catLabel = CATEGORY_LABELS[src.category] || src.category;
              return (
                <div key={src.id} className="source-item">
                  <div style={{ flex: 1 }}>
                    <div className="source-item-name">{src.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: `${catColor}22`,
                          color: catColor,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {catLabel}
                      </span>
                      <span style={{ fontSize: 11, color: "#666" }}>
                        🕐 {formatDate(src.latest_collected)}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span className="source-item-count">{src.article_count}</span>
                    <span className="source-item-count-label">개</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* 우측: 사이드바 */}
      <FeedSidebar
        totalCount={totalArticles}
        analyzedCount={0}
        postedCount={0}
      />
    </div>
  );
}