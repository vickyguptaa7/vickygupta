"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown, FiExternalLink, FiGithub } from "react-icons/fi";

import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { projects } from "@/constants/projects";

interface HoveredAction {
  label: string;
  x: number;
  y: number;
}

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hovered, setHovered] = useState<HoveredAction | null>(null);

  const handleIconHover = useCallback(
    (label: string, e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setHovered({
        label,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    },
    [],
  );

  const handleIconLeave = useCallback(() => setHovered(null), []);

  return (
    <Section
      id="projects"
      title="Projects"
      count={projects.length}
      contentClassName="p-0 sm:p-0"
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
              className="screen-line-after group/btn relative overflow-hidden font-mono transition-colors hover:bg-surface"
            >
              <div className="absolute top-0 left-5 z-1 h-5 w-3.5 bg-surface sm:left-6 sm:h-6 sm:w-4" />
              {/* Project header - clickable */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-all group/btn cursor-pointer sm:gap-3 sm:px-4 sm:py-3.5`}
              >
                {/* Project icon / Initial avatar */}
                <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed border-edge z-1 transition-colors group-hover/btn:border-accent/20 bg-surface sm:h-8 sm:w-8">
                  {project.icon ? (
                    <Image
                      src={project.icon}
                      alt={`${project.title} icon`}
                      width={20}
                      height={20}
                      className="relative z-10 bg-surface object-contain"
                    />
                  ) : (
                    <span className="relative z-10 bg-surface text-[11px] font-bold text-text-primary sm:text-xs">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="pointer-events-none absolute bottom-3 left-[1.625rem] h-screen border-l-[1px] border-dashed border-edge sm:left-8" />
                <div className="pointer-events-none absolute bottom-3 left-[1.625rem] w-2 border-t-[1px] border-dashed border-edge sm:left-8" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-text-primary hero-name-underline relative w-fit sm:text-sm">
                      {project.title}
                    </p>
                    {project.featured && (
                      <span className="bg-accent/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-accent sm:text-[9px]">
                        Featured
                      </span>
                    )}
                    {project.status && (
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium sm:text-[10px] ${
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

                    {/* Action icons */}
                    <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) =>
                            handleIconHover("View source on GitHub", e)
                          }
                          onMouseLeave={handleIconLeave}
                          className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary sm:h-6 sm:w-6"
                        >
                          <FiGithub className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) =>
                            handleIconHover("Visit live site", e)
                          }
                          onMouseLeave={handleIconLeave}
                          className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary sm:h-6 sm:w-6"
                        >
                          <FiExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <FiChevronDown
                  className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-hover/btn:text-accent ${
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
                    <div className="space-y-2.5 pr-3 pb-3 pl-12 sm:space-y-3 sm:pr-4 sm:pb-4 sm:pl-[3.75rem]">
                      {/* Full description */}
                      {project.description.length > 0 && (
                        <p className="text-[11px] leading-relaxed text-text-secondary sm:text-xs">
                          {project.description}
                        </p>
                      )}

                      {/* Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 marker:text-gray-400">
                          {project.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-[11px] leading-relaxed text-text-secondary sm:text-xs"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tech badges - always visible */}
              <div className="-mt-1 flex flex-wrap gap-1 pr-3 pb-2.5 pl-12 sm:pr-4 sm:pb-3 sm:pl-[3.75rem]">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tooltip rendered via portal to escape overflow containers */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <div
                className="pointer-events-none fixed z-9999"
                style={{
                  left: hovered.x,
                  top: hovered.y,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div className="mb-1.5 whitespace-nowrap rounded-md border border-edge bg-background px-2.5 py-1.5 text-[11px] shadow-lg sm:text-xs">
                    <span className="font-medium text-text-primary">
                      {hovered.label}
                    </span>
                    {/* Caret */}
                    <div className="absolute left-1/2 -bottom-1.25 -translate-x-1/2">
                      <div className="h-1.5 w-1.5 rotate-45 border-b border-r border-edge bg-background" />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </Section>
  );
}
