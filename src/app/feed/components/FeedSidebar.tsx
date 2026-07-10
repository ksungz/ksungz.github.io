"use client";

interface FeedSidebarProps {
  totalCount: number;
  analyzedCount: number;
  postedCount: number;
}

export function FeedSidebar({
  totalCount,
  analyzedCount,
  postedCount,
}: FeedSidebarProps) {
  return (
    <aside
      className="hidden xl:block flex-shrink-0"
      style={{
        width: 240,
        background: "#0a0a0a",
        borderLeft: "1px solid #1f1f1f",
        minHeight: "100vh",
      }}
    >
      <div className="p-5">
        {/* 통계 */}
        <div className="mb-6">
          <h2
            className="text-xs font-bold mb-3"
            style={{ color: "#666" }}
          >
            📊 통계
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "#999" }}>
                전체 기사
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "#e4e4e4" }}
              >
                {totalCount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "#999" }}>
                분석 완료
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "#69db7c" }}
              >
                {analyzedCount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "#999" }}>
                포스팅됨
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "#4dabf7" }}
              >
                {postedCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 바로가기 */}
        <div className="mb-6">
          <h2
            className="text-xs font-bold mb-3"
            style={{ color: "#666" }}
          >
            🔗 바로가기
          </h2>
          <div className="space-y-1.5">
            <a
              href="/feed/sources"
              className="block text-sm py-1.5 transition-colors hover:opacity-100"
              style={{ color: "#999" }}
            >
              📋 소스 관리
            </a>
            <a
              href="/feed/archive"
              className="block text-sm py-1.5 transition-colors hover:opacity-100"
              style={{ color: "#999" }}
            >
              📦 아카이브
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}