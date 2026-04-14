import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");

export interface DocMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  badge: string;
  context: string;
  backHref: string;
  backLabel: string;
}

export interface Doc extends DocMeta {
  content: string;
}

export function getAllDocs(): DocMeta[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        category: data.category ?? "",
        badge: data.badge ?? "",
        context: data.context ?? "",
        backHref: data.backHref ?? "/career",
        backLabel: data.backLabel ?? "경력기술서",
      };
    });
}

export function getDocBySlug(slug: string): Doc | null {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    category: data.category ?? "",
    badge: data.badge ?? "",
    context: data.context ?? "",
    backHref: data.backHref ?? "/career",
    backLabel: data.backLabel ?? "경력기술서",
    content,
  };
}
