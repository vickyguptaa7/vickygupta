"use client";

import { motion } from "motion/react";
import { FiExternalLink } from "react-icons/fi";

import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { projects } from "@/constants/projects";

export function ProjectsSection() {
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
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={staggerItem}
            className="screen-line-after group"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between px-4 py-3.5 transition-colors hover:bg-surface"
            >
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-text-primary">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-text-secondary">
                  — {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>

              {/* Link icon */}
              <div className="ml-3 shrink-0">
                <FiExternalLink className="h-3.5 w-3.5 text-text-muted" />
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
