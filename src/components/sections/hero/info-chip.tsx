"use client";

import { motion } from "motion/react";

export function InfoChip({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-1.5 border border-edge border-dashed bg-surface/50 px-2.5 py-1 text-[11px] text-text-secondary transition-colors cursor-default group hover:text-text-primary hover:border-accent/60 sm:text-xs duration-300"
    >
      {children}
    </motion.span>
  );
}
