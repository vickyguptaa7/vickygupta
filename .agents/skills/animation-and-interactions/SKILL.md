---
name: Animation & Interactions
description: Create premium scroll animations, page transitions, micro-interactions, and parallax effects using Motion (Framer Motion).
---

# Animation & Interactions

Use this skill when adding any animation, transition, or interactive effect to portfolio components.

> **Library**: `motion` (the Framer Motion successor) — import from `"motion/react"`.

---

## 1. Import Convention

```tsx
// ✅ Correct — import from motion/react
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";

// ❌ Wrong — do NOT import from "framer-motion"
```

---

## 2. Animation Presets

Define reusable animation variants in `src/constants/animation-presets.ts`:

```ts
// src/constants/animation-presets.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
} as const;

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
} as const;
```

---

## 3. Scroll-Triggered Animations

### Using `whileInView`

```tsx
import { motion } from "motion/react";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered Grid/List

```tsx
import { motion } from "motion/react";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";

interface StaggerGridProps {
  children: React.ReactNode[];
}

export function StaggerGrid({ children }: StaggerGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## 4. Hover & Tap Micro-Interactions

### Card Hover Effect

```tsx
<motion.div
  whileHover={{
    y: -4,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  }}
  whileTap={{ scale: 0.98 }}
  className="cursor-pointer"
>
  {/* Card content */}
</motion.div>
```

### Button Hover Glow

```tsx
<motion.button
  whileHover={{
    boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)",
    scale: 1.03,
  }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
  className="rounded-xl bg-accent px-6 py-3 font-medium text-white"
>
  Get in Touch
</motion.button>
```

### Icon Rotate on Hover

```tsx
<motion.span
  whileHover={{ rotate: 15, scale: 1.1 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <FaArrowRight />
</motion.span>
```

---

## 5. Text Reveal Animation

### Character-by-Character Reveal

```tsx
import { motion } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.p
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: {
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.04, duration: 0.3 },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
```

---

## 6. Parallax Scroll

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
```

---

## 7. Page Transitions (App Router)

Create a layout-level transition wrapper:

```tsx
// src/components/common/page-transition.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 8. Animated Counter

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </motion.span>
  );
}
```

---

## 9. Performance Best Practices

1. **Use GPU-friendly properties** — animate `opacity`, `transform` (x, y, scale, rotate) only. Avoid animating `width`, `height`, `top`, `left`.
2. **`viewport={{ once: true }}`** — don't re-trigger scroll animations.
3. **`will-change: transform`** — set on elements that will animate (Tailwind: `will-change-transform`).
4. **Reduce motion** — always respect `prefers-reduced-motion`:
   ```tsx
   import { useReducedMotion } from "motion/react";
   const shouldReduce = useReducedMotion();
   // Use shouldReduce to disable or simplify animations
   ```
5. **Avoid layout thrashing** — don't animate layout-triggering properties inside scroll handlers.
6. **`AnimatePresence`** — only use when elements mount/unmount (modals, page transitions, lists).

---

## 10. Timing Defaults

| Context         | Duration | Ease                                          |
| --------------- | -------- | --------------------------------------------- |
| Entrance        | 0.5s     | `easeOut`                                     |
| Exit            | 0.3s     | `easeIn`                                      |
| Hover           | 0.2s     | `easeOut`                                     |
| Stagger delay   | 0.1s     | —                                             |
| Page transition | 0.3s     | `easeInOut`                                   |
| Spring (bouncy) | —        | `type: "spring", stiffness: 300, damping: 20` |
