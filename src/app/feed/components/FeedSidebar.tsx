"use client";

import Link from "next/link";

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
    <div className="feed-right-sidebar">
      <div className="feed-right-sidebar-inner">
        {/* 통계 */}
        <div className="sidebar-card">
          <div className="sidebar-card-title">📊 통계</div>
          <div className="sidebar-stat-row">
            <span className="sidebar-stat-label">전체 기사</span>
            <span className="sidebar-stat-value">{totalCount.toLocaleString()}</span>
          </div>
          <div className="sidebar-stat-row">
            <span className="sidebar-stat-label">분석 완료</span>
            <span className="sidebar-stat-value" style={{ color: "#69db7c" }}>
              {analyzedCount.toLocaleString()}
            </span>
          </div>
          <div className="sidebar-stat-row">
            <span className="sidebar-stat-label">포스팅됨</span>
            <span className="sidebar-stat-value" style={{ color: "#4dabf7" }}>
              {postedCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 바로가기 */}
        <div className="sidebar-card">
          <div className="sidebar-card-title">🔗 바로가기</div>
          <Link href="/feed/sources" className="sidebar-link">
            📋 큐레이션 출처
          </Link>
          <Link href="/feed/archive" className="sidebar-link">
            📦 전체 아카이브
          </Link>
        </div>
      </div>
    </div>
  );
}