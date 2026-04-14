import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface ProjectMeta {
  slug: string;
  title: string;
  period: string;
  company: string;
  role: string;
  description: string;
  tags: string[];
}

export interface Project extends ProjectMeta {
  content: string;
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        period: data.period ?? "",
        company: data.company ?? "",
        role: data.role ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
      };
    });
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    period: data.period ?? "",
    company: data.company ?? "",
    role: data.role ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    content,
  };
}
