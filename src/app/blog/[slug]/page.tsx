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
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="space-y-12">
        <div>
          <TransitionLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#909092] transition-colors hover:text-text-primary"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Blog
          </TransitionLink>
        </div>

        <article className="mx-auto">
          <header className="mb-8 space-y-6">
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

            <div className="space-y-4">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-[#909092]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl font-bold leading-tight text-balance text-text-primary lg:text-5xl">
                {post.title}
              </h1>

              <p className="text-xl leading-8 text-[#909092]">
                {post.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-[#909092]">
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
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-text-primary">
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
            className="inline-flex items-center justify-center rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-text-primary/90"
          >
            View All Blogs
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
