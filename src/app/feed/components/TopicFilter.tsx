interface TopicItem {
  tag: string;
  count: number;
}

interface TopicFilterProps {
  topics: TopicItem[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
}

export function TopicFilter({ topics, activeTag, onSelect }: TopicFilterProps) {
  if (topics.length === 0) return null;

  return (
    <div className="feed-topic-section">
      <div className="feed-topic-header">이번 주 토픽</div>
      <div className="feed-topic-chips">
        <button
          onClick={() => onSelect(null)}
          className={`topic-chip ${activeTag === null ? "active" : ""}`}
        >
          전체
        </button>
        {topics.map((t) => {
          const isActive = activeTag === t.tag;
          return (
            <button
              key={t.tag}
              onClick={() => onSelect(isActive ? null : t.tag)}
              className={`topic-chip ${isActive ? "active" : ""}`}
            >
              {t.tag}
              <span className="topic-chip-count">{t.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}