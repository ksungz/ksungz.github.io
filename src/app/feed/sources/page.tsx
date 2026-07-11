import Link from "next/link";
import { ExternalLink, Radio } from "lucide-react";
import {
  fetchCategories,
  fetchFeedCounts,
  fetchSources,
} from "@/lib/feed-data";
import { CategorySidebar } from "../components/CategorySidebar";
import { FeedSidebar } from "../components/FeedSidebar";
import "../feed.css";

export const dynamic = "force-dynamic";

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Seoul",
});

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "수집 기록 없음";
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime())
    ? "수집 기록 없음"
    : DATE_FORMATTER.format(date);
}

export default async function SourcesPage() {
  const [sources, categories, counts] = await Promise.all([
    fetchSources(),
    fetchCategories(),
    fetchFeedCounts({ publicOnly: true }),
  ]);

  return (
    <div className="feed-layout">
      <div className="feed-left-sidebar">
        <CategorySidebar
          activeCat="all"
          categories={categories}
          totalCount={counts.total}
        />
      </div>

      <main className="feed-main">
        <div className="feed-breadcrumb">
          <Link href="/feed">피드</Link>
          <span>/</span>
          <span className="feed-breadcrumb-current">출처</span>
        </div>

        <header className="feed-page-header">
          <Radio aria-hidden="true" size={20} />
          <div>
            <h1>큐레이션 출처</h1>
            <p className="feed-page-header-desc">
              활성 {sources.length}개 매체 · {counts.total.toLocaleString()}건
            </p>
          </div>
        </header>

        <div className="source-list">
          {sources.map((source) => (
            <article key={source.id} className="source-item">
              <div className="source-item-main">
                <div className="source-item-name">{source.name}</div>
                <div className="source-item-meta">
                  <span className="source-type">
                    {source.type === "youtube" ? "YouTube" : "RSS"}
                  </span>
                  <span>최근 {formatDate(source.latest_collected)}</span>
                </div>
              </div>
              <div className="source-item-count-wrap">
                <strong className="source-item-count">
                  {source.article_count.toLocaleString()}
                </strong>
                <span className="source-item-count-label">건</span>
              </div>
              {source.feed_url && (
                <a
                  href={source.feed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-feed-link"
                  title="피드 원본 열기"
                >
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              )}
            </article>
          ))}
        </div>
      </main>

      <FeedSidebar counts={counts} />
    </div>
  );
}
