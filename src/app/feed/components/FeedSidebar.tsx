import Link from "next/link";
import { Archive, BarChart3, Library, ShieldCheck } from "lucide-react";
import type { FeedCounts } from "@/lib/feed-data";

interface FeedSidebarProps {
  counts: FeedCounts;
}

export function FeedSidebar({ counts }: FeedSidebarProps) {
  return (
    <aside className="feed-right-sidebar" aria-label="피드 정보">
      <div className="feed-right-sidebar-inner">
        <section className="sidebar-card">
          <div className="sidebar-card-title">
            <BarChart3 aria-hidden="true" size={15} />
            현황
          </div>
          <div className="sidebar-stat-row">
            <span className="sidebar-stat-label">수집 기사</span>
            <span className="sidebar-stat-value">{counts.total.toLocaleString()}</span>
          </div>
          <div className="sidebar-stat-row">
            <span className="sidebar-stat-label">상세 분석</span>
            <span className="sidebar-stat-value success">{counts.analyzed.toLocaleString()}</span>
          </div>
          <div className="sidebar-stat-row">
            <span className="sidebar-stat-label">블로그 PR</span>
            <span className="sidebar-stat-value info">{counts.posted.toLocaleString()}</span>
          </div>
        </section>

        <section className="sidebar-card">
          <div className="sidebar-card-title">
            <ShieldCheck aria-hidden="true" size={15} />
            원문 우선
          </div>
          <p className="sidebar-trust-copy">
            자동 생성된 요약과 분석은 원문 링크와 분리해 제공합니다.
          </p>
        </section>

        <nav className="sidebar-card" aria-label="피드 바로가기">
          <Link href="/feed/sources" className="sidebar-link">
            <Library aria-hidden="true" size={14} />
            큐레이션 출처
          </Link>
          <Link href="/feed/archive" className="sidebar-link">
            <Archive aria-hidden="true" size={14} />
            전체 아카이브
          </Link>
        </nav>
      </div>
    </aside>
  );
}
