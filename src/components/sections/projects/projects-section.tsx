"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  FiArrowRight,
  FiChevronDown,
  FiExternalLink,
  FiGithub,
} from "react-icons/fi";

import { usePageTransition } from "@/components/common/page-transition";
import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { projects } from "@/constants/projects";

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { navigate } = usePageTransition();

  return (
    <Section
      id="projects"
      title="Projects"
      count={projects.length}
      contentClassName="p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {projects.map((project) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="screen-line-after"
            >
              {/* Project header - clickable */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-surface ${
                  isExpanded
                    ? "border-l-2 border-l-accent"
                    : "border-l-2 border-l-transparent"
                }`}
              >
                {/* Initial avatar */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge bg-surface text-xs font-bold text-text-primary">
                  {project.title.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text-primary">
                      {project.title}
                    </p>
                    {project.featured && (
                      <span className="bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
                        Featured
                      </span>
                    )}
                    {project.status && (
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium ${
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
                  </div>
                  <p className="text-xs text-text-muted truncate">
                    {project.description}
                  </p>
                </div>

                {/* Expand indicator */}
                <FiChevronDown
                  className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-edge px-4 py-3 space-y-3">
                      {/* Full description */}
                      <p className="text-xs leading-relaxed text-text-secondary">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 marker:text-gray-400">
                          {project.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-xs leading-relaxed text-text-secondary"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.technologies.map((tech) => (
                          <TechBadge key={tech} name={tech} />
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => navigate(`/projects/${project.slug}`)}
                          className="inline-flex items-center gap-1.5 border border-edge bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-surface-hover hover:border-border active:scale-[0.98]"
                          aria-label={`View details for ${project.title}`}
                        >
                          View details
                          <FiArrowRight className="h-3 w-3" />
                        </button>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-edge px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary active:scale-[0.98]"
                            aria-label={`View source code for ${project.title} on GitHub`}
                          >
                            <FiGithub className="h-3 w-3" />
                            Source
                          </a>
                        )}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-edge px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary active:scale-[0.98]"
                          aria-label={`Visit ${project.title} live site`}
                        >
                          <FiExternalLink className="h-3 w-3" />
                          Visit
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
