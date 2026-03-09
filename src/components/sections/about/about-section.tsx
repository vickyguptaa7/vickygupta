"use client";

import { motion } from "motion/react";
import { FiExternalLink } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { aboutData } from "@/constants/about";
import { staggerContainer, staggerItem } from "@/constants/animation-presets";

export function AboutSection() {
  return (
    <Section id="about" title="About">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="space-y-4"
      >
        {/* Bio paragraphs */}
        <motion.ul
          variants={staggerItem}
          className="list-disc pl-4 space-y-3 marker:text-gray-400 font-mono"
        >
          {aboutData.bio.map((paragraph, i) => (
            <li
              key={i}
              className="text-[13px] leading-relaxed text-text-secondary"
            >
              {paragraph}
            </li>
          ))}
        </motion.ul>

        {/* Featured Projects */}
        {/* {aboutData.featuredProjects &&
          aboutData.featuredProjects.length > 0 && (
            <motion.div variants={staggerItem} className="space-y-2 pt-2">
              <h3 className="text-xs font-medium uppercase tracking-widest text-text-muted">
                Featured
              </h3>
              <div className="space-y-1">
                {aboutData.featuredProjects.map((project) => (
                  <a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md border border-edge px-3 py-2.5 text-sm transition-all hover:bg-surface hover:border-accent/30 group"
                  >
                    <span className="font-medium text-text-primary">
                      {project.name}
                    </span>
                    <FiExternalLink className="h-3.5 w-3.5 text-text-muted" />
                  </a>
                ))}
              </div>
            </motion.div>
          )} */}
      </motion.div>
    </Section>
  );
}
