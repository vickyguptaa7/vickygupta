"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export function CopyableChip({
  icon: Icon,
  value,
  href,
  delay = 0,
  target,
}: {
  icon: React.ElementType;
  value: string;
  href: string;
  delay?: number;
  target?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    [value],
  );

  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      className="group/chip inline-flex items-center gap-1.5 border border-edge border-dashed bg-surface/50 px-2.5 py-1 text-[11px] text-text-secondary transition-colors group sm:text-xs"
    >
      <a
        href={href}
        className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors"
        target={target}
      >
        <Icon className="h-3.5 w-3.5 text-text-muted group-hover:text-text-primary" />
        {value}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="ml-0.5 p-0.5 rounded hover:bg-surface-hover transition-colors cursor-pointer"
        aria-label={copied ? "Copied" : `Copy ${value}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <FiCheck className="h-3 w-3 text-green-500" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="group/cpy"
            >
              <FiCopy className="h-3 w-3 text-text-muted group-hover/cpy:text-text-primary transition-colors" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.span>
  );
}
