"use client";

import { motion } from "motion/react";

import { Section } from "@/components/common/section";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { techStack } from "@/constants/stack";

export function StackSection() {
  return (
    <Section id="stack" title="Stack" count={techStack.length}>
      <motion.div
        className="flex flex-wrap gap-2"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            variants={staggerItem}
            className="group relative flex items-center gap-2 border border-edge border-dashed px-2 py-1.5 transition-all bg-surface/50 hover:border-accent/10 hover:scale-105"
          >
            <tech.icon
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: tech.color }}
            />
            <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors font-mono">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
