---
name: Dark Mode & Theming
description: Design system for dark-first premium theming with CSS custom properties, glassmorphism, gradients, and light/dark mode toggle.
---

# Dark Mode & Theming

Use this skill when working on colors, theming, design tokens, or dark/light mode.

> **Inspiration**: [chanhdai.com](https://chanhdai.com/) — clean palette with minimal color. Use this as a base, but feel free to add accent colors, subtle gradients, or glassmorphism to make it your own.

---

## 1. Color Architecture

The portfolio starts with a **mostly monochromatic** base (inspired by chanhdai.com) but you're free to add accent colors, gradients, or effects that give it personality.

```css
/* src/app/globals.css */
@import "tailwindcss";

/* === Light theme (default) === */
:root {
  --background: #ffffff;
  --foreground: #09090b;

  /* Surfaces */
  --surface: #f4f4f5;
  --surface-hover: #e4e4e7;

  /* Text */
  --text-primary: #09090b;
  --text-secondary: #71717a;
  --text-muted: #a1a1aa;

  /* Borders */
  --border: #e4e4e7;
  --border-subtle: #f4f4f5;

  /* Accent (used sparingly — "new" dots, active states) */
  --accent: #2563eb;
  --accent-muted: #dbeafe;
}

/* === Dark theme === */
[data-theme="dark"] {
  --background: #09090b;
  --foreground: #fafafa;

  --surface: #18181b;
  --surface-hover: #27272a;

  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;

  --border: #27272a;
  --border-subtle: #18181b;

  --accent: #3b82f6;
  --accent-muted: #172554;
}

/* === Map to Tailwind v4 theme === */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-hover: var(--surface-hover);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-border: var(--border);
  --color-border-subtle: var(--border-subtle);
  --color-accent: var(--accent);
  --color-accent-muted: var(--accent-muted);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}
```

### Usage in Components

```tsx
{/* Text hierarchy */}
<p className="text-text-primary">Main text</p>
<p className="text-text-secondary">Secondary text</p>
<p className="text-text-muted font-mono text-sm">Metadata, dates</p>

{/* Surfaces */}
<div className="bg-surface hover:bg-surface-hover">Card</div>

{/* Borders — the primary visual separator */}
<div className="border border-border rounded-lg">Section card</div>
<hr className="border-border" />

{/* Accent — used very sparingly */}
<span className="h-2 w-2 rounded-full bg-accent" /> {/* "New" dot */}
```

---

## 2. Dark/Light Mode Toggle

### Theme Store

```ts
// src/store/theme/theme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light", // Light-first, matching chanhdai.com
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "portfolio-theme" },
  ),
);
```

### Theme Provider

```tsx
// src/providers/theme-provider.tsx
"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/store/theme/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
```

### Toggle Button (Minimal — sun/moon icon like chanhdai.com)

```tsx
"use client";

import { FiSun, FiMoon } from "react-icons/fi";

import { useThemeStore } from "@/store/theme/theme-store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary active:scale-[0.98]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
```

---

## 3. Visual Patterns (chanhdai.com Style)

### Section Container (bordered card)

```tsx
<section className="rounded-lg border border-border p-6">
  <h2 className="text-xl font-bold">Section Title</h2>
  {/* Content */}
</section>
```

### Bento Grid Card (social links style)

```tsx
<a
  href={link.url}
  className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-surface active:scale-[0.98]"
>
  <span className="text-xl">{link.icon}</span>
  <span className="font-mono text-sm">{link.label}</span>
  <FiArrowUpRight className="ml-auto text-text-muted" />
</a>
```

### Tech Badge (pill-shaped)

```tsx
<span className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-text-secondary">
  TypeScript
</span>
```

### "New" Dot Indicator

```tsx
<span className="relative flex h-2 w-2">
  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
</span>
```

---

## 4. Typography System

The chanhdai.com style uses **simple, clean typography**. No fluid clamp() needed — just responsive Tailwind sizes.

```tsx
{
  /* Section heading */
}
<h2 className="text-2xl font-bold text-text-primary">About</h2>;

{
  /* Body text (About bio) */
}
<p className="font-mono text-sm leading-relaxed text-text-primary">
  Description text here...
</p>;

{
  /* Metadata (dates, labels) */
}
<span className="font-mono text-xs text-text-secondary">
  Part-time | 01.2026 – ∞
</span>;

{
  /* Nav links */
}
<a className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors">
  Portfolio
</a>;
```

---

## 5. Design Token Checklist

When setting up theming for this portfolio:

- [ ] Background & foreground defined for both light and dark modes
- [ ] Surface colors (2 levels: default, hover)
- [ ] Text colors (3 levels: primary, secondary, muted)
- [ ] Border colors (2 levels: default, subtle)
- [ ] Accent color chosen — consistent usage throughout
- [ ] Font families: Geist Sans (body) + Geist Mono (nav, meta, badges)
- [ ] Shadows optional — borders are the primary separator, shadows can layer on top
- [ ] Gradients optional — keep subtle if used
- [ ] `active:scale-[0.98]` on interactive elements
- [ ] Hover states use `bg-surface` or `bg-surface-hover`
