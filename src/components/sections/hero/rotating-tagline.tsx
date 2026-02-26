"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { heroData } from "@/constants/hero";

export function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const taglines = heroData.rotatingTaglines;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <div className="relative h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute text-sm text-text-muted tracking-wide"
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
