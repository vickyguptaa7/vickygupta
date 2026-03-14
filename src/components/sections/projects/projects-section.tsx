"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
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

interface HoveredAction {
  label: string;
  x: number;
  y: number;
}

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hovered, setHovered] = useState<HoveredAction | null>(null);
  const { navigate } = usePageTransition();

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
              className="screen-line-after group/btn transition-colors hover:bg-surface"
            >
              {/* Project header - clickable */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all group/btn`}
              >
                {/* Project icon / Initial avatar */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge border-dashed bg-surface overflow-hidden group-hover/btn:border-accent/20 transition-colors">
                  {project.icon ? (
                    <Image
                      src={project.icon}
                      alt={`${project.title} icon`}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-text-primary">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text-primary hero-name-underline relative w-fit">
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

                    {/* Action icons */}
                    <div className="flex items-center gap-1 ml-auto">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${project.slug}`);
                        }}
                        onMouseEnter={(e) => handleIconHover("View details", e)}
                        onMouseLeave={handleIconLeave}
                        className="flex h-6 w-6 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary cursor-pointer"
                      >
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </span>

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
                          className="flex h-6 w-6 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
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
                          className="flex h-6 w-6 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
                        >
                          <FiExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <FiChevronDown
                  className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-hover/btn:text-black ${
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
                    <div className=" px-4 pb-4 space-y-3">
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tech badges - always visible */}
              <div className="flex flex-wrap gap-1 px-4 pb-3 -mt-1">
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
                  <div className="mb-1.5 whitespace-nowrap rounded-md border border-edge bg-background px-2.5 py-1.5 text-xs shadow-lg">
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
