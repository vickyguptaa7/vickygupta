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
    <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-8 md:py-10">
      <section className="space-y-3 pt-2 sm:space-y-4">
        <div className="space-y-1.5 pb-3 sm:space-y-2 sm:pb-4">
          <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
            Blog
          </h1>
          <p className="max-w-xl text-xs leading-5 text-[#909092] sm:text-sm sm:leading-6 md:text-base">
            Thoughts, tutorials, and insights on engineering and programming.
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-text-primary px-3 py-1.5 text-xs font-medium text-background sm:text-sm">
              All
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-[#909092] sm:text-sm"
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
