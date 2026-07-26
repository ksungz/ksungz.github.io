import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const SITE_URL = "https://ksungz-github-io.vercel.app";

const staticRoutes = [
  "",
  "/products",
  "/case-studies",
  "/case-studies/developer-workflow-ax",
  "/case-studies/ax-doctor",
  "/case-studies/ax-evidence-gates",
  "/case-studies/agent-bridge",
  "/case-studies/obsidian-rag",
  "/case-studies/news-automation",
  "/case-studies/babypick-ai",
  "/engineering",
  "/career",
  "/about",
  "/portfolio",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/products" || route === "/case-studies" ? 0.9 : 0.7,
  }));

  const articles: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/engineering/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...articles];
}
