---
name: Responsive Design & Layout
description: Build mobile-first, fluid layouts with Tailwind CSS v4 breakpoints, container queries, fluid typography, and optimized images.
---

# Responsive Design & Layout

Use this skill when building layouts, handling breakpoints, or ensuring mobile-first responsiveness.

---

## 1. Breakpoint System (Tailwind v4)

Tailwind v4 uses the standard breakpoint prefixes. Always design **mobile-first** — base styles target mobile, then override upward:

```tsx
<div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
    Hello
  </h1>
</div>
```

| Prefix | Min Width | Target        |
| ------ | --------- | ------------- |
| (none) | 0px       | Mobile phones |
| `sm:`  | 640px     | Large phones  |
| `md:`  | 768px     | Tablets       |
| `lg:`  | 1024px    | Laptops       |
| `xl:`  | 1280px    | Desktops      |
| `2xl:` | 1536px    | Large screens |

---

## 2. Layout Patterns

### Full-Width Section with Constrained Content

```tsx
<section className="w-full px-4 py-20 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-6xl">{/* Section content */}</div>
</section>
```

### Responsive Grid

```tsx
{
  /* 1 col → 2 col → 3 col */
}
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>;
```

### Sidebar Layout (Desktop) → Stacked (Mobile)

```tsx
<div className="flex flex-col gap-8 lg:flex-row">
  <aside className="w-full lg:w-64 lg:shrink-0">{/* Sidebar */}</aside>
  <main className="flex-1">{/* Main content */}</main>
</div>
```

---

## 3. Fluid Typography

Use `clamp()` for type that scales smoothly between breakpoints:

```css
/* In globals.css */
@theme inline {
  --font-size-hero: clamp(2.5rem, 5vw + 1rem, 5rem);
  --font-size-heading: clamp(1.75rem, 3vw + 0.5rem, 3rem);
  --font-size-subheading: clamp(1.25rem, 2vw + 0.25rem, 1.75rem);
}
```

```tsx
<h1 className="text-[length:var(--font-size-hero)] font-bold leading-tight">
  Vicky Gupta
</h1>
```

Or use Tailwind's responsive utilities:

```tsx
<h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
```

---

## 4. Container Queries

For components that should adapt based on their container (not viewport):

```tsx
<div className="@container">
  <div className="flex flex-col gap-4 @md:flex-row @md:items-center">
    <img className="h-32 w-full rounded-xl object-cover @md:h-40 @md:w-40" />
    <div className="flex-1">
      <h3 className="text-lg @md:text-xl">Project Title</h3>
    </div>
  </div>
</div>
```

---

## 5. Mobile Navigation

### Hamburger Menu Pattern

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger toggle - visible on mobile only */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {/* Nav items */}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 6. Image Optimization

Always use `next/image` for images:

```tsx
import Image from "next/image";

{
  /* Responsive hero image */
}
<Image
  src="/hero-bg.webp"
  alt="Hero background"
  fill
  className="object-cover"
  priority // Above the fold — preload
  sizes="100vw"
  quality={85}
/>;

{
  /* Responsive project thumbnail */
}
<Image
  src={project.thumbnail}
  alt={project.title}
  width={600}
  height={400}
  className="h-48 w-full rounded-xl object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>;
```

### `sizes` Cheat Sheet

| Layout        | `sizes` value                                              |
| ------------- | ---------------------------------------------------------- |
| Full width    | `100vw`                                                    |
| 2-col grid    | `(max-width: 768px) 100vw, 50vw`                           |
| 3-col grid    | `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw` |
| Fixed sidebar | `(max-width: 1024px) 100vw, calc(100vw - 256px)`           |

---

## 7. Touch-Friendly Targets

- All buttons and interactive elements: **minimum 44×44px** tap target.
- Use generous padding rather than relying on text size alone.
- Add `active:` states for mobile feedback:

```tsx
<button className="h-12 min-w-[44px] px-6 active:scale-95 active:bg-accent/80">
```

---

## 8. Responsive Spacing Scale

```tsx
{/* Section vertical padding */}
<section className="py-16 sm:py-20 md:py-24 lg:py-32">

{/* Content gap */}
<div className="space-y-8 sm:space-y-10 md:space-y-12">

{/* Grid gap */}
<div className="gap-4 sm:gap-6 md:gap-8">
```

---

## 9. Hide/Show by Breakpoint

```tsx
{/* Show on mobile only */}
<div className="block md:hidden">Mobile content</div>

{/* Show on desktop only */}
<div className="hidden md:block">Desktop content</div>

{/* Conditional layout direction */}
<div className="flex flex-col md:flex-row">
```

---

## 10. Testing Checklist

- [ ] Looks correct at **320px** (small phones)
- [ ] Looks correct at **375px** (iPhone SE)
- [ ] Looks correct at **768px** (iPad portrait)
- [ ] Looks correct at **1024px** (iPad landscape / laptop)
- [ ] Looks correct at **1440px** (desktop)
- [ ] Looks correct at **1920px+** (large screens)
- [ ] No horizontal scroll at any breakpoint
- [ ] Text is readable at all sizes
- [ ] Touch targets are ≥ 44px on mobile
- [ ] Images don't overflow containers
