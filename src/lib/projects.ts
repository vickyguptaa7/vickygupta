import fs from "fs";
import matter from "gray-matter";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface Project {
  slug: string;
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  technologies: string[];
  screenshot?: string;
  status?: "live" | "building" | "archived";
  featured?: boolean;
  content: string;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(PROJECTS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        url: data.url || "",
        githubUrl: data.githubUrl,
        technologies: data.technologies || [],
        screenshot: data.screenshot,
        status: data.status,
        featured: data.featured || false,
        content,
      } satisfies Project;
    })
    .sort((a, b) => {
      // Featured projects first, then by title
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return a.title.localeCompare(b.title);
    });

  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    url: data.url || "",
    githubUrl: data.githubUrl,
    technologies: data.technologies || [],
    screenshot: data.screenshot,
    status: data.status,
    featured: data.featured || false,
    content,
  };
}
