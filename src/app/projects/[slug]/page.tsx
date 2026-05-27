import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";

import { ArticleTocTracker } from "@/components/common/article-toc-tracker";
import { TransitionLink } from "@/components/common/page-transition";
import { Separator } from "@/components/common/separator";
import { TechBadge } from "@/components/common/tech-badge";

import { Footer } from "@/components/common/footer";
import {
  extractMarkdownHeadings,
  getArticleHeadingComponents,
} from "@/lib/mdx";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Vicky Gupta`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const tocHeadings = extractMarkdownHeadings(project.content, 2, 3);
  const articleHeadingComponents = getArticleHeadingComponents();

  return (
    <main className="w-full overflow-x-hidden pt-11 mt-3 pb-20 sm:pt-12 sm:mt-4 sm:pb-28">
      <div className="mx-auto md:max-w-3xl">
        {/* Back link */}
        <section className="screen-line-before screen-line-after border-x border-edge">
          <div className="px-3 py-4 sm:px-4 sm:py-6">
            <TransitionLink
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary sm:text-sm"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              All projects
            </TransitionLink>
          </div>
        </section>

        <Separator />

        {/* Header */}
        <section className="screen-line-before screen-line-after border-x border-edge">
          <header className="screen-line-after px-3 py-4 sm:px-4 sm:py-6">
            <div className="mb-2 flex items-center gap-2 sm:gap-3">
              {project.status && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-medium sm:text-[10px] ${
                    project.status === "live"
                      ? "bg-green-500/10 text-green-600"
                      : project.status === "building"
                        ? "bg-yellow-500/10 text-yellow-600"
                        : "bg-zinc-500/10 text-zinc-500"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "live"
                        ? "bg-green-500"
                        : project.status === "building"
                          ? "bg-yellow-500"
                          : "bg-zinc-400"
                    }`}
                  />
                  {project.status === "live"
                    ? "Live"
                    : project.status === "building"
                      ? "Building"
                      : "Archived"}
                </span>
              )}
              {project.featured && (
                <span className="bg-accent/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-accent sm:text-[9px]">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-text-primary text-balance sm:text-3xl">
              {project.title}
            </h1>

            <p className="mt-2 text-xs text-text-secondary leading-relaxed sm:text-sm">
              {project.description}
            </p>

            {/* Action links */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent px-3.5 py-1.5 text-xs font-medium text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.98] sm:px-4 sm:py-2 sm:text-sm"
              >
                <FiExternalLink className="h-3.5 w-3.5" />
                Visit Project
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-edge px-3.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary sm:px-4 sm:py-2 sm:text-sm"
                >
                  <FiGithub className="h-3.5 w-3.5" />
                  Source Code
                </a>
              )}
            </div>
          </header>

          {/* Screenshot */}
          {project.screenshot && (
            <div className="screen-line-after">
              <div className="relative aspect-video overflow-hidden bg-surface">
                <Image
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="px-3 py-4 screen-line-after sm:px-4 sm:py-6">
            <h2 className="text-xs font-semibold text-text-primary mb-3 sm:text-sm">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* MDX Content */}
        <article className="screen-line-before screen-line-after border-x border-edge">
          <div className="p-3 sm:p-4">
            <div className="article-prose font-hanken-grotesk">
              <MDXRemote
                source={project.content}
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
          </div>
        </article>

        <Separator />
        <Footer />
        <Separator />
      </div>

      <ArticleTocTracker headings={tocHeadings} />
    </main>
  );
}
