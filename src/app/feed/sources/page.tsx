import Link from "next/link";
import { fetchSources } from "@/lib/feed-data";
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

  return (
    <div className="feed-root" style={{ paddingBottom: 80 }}>
      {/* 헤더 */}
      <div className="feed-header">
        <Link
          href="/feed"
          className="reader-back"
          style={{ marginBottom: 8, marginTop: 0 }}
        >
          ← 피드로 돌아가기
        </Link>
        <h1>📡 큐레이션 출처</h1>
        <div className="feed-header-desc">
          총 {sources.length}개 매체에서 수집 중
        </div>
      </div>

      {/* 매체 카드 그리드 */}
      <div style={{ padding: "20px 20px 80px" }}>
        {sources.length === 0 ? (
          <div className="feed-empty">
            등록된 큐레이션 출처가 없습니다.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            {sources.map((src) => {
              const catColor =
                CATEGORY_COLORS[src.category] || "#888";
              const catLabel =
                CATEGORY_LABELS[src.category] || src.category;
              return (
                <div
                  key={src.id}
                  style={{
                    background: "#111",
                    border: "1px solid #1f1f1f",
                    borderRadius: 10,
                    padding: 16,
                    transition: "border-color 0.15s",
                  }}
                >
                  {/* 상단: 매체명 + 카테고리 배지 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#e4e4e4",
                        lineHeight: 1.3,
                        flex: 1,
                        paddingRight: 8,
                      }}
                    >
                      {src.name}
                    </h3>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: `${catColor}22`,
                        color: catColor,
                        whiteSpace: "nowrap",
                        border: `1px solid ${catColor}44`,
                      }}
                    >
                      {catLabel}
                    </span>
                  </div>

                  {/* 기사 수 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#999" }}>
                      📄 기사
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#e4e4e4",
                      }}
                    >
                      {src.article_count}
                    </span>
                    <span style={{ fontSize: 12, color: "#666" }}>개</span>
                  </div>

                  {/* 최근 수집 시간 */}
                  <div
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 12,
                    }}
                  >
                    🕐 최근 수집: {formatDate(src.latest_collected)}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}