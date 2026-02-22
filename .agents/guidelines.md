## Project Guidelines

Follow these conventions and best practices to maintain a consistent, readable, and scalable codebase.

> **For AI agents**: This file is the source of truth for code style. Always follow these guidelines when generating code. Also read `.agents/AGENTS.md` for directory structure and separation of concerns.

---

### 1. Import Order

Maintain the following import groups, each separated by a single blank line:

- **External packages** (npm modules, third-party libraries — e.g., React, Zustand, useForm)
- **Internal components** (components from within this app — `@/components/...`)
- **Utility functions** (helpers, custom hooks, services, store — `@/hooks/...`, `@/services/...`, `@/store/...`, `@/lib/...`)
- **Assets** (images, fonts, icons — `@/assets/...`)
- **Constants** (constant, types, schema — `@/constants/...`, `@/types/...`, `@/schemas/...`)
- **Styles** (CSS modules or global styles)

```tsx
// 1. External
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

// 2. Internal components
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";

// 3. Utilities
import { useResumeStore } from "@/store/resume-builder/resume/resumeStore";
import { cn } from "@/lib/utils";

// 4. Assets
import Logo from "@/assets/images/logo.svg";

// 5. Constants, types, schemas
import { AppLinks } from "@/constants/appLinks";
import type { ResumeData } from "@/types/resume/resume";

// 6. Styles
import styles from "./component.module.css";
```

### 2. Component Structure

Order your React component code as follows:

1. **Props** — Destructure props with default values at the top.
2. **State hooks** (`useState`, Zustand store variables, etc.).
3. **Custom hooks** (`useQuery`, `useDebounce`, `useForm`, etc.).
4. **Effects** (`useEffect`).
5. **Event handlers & helper functions**.
6. **Computed variables** used in JSX.
7. **Return JSX**.

```tsx
interface MyComponentProps {
  title?: string;
}

export function MyComponent({ title = "Default" }: MyComponentProps) {
  // 1. State hook
  const [count, setCount] = useState(0);

  // 2. Custom hook
  const debounced = useDebounce(count, 300);

  // 3. Effect
  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  // 4. Handler
  function handleClick() {
    setCount((c) => c + 1);
  }

  // 5. Computed variable
  const label = `Count: ${count}`;

  // 6. JSX
  return (
    <button onClick={handleClick}>
      {title}: {label}
    </button>
  );
}
```

### 3. JSX Best Practices

- Keep JSX clean and declarative.
- Avoid complex logic in JSX; move logic to variables or functions.
- Use descriptive names for props and variables for readability.
- Always handle **loading**, **error**, and **empty** states in components that fetch data.

### 4. Function Usage

- Prefer named functions over inline arrow functions for event handlers and callbacks.
- If an inline function is necessary, keep it concise.

### 5. Styling

- Use **Tailwind CSS** as the primary styling approach.
- Use **CSS Modules** (`.module.css`) for complex custom styles that can't be expressed in Tailwind.
- Use `cn()` from `@/lib/utils` for merging conditional Tailwind classes.
- **Never** use plain `.css` files without modules (exception: `globals.css` and third-party overrides in `src/styles/`).
- Use project CSS custom properties defined in `globals.css` (e.g., `text-text-secondary`, `border-border-secondary`).

### 6. Avoid Anonymous Arrow Functions

- Minimize anonymous arrow functions in JSX to avoid performance pitfalls.
- Extract reusable logic into functions outside the render path.

### 7. Constants Management

- Always move constants to `src/constants/` for better maintainability and reusability.
- Group domain-specific constants in `src/constants/{domain}/`.
- localStorage keys go in `src/constants/localStorageKeys.ts`.

### 8. Event Handler Naming

- Prefix functions handling events with `handle`, e.g., `handleClick`, `handleSubmit`.
- When passing event handlers between components via props, prefix prop names with `on`, e.g., `onClick`, `onSubmit`.

### 9. Separation of Concerns

| What               | Where                         | Never in                  |
| ------------------ | ----------------------------- | ------------------------- |
| API calls          | `src/services/api/{domain}/`  | Components, hooks, pages  |
| API types          | `src/types/api/`              | Service files, components |
| Domain types       | `src/types/{domain}/`         | Inline in components      |
| React Query hooks  | `src/hooks/queries/{domain}/` | Components directly       |
| Zustand stores     | `src/store/{domain}/`         | Components                |
| localStorage       | `src/services/storage/`       | Components, utils         |
| Validation schemas | `src/schemas/{domain}/`       | Components                |
| Constants          | `src/constants/`              | Inline in components      |
| Pure utilities     | `src/utils/`                  | Components, services      |

### 10. TypeScript Standards

- **Strict mode is ON** — no `any` types, no `@ts-ignore`, no `@ts-expect-error`.
- Always define typed interfaces for component props (suffix with `Props`).
- API payloads must have typed interfaces in `src/types/api/`.
- Store state and actions must have separate type definitions in `{domain}Type.ts`.
- Prefer `type` for unions/intersections, `interface` for object shapes.

### 11. Export Conventions

| What        | Pattern                                                   |
| ----------- | --------------------------------------------------------- |
| Components  | Named export: `export function MyComponent()`             |
| Services    | Object export: `export const XxxService = { fn1, fn2 }`   |
| Stores      | Hook export: `export const useXxxStore = create<...>()()` |
| Query hooks | Named export: `export const useGetXxx = () => {}`         |
| Types       | Named export: `export type/interface Xxx = ...`           |

### 12. `'use client'` Usage

- Only add `'use client'` when the component uses browser APIs, hooks, or event handlers.
- Keep client boundaries as narrow as possible — push `'use client'` down to leaf components.
- Server Components (default) are preferred for pages and layouts.

### 13. Error Handling

- API errors are handled globally by Axios interceptors (401/403/404/500).
- Use `try/catch` in localStorage operations.
- Use `enabled` option on React Query hooks to prevent unnecessary fetches.
- Always handle loading, error, and empty states in UI components.

### 14. Performance Best Practices

- Use `React.memo()` for expensive components that receive stable props.
- Use `useCallback`/`useMemo` only when necessary (not by default).
- Prefer dynamic imports (`next/dynamic`) for heavy components not needed on initial load.
- Keep `'use client'` boundary as low in the component tree as possible.

### 15. File & Folder Naming Conventions

Use **kebab-case** for **all** file and folder names. This avoids case-sensitivity bugs across operating systems and keeps naming uniform with Next.js App Router route conventions.

| Type        | Convention                       | Example                 |
| ----------- | -------------------------------- | ----------------------- |
| Components  | kebab-case `.tsx`                | `form-input.tsx`        |
| Hooks       | kebab-case `use-{name}.tsx`      | `use-debounce.tsx`      |
| Services    | kebab-case `{domain}-service.ts` | `resume-service.ts`     |
| Stores      | kebab-case `{domain}-store.ts`   | `users-store.ts`        |
| Store Types | kebab-case `{domain}-type.ts`    | `users-type.ts`         |
| Schemas     | kebab-case `{name}.schema.ts`    | `resume.schema.ts`      |
| Constants   | kebab-case `.ts`                 | `app-links.ts`          |
| Utilities   | kebab-case `.ts`                 | `date.ts`               |
| CSS Modules | kebab-case `.module.css`         | `form-input.module.css` |
| Folders     | kebab-case                       | `editor-panel/`         |

> **Note:** Adhering to these guidelines keeps the codebase consistent, maintainable, and welcoming for all contributors.

---

### 16. Skills & Workflows

This project has agent skills and workflows in `.agents/skills/` and `.agents/workflows/`. Read the relevant `SKILL.md` before starting any related work.

| Skill                            | Purpose                                             |
| -------------------------------- | --------------------------------------------------- |
| `frontend-design`                | Design direction, aesthetics, bold visual identity  |
| `frontend-component-development` | Building reusable UI components                     |
| `animation-and-interactions`     | Scroll animations, transitions, micro-interactions  |
| `responsive-design`              | Mobile-first layouts, fluid typography, images      |
| `portfolio-sections`             | Hero, about, projects, experience, contact patterns |
| `dark-mode-theming`              | Color system, glassmorphism, dark/light toggle      |

**Workflows** (use via slash command):

- `/create-component` — scaffold a new reusable component
- `/create-section` — add a new portfolio section end-to-end
- `/dev-server` — start dev server and verify changes

### 17. Portfolio Conventions

- **Reference design**: [chanhdai.com](https://chanhdai.com/) — clean, monochromatic, bento-box style
- **Section order**: Hero → Social Links → About → Stack → Components → Blog → Experience → Projects → Contact
- **Section IDs**: kebab-case matching section name (`id="about"`, `id="experience"`)
- **Section data**: Static content in `src/constants/{section-name}.ts`
- **Layout**: Single column, centered, `max-w-3xl` (~768px)
- **Theme**: Light-first with dark mode toggle. Monochromatic (black/white/gray)
- **Borders**: Thin 1px `border-border` between sections (no shadows, no gradients)
- **Interactions**: Subtle only — `active:scale-[0.98]`, `hover:bg-surface`
- **Typography**: Geist Sans (body), Geist Mono (nav, metadata, dates, tech badges)
- **Badges**: Pill-shaped `border border-border font-mono text-xs`
