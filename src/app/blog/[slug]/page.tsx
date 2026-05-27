import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { BlogPostRow } from "@/components/blog/blog-post-row";
import { TransitionLink } from "@/components/common/page-transition";

import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getArticleHeadingComponents } from "@/lib/mdx";

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
    openGraph: post.image
      ? {
          title: `${post.title} | Vicky Gupta`,
          description: post.description,
          images: [post.image],
        }
      : undefined,
  };
}

function stripLeadingTitleHeading(content: string, title: string) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingPattern = new RegExp(`^#\\s+${escapedTitle}\\s*\\n+`, "i");

  return content.replace(headingPattern, "");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const articleHeadingComponents = getArticleHeadingComponents();
  const content = stripLeadingTitleHeading(post.content, post.title);

  return (
    <div className="mx-auto max-w-2xl px-3 py-12 sm:px-4 sm:py-16">
      <div className="space-y-9 sm:space-y-12">
        <div>
          <TransitionLink
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-[#909092] transition-colors hover:text-text-primary sm:text-sm"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Blog
          </TransitionLink>
        </div>

        <article className="mx-auto">
          <header className="mb-6 space-y-5 sm:mb-8 sm:space-y-6">
            {post.image && (
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border/70">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-[#909092] sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold leading-tight text-balance text-text-primary sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="text-lg leading-7 text-[#909092] sm:text-xl sm:leading-8">
                {post.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#909092] sm:text-sm">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>

            <div className="h-px w-full bg-border/70" />
          </header>

          <div className="blog-prose font-hanken-grotesk">
            <MDXRemote
              source={content}
              components={articleHeadingComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypeHighlight,
                      {
                        theme: "github-dark",
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="space-y-6">
            <div className="h-px w-full bg-border/70" />
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">
                Related Posts
              </h2>
              <div className="blog-list">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostRow key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="text-center">
          <div className="mb-8 h-px w-full bg-border/70" />
          <TransitionLink
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-text-primary px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-text-primary/90 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            View All Blogs
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
