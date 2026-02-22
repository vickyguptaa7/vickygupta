---
name: Frontend Component Development
description: Build modern, reusable UI components using Tailwind CSS v4, shadcn/ui, and React 19 patterns for the portfolio app.
---

# Frontend Component Development

Use this skill whenever you need to create or modify a reusable UI component.

---

## 1. Component Location

| Type              | Directory                         | Example                                 |
| ----------------- | --------------------------------- | --------------------------------------- |
| Shared/reusable   | `src/components/common/`          | `glass-card.tsx`, `section-heading.tsx` |
| shadcn primitives | `src/components/ui/`              | `button.tsx`, `dialog.tsx`              |
| Section-specific  | `src/components/sections/{name}/` | `hero-section.tsx`                      |
| Page-scoped       | Co-locate next to `page.tsx`      | `src/app/projects/components/`          |

---

## 2. File Structure Template

```tsx
// src/components/common/glass-card.tsx
"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: "default" | "elevated" | "subtle";
  glow?: boolean;
}

export function GlassCard({
  children,
  variant = "default",
  glow = false,
  className,
  ...props
}: GlassCardProps) {
  // Computed
  const variantClasses: Record<
    NonNullable<GlassCardProps["variant"]>,
    string
  > = {
    default: "bg-white/5 border-white/10",
    elevated: "bg-white/10 border-white/20 shadow-xl",
    subtle: "bg-white/[0.02] border-white/5",
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl border backdrop-blur-md p-6 transition-colors",
        variantClasses[variant],
        glow && "shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.15)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### Rules

1. **Always** define a `Props` interface (suffix with `Props`).
2. Extend native/motion HTML props when wrapping DOM elements.
3. Accept `className` and merge with `cn()`.
4. Use **named exports** — never `export default`.
5. Add `"use client"` only when hooks, events, or browser APIs are used.
6. Keep components **focused** — one responsibility per file.

---

## 3. Tailwind CSS v4 Patterns

### Using `cn()` for Conditional Classes

```tsx
import { cn } from "@/lib/utils";

// The cn() function is powered by tailwind-merge
// Set it up in src/lib/utils.ts:
// import { twMerge } from "tailwind-merge";
// export function cn(...inputs: (string | undefined | false | null)[]) {
//   return twMerge(inputs.filter(Boolean).join(" "));
// }
```

### Custom Theme Tokens via `@theme inline`

Define design tokens in `globals.css` using Tailwind v4's `@theme inline`:

```css
@theme inline {
  --color-accent: #6366f1;
  --color-accent-rgb: 99 102 241;
  --color-surface: rgba(255 255 255 / 0.05);
  --color-surface-hover: rgba(255 255 255 / 0.1);
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-border-subtle: rgba(255 255 255 / 0.1);
}
```

Then use in components: `text-accent`, `bg-surface`, `border-border-subtle`.

### CSS Modules (Complex Styles)

Use `.module.css` only for animations, pseudo-element tricks, or complex selectors that Tailwind can't handle:

```css
/* glass-card.module.css */
.shimmer::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255 255 255 / 0.03) 45%,
    rgba(255 255 255 / 0.05) 50%,
    rgba(255 255 255 / 0.03) 55%,
    transparent 60%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

---

## 4. Variant Pattern

For components with multiple visual variants, use a variants map:

```tsx
const variants = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
  ghost: "text-text-secondary hover:text-white hover:bg-white/5",
  outline: "border border-white/20 text-white hover:bg-white/5",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm rounded-lg",
  md: "h-10 px-5 text-sm rounded-xl",
  lg: "h-12 px-8 text-base rounded-xl",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
```

---

## 5. Composition Pattern

Build complex components by composing smaller ones:

```tsx
// Parent provides context, children provide content
<Card>
  <Card.Header>
    <Card.Title>Project Name</Card.Title>
    <Card.Badge>React</Card.Badge>
  </Card.Header>
  <Card.Body>Description here</Card.Body>
  <Card.Footer>
    <Card.Link href="#">View Project</Card.Link>
  </Card.Footer>
</Card>
```

Implement with dot-notation exports:

```tsx
function CardRoot({ children, className }: CardRootProps) { ... }
function CardHeader({ children }: CardHeaderProps) { ... }
function CardTitle({ children }: CardTitleProps) { ... }

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  // ...
});
```

---

## 6. Accessibility Checklist

- [ ] All interactive elements have **visible focus styles** (`focus-visible:ring-2 focus-visible:ring-accent`)
- [ ] Buttons have descriptive text or `aria-label`
- [ ] Images have meaningful `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Form inputs have associated `<label>` elements

### Reduced Motion

```tsx
import { useReducedMotion } from "motion/react";

export function AnimatedComponent() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  );
}
```

---

## 7. shadcn/ui Integration

When using shadcn components:

1. Install via: `pnpm dlx shadcn@latest add <component>`
2. Components land in `src/components/ui/`
3. **Customize** the generated file to match the portfolio theme (dark-first, glassmorphism)
4. Never modify `node_modules` — always customize the local copy

---

## 8. Checklist Before Committing a Component

- [ ] Props interface is typed and exported
- [ ] `className` is accepted and merged via `cn()`
- [ ] Component is named-exported
- [ ] File uses kebab-case naming
- [ ] `"use client"` is only added if necessary
- [ ] Loading/error/empty states handled (if data-driven)
- [ ] Responsive at all breakpoints
- [ ] Animations respect `prefers-reduced-motion`
