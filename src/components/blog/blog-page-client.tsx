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

        {initialTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleTagClick(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
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
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
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
