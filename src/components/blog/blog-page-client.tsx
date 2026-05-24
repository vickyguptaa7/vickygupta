"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { BlogPostRow } from "@/components/blog/blog-post-row";
import type { BlogPost } from "@/lib/blog";

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  initialTags: string[];
}

export function BlogPageClient({
  initialPosts,
  initialTags,
}: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");

  const filteredPosts = selectedTag
    ? initialPosts.filter((post) =>
        post.tags.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
        ),
      )
    : initialPosts;

  const handleTagClick = (tag: string | null) => {
    if (!tag) {
      router.replace("/blog", { scroll: false });
      return;
    }

    router.replace(`/blog?tag=${encodeURIComponent(tag)}`, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-10">
      <section className="space-y-4 pt-2">
        <div className="space-y-2 pb-4">
          <h1 className="text-2xl font-bold text-text-primary">Blog</h1>
          <p className="max-w-xl text-sm leading-6 text-[#909092] md:text-base">
            Thoughts, tutorials, and insights on engineering and programming.
          </p>
        </div>

        {initialTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleTagClick(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedTag
                  ? "bg-surface text-[#909092] hover:bg-surface-hover hover:text-text-primary"
                  : "bg-text-primary text-background"
              }`}
            >
              All
            </button>

            {initialTags.map((tag) => {
              const isSelected = selectedTag === tag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(isSelected ? null : tag)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-text-primary text-background"
                      : "bg-surface text-[#909092] hover:bg-surface-hover hover:text-text-primary"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        <div className="blog-list">
          {filteredPosts.map((post) => (
            <BlogPostRow key={post.slug} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="border-b border-border/70 py-10 text-center text-[#909092]">
              No posts found for this filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
