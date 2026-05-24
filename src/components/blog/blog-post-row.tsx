import { TransitionLink } from "@/components/common/page-transition";
import type { BlogPost } from "@/lib/blog";

interface BlogPostRowProps {
  post: BlogPost;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostRow({ post }: BlogPostRowProps) {
  return (
    <article className="blog-list-item border-b border-border/70 py-4 last:border-b-0">
      <TransitionLink
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-[#909092]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-tight text-text-primary transition-colors group-hover:text-text-primary/80 sm:text-xl">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-sm leading-6 text-[#909092]">
              {post.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
          <time className="text-xs text-[#909092] sm:text-right">
            {formatDate(post.date)}
          </time>
          <span className="text-sm font-medium text-[#909092] transition-colors group-hover:text-text-primary">
            Read more
          </span>
        </div>
      </TransitionLink>
    </article>
  );
}
