import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { TransitionLink } from "@/components/common/page-transition";
import { Separator } from "@/components/common/separator";

import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Vicky Gupta`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full overflow-x-hidden pt-12 mt-4">
      <div className="mx-auto md:max-w-3xl">
        {/* Back link */}
        <section className="screen-line-before screen-line-after border-x border-edge">
          <div className="px-4 py-6">
            <TransitionLink
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              All posts
            </TransitionLink>
          </div>
        </section>

        <Separator />

        {/* Header */}
        <article className="screen-line-before screen-line-after border-x border-edge">
          <header className="screen-line-after px-4 py-6">
            <time className="font-mono text-xs text-text-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary text-balance">
              {post.title}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {post.description}
            </p>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface px-2.5 py-0.5 text-xs font-medium text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* MDX Content */}
          <div className="p-4">
            <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-code:rounded prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-none prose-pre:border prose-pre:border-edge prose-pre:bg-surface prose-img:rounded-none">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </article>

        <Separator />
      </div>
    </main>
  );
}
