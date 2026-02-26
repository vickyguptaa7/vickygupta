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
            className="group relative flex items-center gap-2 rounded-md border border-edge px-2.5 py-2 transition-all hover:bg-surface hover:border-accent/30 hover:scale-105"
          >
            <tech.icon className="h-4 w-4 shrink-0" />
            <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
