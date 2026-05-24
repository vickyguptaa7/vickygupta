import { Suspense } from "react";

import { BlogPostRow } from "@/components/blog/blog-post-row";
import { BlogPageClient } from "@/components/blog/blog-page-client";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata = {
  title: "Blog | Vicky Gupta",
  description:
    "Thoughts on web development, competitive programming, and software engineering.",
};

function BlogPageFallback() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-10">
      <section className="space-y-4 pt-2">
        <div className="space-y-2 pb-4">
          <h1 className="text-2xl font-bold text-text-primary">Blog</h1>
          <p className="max-w-xl text-sm leading-6 text-[#909092] md:text-base">
            Thoughts, tutorials, and insights on engineering and programming.
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-text-primary px-3 py-1.5 text-sm font-medium text-background">
              All
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-[#909092]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="blog-list">
          {posts.map((post) => (
            <BlogPostRow key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Suspense fallback={<BlogPageFallback />}>
      <BlogPageClient initialPosts={posts} initialTags={tags} />
    </Suspense>
  );
}
