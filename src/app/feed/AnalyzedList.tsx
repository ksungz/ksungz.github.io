"use client";

import type { FeedArticle } from "@/lib/feed-data";

interface AnalyzedListProps {
  items: FeedArticle[];
}

export function AnalyzedList({ items }: AnalyzedListProps) {
  return (
    <div className="analyzed-list">
      {items.length === 0 && (
        <div className="feed-empty">대기 중인 글이 없습니다.</div>
      )}
      {items.map((item) => (
        <div key={item.id} className="analyzed-item">
          <span className={`feed-card-cat ${item.source_category}`}>
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
  );
}