import { FiArrowLeft } from "react-icons/fi";

import { TransitionLink } from "@/components/common/page-transition";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/common/panel";
import { Separator } from "@/components/common/separator";

import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Vicky Gupta",
  description:
    "Thoughts on web development, competitive programming, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="w-full overflow-x-hidden pt-12 mt-4">
      <div className="mx-auto md:max-w-3xl">
        {/* Back link */}
        <Panel>
          <PanelContent className="py-6">
            <TransitionLink
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              Home
            </TransitionLink>
          </PanelContent>
        </Panel>

        <Separator />

        {/* Header */}
        <Panel>
          <PanelHeader className="py-4">
            <PanelTitle>
              Blog
              <PanelTitleSup>
                {String(posts.length).padStart(2, "0")}
              </PanelTitleSup>
            </PanelTitle>
          </PanelHeader>
          <PanelContent>
            <p className="text-sm text-text-secondary">
              Thoughts on web development, competitive programming, and software
              engineering.
            </p>
          </PanelContent>
        </Panel>

        <Separator />

        {/* Post list */}
        <Panel>
          {posts.map((post, index) => (
            <TransitionLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group flex items-start gap-4 px-4 py-4 transition-colors hover:bg-surface ${index > 0 ? "screen-line-before" : ""}`}
            >
              <time className="shrink-0 pt-0.5 font-mono text-xs text-text-muted tabular-nums">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="mt-1 text-xs text-text-secondary line-clamp-2">
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
            </TransitionLink>
          ))}

          {posts.length === 0 && (
            <PanelContent>
              <p className="py-12 text-center text-sm text-text-muted">
                No posts yet. Check back soon!
              </p>
            </PanelContent>
          )}
        </Panel>

        <Separator />
      </div>
    </main>
  );
}
