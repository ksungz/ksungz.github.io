"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category?: string;
}

interface Props {
  allPosts: PostMeta[];
  featuredPosts: PostMeta[];
  digestPosts: PostMeta[];
  postsByCategory: { label: string; posts: PostMeta[] }[];
}

const tabs = [
  { id: "featured", label: "Start Here" },
  { id: "all", label: "All" },
  { id: "Engineering", label: "Engineering" },
  { id: "AI Engineering", label: "AI Engineering" },
  { id: "Automation", label: "Automation" },
  { id: "digest", label: "Digest" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function EngineeringClient({
  allPosts,
  featuredPosts,
  digestPosts,
  postsByCategory,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("featured");

  function getPostsForTab(tab: TabId): PostMeta[] {
    if (tab === "featured") return featuredPosts;
    if (tab === "all") return allPosts;
    if (tab === "digest") return digestPosts;
    const cat = postsByCategory.find((c) => c.label === tab);
    return cat ? cat.posts : [];
  }

  const visiblePosts = getPostsForTab(activeTab);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-10 sm:mb-12">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-3">Engineering</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">엔지니어링 노트</h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xl">
          기술 구현, AI 도입, 자동화 과정에서 배운 것을 기록합니다.
        </p>
      </section>

      {/* 탭 */}
      <div className="mb-8 sm:mb-10 flex gap-1 border-b border-[var(--color-border)] overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const count = getPostsForTab(tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px whitespace-nowrap min-h-[44px] ${
                activeTab === tab.id
                  ? "border-[var(--color-foreground)] text-[var(--color-foreground)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {tab.label} <span className="text-[var(--color-muted)]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* 글 목록 */}
      {visiblePosts.length > 0 ? (
        <div className="grid gap-3">
          {visiblePosts.map((post) => (
            <Card
              key={post.slug}
              href={`/engineering/${post.slug}`}
              title={post.title}
              description={post.description}
              meta={post.date}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] p-6 sm:p-10 text-center">
          <p className="text-sm text-[var(--color-muted)]">해당 카테고리에 글이 없습니다.</p>
        </div>
      )}

    </div>
  );
}
