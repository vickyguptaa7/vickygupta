import fs from "fs";
import matter from "gray-matter";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  published: boolean;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        image: data.image,
        published: data.published !== false,
        content,
      } satisfies BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    image: data.image,
    published: data.published !== false,
    content,
  };
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const posts = getAllPosts();
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return [];
  }

  const currentTags = new Set(currentPost.tags.map((tag) => tag.toLowerCase()));

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTagCount = post.tags.filter((tag) =>
        currentTags.has(tag.toLowerCase()),
      ).length;

      return { post, sharedTagCount };
    })
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }

      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
