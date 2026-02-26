import { FiArrowRight } from "react-icons/fi";

import { TransitionLink } from "@/components/common/page-transition";
import { Section } from "@/components/common/section";

import { getLatestPosts } from "@/lib/blog";

export function BlogSection() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <Section id="blog" title="Blog" count={posts.length} contentClassName="p-0">
      <div>
        {posts.map((post) => (
          <TransitionLink
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-4 px-4 py-4 transition-colors hover:bg-surface screen-line-after"
          >
            {/* Date */}
            <time className="shrink-0 pt-0.5 font-mono text-xs text-text-muted tabular-nums">
              {formatDate(post.date)}
            </time>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary line-clamp-2">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface px-2 py-0.5 text-[10px] font-medium text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Arrow */}
            <FiArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
          </TransitionLink>
        ))}
      </div>

      {/* View all link */}
      <div className="px-4 py-3 screen-line-after">
        <TransitionLink
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-accent"
        >
          All posts
          <FiArrowRight className="h-3 w-3" />
        </TransitionLink>
      </div>
    </Section>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
