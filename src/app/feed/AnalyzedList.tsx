"use client";

import type { FeedArticle } from "@/lib/feed-data";

interface AnalyzedListProps {
  items: FeedArticle[];
}

export function AnalyzedList({ items }: AnalyzedListProps) {
  return (
    <>
      <div className="feed-header">
        <h1>📝 분석됨 · 포스팅 대기</h1>
        <p className="feed-header-desc">
          분석했지만 아직 블로그 초안 안 만든 글
        </p>
      </div>

      <div className="analyzed-list">
        {items.length === 0 && (
          <div className="feed-empty">대기 중인 글이 없습니다.</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="analyzed-item">
            <span className={`source-badge ${item.source_category}`}>
              {item.source_name}
            </span>
            <span className="ai-title">{item.title}</span>
            <button
              className="pr-btn"
              onClick={() =>
                alert(
                  "Ollama Cloud 분석 → MDX 생성 → GitHub PR 생성\n(실제 구현 시 API 라우트로 실행)"
                )
              }
            >
              블로그 PR
            </button>
          </div>
        ))}
      </div>
    </>
  );
}