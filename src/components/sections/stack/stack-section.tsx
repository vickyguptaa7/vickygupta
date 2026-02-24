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
            className="flex items-center justify-center rounded-md border border-edge p-2 transition-colors hover:bg-surface"
            title={tech.name}
          >
            <tech.icon className="h-5 w-5" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
