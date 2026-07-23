import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import EngineeringClient from "./EngineeringClient";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Engineering 블로그 — React, CSS, AI Engineering, Automation, Context Engineering",
};

const categories = [
  { label: "Engineering", keywords: ["React", "CSS", "Storybook", "Lighthouse", "Performance", "Sass", "마크업", "접근성", "반응형", "CDN", "CLS", "PDP"] },
  { label: "AI Engineering", keywords: ["AI", "Prompt", "Context", "Memory", "Tool Calling", "Agent", "RAG", "Ollama", "Hermes", "OpenClaw", "하네스", "에이전트"] },
  { label: "Automation", keywords: ["Automation", "Cursor", "Codex", "Claude", "Telegram", "파이프라인", "자동화", "PR Review", "GeekNews", "Digest"] },
];

function getPostsForKeywords(keywords: string[], allPosts: ReturnType<typeof getAllPosts>, label: string) {
  return allPosts.filter((p) => {
    const tagMatch = p.tags?.some((t) => keywords.some((k) => t.toLowerCase().includes(k.toLowerCase())));
    const titleMatch = keywords.some((k) => p.title.toLowerCase().includes(k.toLowerCase()));
    const descMatch = p.description?.toLowerCase().includes(label.toLowerCase());
    return tagMatch || titleMatch || descMatch;
  });
}

export default function Engineering() {
  const allPosts = getAllPosts().sort((a, b) => (a.date < b.date ? 1 : -1));

  const categorizedSlugs = new Set<string>();
  categories.forEach(({ label, keywords }) => {
    getPostsForKeywords(keywords, allPosts, label).forEach((p) => categorizedSlugs.add(p.slug));
  });
  const uncategorized = allPosts.filter((p) => !categorizedSlugs.has(p.slug));

  const postsByCategory = categories.map(({ label, keywords }) => ({
    label,
    posts: getPostsForKeywords(keywords, allPosts, label),
  }));

  return (
    <EngineeringClient
      allPosts={allPosts}
      postsByCategory={postsByCategory}
      uncategorized={uncategorized}
    />
  );
}