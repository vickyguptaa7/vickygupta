# Portfolio App — Agent Instructions

You are a **Senior Frontend Engineer** specializing in modern portfolio and personal website development.

---

## Design Inspiration

This portfolio takes inspiration from [chanhdai.com](https://chanhdai.com/) — a clean, bento-box style design. Use it as a **starting point**, not a strict blueprint. Feel free to add your own personality through color accents, animations, dark-mode-first theming, or subtle glassmorphism effects.

### Inspired Patterns (adapt freely)

| Aspect               | Pattern                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Theme**            | Clean and intentional. Can be light-first or dark-first — your call                                                |
| **Layout**           | Single-column, centered, max-width ~768px. Generous vertical spacing                                               |
| **Typography**       | Geist Sans (body) + Geist Mono (nav links, metadata). Clean hierarchy with bold section headings                   |
| **Borders**          | Thin 1px gray borders separating sections. Very subtle, almost invisible                                           |
| **Cards**            | Minimal — thin border, slight rounded corners (~8–12px), no shadows. Hover: subtle muted background                |
| **Color palette**    | Mostly monochromatic base. Add accent color(s) that feel personal — not limited to just blue dots                  |
| **Badges/Tags**      | Pill-shaped, light gray border, monospaced text, small rounded corners                                             |
| **Section headings** | Left-aligned, large bold serif/sans, followed by horizontal rule or spacing                                        |
| **Social links**     | 3-column bento grid with icon + label + external-link arrow                                                        |
| **Experience**       | Vertical list with company logo, role, date range, expandable bullet points, tech badges                           |
| **Components**       | 3-column grid with icon + title, linked cards                                                                      |
| **Blog**             | 2-column cards with dark screenshot, title, date                                                                   |
| **Stack**            | Icon grid of technology logos, no text labels                                                                      |
| **Nav**              | Sticky top bar: logo left, links center (monospaced), command palette (⌘K), GitHub stars badge, theme toggle right |
| **Special**          | GitHub contribution graph, scroll-to-top button, command palette                                                   |
| **Interactions**     | Subtle: `active:scale-[0.98]` on links, muted bg on hover, no flashy animations                                    |

---

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, React 19)      |
| Styling     | Tailwind CSS v4, CSS Modules           |
| Animations  | Motion (Framer Motion)                 |
| State       | Zustand (client), React Query (server) |
| Icons       | react-icons                            |
| UI Library  | shadcn/ui                              |
| Utilities   | tailwind-merge, immer, uuid            |
| Validation  | Zod (via schemas)                      |
| Package Mgr | pnpm                                   |

---

## Design Philosophy

1. **Clean foundation** — generous whitespace, clear hierarchy, content-first layouts.
2. **Bento-box structure** — grid-based sections for social links, components, and showcases (inspired by chanhdai.com).
3. **Intentional interactions** — subtle by default (`scale(0.98)`, hover bg), but add richer animations where they enhance the experience.
4. **Monospaced accents** — use Geist Mono for nav, metadata, dates, and technical details.
5. **Personal touches welcome** — accent colors, subtle gradients, glassmorphism, micro-animations — anything that makes the portfolio feel uniquely yours.
6. **Dark/light mode** — support both. Choose whichever feels right as the default.

---

## Architecture

Read `.agents/guidelines.md` for **all** code conventions (import order, component structure, naming, TypeScript standards, separation of concerns).

### Key Directories

```
src/
├── app/                  # Next.js App Router pages & layouts
├── components/
│   ├── common/           # Shared components (buttons, cards, inputs)
│   ├── ui/               # shadcn/ui primitives
│   └── sections/         # Portfolio sections (hero, about, projects…)
├── constants/            # Static data, nav links, portfolio content
├── hooks/                # Custom hooks & React Query hooks
├── lib/                  # Utility lib (cn, etc.)
├── providers/            # React context providers
├── schemas/              # Zod validation schemas
├── services/             # API services & localStorage wrappers
├── store/                # Zustand stores
├── styles/               # Global CSS, third-party overrides
├── types/                # TypeScript types (api/, common/, domain/)
└── utils/                # Pure utility functions
```

---

## Portfolio Sections (Canonical Order)

1. **Hero** — name, tagline ("Creating with code"), overview (role, location, links), profile
2. **Social Links** — 3-column bento grid with icons
3. **About** — bio bullet points, featured project highlights with stats
4. **Stack** — technology icon grid (no text labels)
5. **Components** — 3-column grid of showcase components
6. **Blog** — recent posts as 2-column cards with thumbnails
7. **Experience** — expandable timeline (company → roles → descriptions → tech badges)
8. **Projects** — project cards with link, description, tech tags
9. **Contact** — form or simple email/social links

> Each section lives in `src/components/sections/{section-name}/` and its static data in `src/constants/{section-name}.ts`.

---

## Available Skills

| Skill                            | When to Use                                                    |
| -------------------------------- | -------------------------------------------------------------- |
| `frontend-design`                | Design direction, aesthetics, typography — use on every new UI |
| `frontend-component-development` | Building any new reusable UI component                         |
| `animation-and-interactions`     | Adding scroll animations, transitions, hover effects           |
| `responsive-design`              | Handling mobile layouts, fluid typography, breakpoints         |
| `portfolio-sections`             | Creating or modifying portfolio content sections               |
| `dark-mode-theming`              | Theming, color palette, dark/light mode toggle                 |

Read the relevant `SKILL.md` before starting any related work.

---

## Available Workflows

| Workflow            | Description                                 |
| ------------------- | ------------------------------------------- |
| `/create-component` | Create a new reusable component end-to-end  |
| `/create-section`   | Add a new portfolio section with animations |
| `/dev-server`       | Start the dev server and verify changes     |

---

## Defaults

- **Animation**: `active:scale-[0.98]` on interactive elements. Add scroll reveals or entrance animations where it feels right
- **Border radius**: `rounded-lg` (cards ~8–12px), `rounded-full` (badges/buttons)
- **Borders**: `border border-border` (thin 1px) as the base separator. Shadows, gradients, or glow effects can layer on top
- **Accent**: Choose a signature accent color — use it consistently but don't overdo it
- **Font**: Geist Sans (body), Geist Mono (nav, meta, dates, badges)
- **Max width**: `max-w-3xl` (~768px) for main content column
