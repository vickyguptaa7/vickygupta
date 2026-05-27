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
    <article className="blog-list-item border-b border-border/70 py-3 last:border-b-0 sm:py-4">
      <TransitionLink
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-[#909092] sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-semibold leading-tight text-text-primary transition-colors group-hover:text-text-primary/80 sm:text-xl">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-xs leading-5 text-[#909092] sm:text-sm sm:leading-6">
              {post.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start sm:gap-4">
          <time className="text-[11px] text-[#909092] sm:text-right sm:text-xs">
            {formatDate(post.date)}
          </time>
          <span className="text-xs font-medium text-[#909092] transition-colors group-hover:text-text-primary sm:text-sm">
            Read more
          </span>
        </div>
      </TransitionLink>
    </article>
  );
}
