import { Hash } from "lucide-react";

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
    <section className="feed-topic-section" aria-labelledby="topic-title">
      <div id="topic-title" className="feed-topic-header">
        이번 주 토픽
      </div>
      <div className="feed-topic-chips">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`topic-chip ${activeTag === null ? "active" : ""}`}
        >
          전체
        </button>
        {topics.map((topic) => {
          const isActive = activeTag === topic.tag;
          return (
            <button
              type="button"
              key={topic.tag}
              onClick={() => onSelect(isActive ? null : topic.tag)}
              className={`topic-chip ${isActive ? "active" : ""}`}
            >
              <Hash aria-hidden="true" size={12} />
              {topic.tag}
              <span className="topic-chip-count">{topic.count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
