"use client";

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
    <div
      className="flex gap-2 overflow-x-auto py-2 px-4"
      style={{
        borderBottom: "1px solid #1f1f1f",
        scrollbarWidth: "none",
      }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      <button
        onClick={() => onSelect(null)}
        className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
        style={{
          background: activeTag === null ? "#fff" : "transparent",
          color: activeTag === null ? "#000" : "#999",
          border: activeTag === null
            ? "1px solid #fff"
            : "1px solid #2a2a2a",
        }}
      >
        전체
      </button>
      {topics.map((t) => {
        const isActive = activeTag === t.tag;
        return (
          <button
            key={t.tag}
            onClick={() => onSelect(isActive ? null : t.tag)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
            style={{
              background: isActive ? "#fff" : "transparent",
              color: isActive ? "#000" : "#999",
              border: isActive
                ? "1px solid #fff"
                : "1px solid #2a2a2a",
            }}
          >
            {t.tag}
            <span
              className="ml-1.5"
              style={{ opacity: isActive ? 0.5 : 0.6 }}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}