---
name: Portfolio Sections
description: Patterns for building portfolio content sections — hero, about, projects, experience, and contact — with data-driven architecture.
---

# Portfolio Sections

Use this skill when creating or modifying any portfolio content section.

> **Inspiration**: [chanhdai.com](https://chanhdai.com/) — clean bordered sections, bento grids, expandable timeline. Adapt these patterns with your own aesthetic — colors, animations, and creative touches are encouraged.

---

## 1. Section Architecture

Each section follows this pattern:

```
src/
├── components/sections/{section-name}/
│   ├── {section-name}-section.tsx       # Main section component
│   ├── {sub-component}.tsx              # Sub-components
│   └── {section-name}.module.css        # Complex styles (if needed)
├── constants/{section-name}.ts          # Static data for the section
└── types/{section-name}/               # Domain types (if complex)
    └── index.ts
```

### Section Container Pattern

Sections on chanhdai.com are separated by thin borders and generous spacing. Each section is wrapped in a bordered container:

```tsx
interface SectionProps {
  id: string;
  title: string;
  count?: number;
  children: React.ReactNode;
}

export function Section({ id, title, count, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border py-8">
      <h2 className="mb-6 text-2xl font-bold text-text-primary">
        {title}
        {count !== undefined && (
          <sup className="ml-1 text-sm font-normal text-text-muted">
            ({count})
          </sup>
        )}
      </h2>
      {children}
    </section>
  );
}
```

---

## 2. Hero Section

The chanhdai.com hero is compact and informational — no flashy animations, no full-screen takeover.

### Data Structure

```ts
// src/constants/hero.ts
export const heroData = {
  name: "Vicky Gupta",
  tagline: "Creating with code. Small details matter.",
  role: "Full Stack Developer",
  location: "India",
  website: "vickygupta.dev",
  pronouns: "he/him",
} as const;
```

### Implementation Pattern

```tsx
export function HeroSection() {
  return (
    <section className="space-y-6 py-8">
      {/* Name — large bold */}
      <h1 className="text-3xl font-bold">{heroData.name}</h1>

      {/* Overview — role, location, website in a metadata grid */}
      <div className="space-y-2 font-mono text-sm text-text-secondary">
        <p>{heroData.role}</p>
        <p>{heroData.location}</p>
        <a
          href={`https://${heroData.website}`}
          className="hover:text-text-primary transition-colors"
        >
          {heroData.website}
        </a>
      </div>
    </section>
  );
}
```

---

## 3. Social Links Section

Displayed as a **3-column bento grid** with icon + label + external arrow.

### Data Structure

```ts
// src/constants/social-links.ts
import { FaGithub, FaLinkedin, FaDiscord, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  { name: "X", url: "https://x.com/username", icon: FaXTwitter },
  { name: "GitHub", url: "https://github.com/username", icon: FaGithub },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
    icon: FaLinkedin,
  },
  { name: "Discord", url: "https://discord.com/users/id", icon: FaDiscord },
  { name: "YouTube", url: "https://youtube.com/@username", icon: FaYoutube },
];
```

### Implementation

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {socialLinks.map((link) => (
    <a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 border border-border p-4 transition-colors hover:bg-surface active:scale-[0.98]"
    >
      <link.icon className="text-lg" />
      <span className="font-mono text-sm">{link.name}</span>
      <FiArrowUpRight className="ml-auto text-text-muted" size={14} />
    </a>
  ))}
</div>
```

> Notice: no `gap` on the grid — borders overlap to create the bento effect.

---

## 4. About Section

Simple bullet list with a monospaced font, followed by featured project highlights.

### Data Structure

```ts
// src/constants/about.ts
export const aboutData = {
  bio: [
    "Full Stack Developer with X+ years of experience, known for pixel-perfect execution and strong attention to small details.",
    "Skilled in Next.js, React, TypeScript, and modern front-end technologies.",
    "Passionate about exploring new technologies and turning ideas into reality through polished personal projects.",
  ],
  featuredProjects: [
    {
      name: "Project Name",
      url: "https://project.com",
      description: "Brief description of the project",
      stats: [{ label: "weekly downloads on npm", value: "10k+" }],
    },
  ],
} as const;
```

### Pattern

- Bullet list with `font-mono text-sm` body text
- Featured projects as indented sub-lists with stats

---

## 5. Stack Section (Technology Icons)

A **grid of technology icons** with no text labels — just logos.

```tsx
<section className="border-t border-border py-8">
  <h2 className="mb-6 text-2xl font-bold">Stack</h2>
  <div className="flex flex-wrap gap-3">
    {techStack.map((tech) => (
      <div
        key={tech.name}
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        title={tech.name}
      >
        <tech.icon className="text-2xl" />
      </div>
    ))}
  </div>
</section>
```

---

## 6. Experience Section

The signature chanhdai.com pattern: **expandable/collapsible timeline**.

### Data Structure

```ts
// src/constants/experience.ts
export interface ExperienceRole {
  title: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance";
  period: string;
  description?: string;
  highlights?: string[];
  technologies: string[];
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  isActive?: boolean; // green/blue dot for current role
  roles: ExperienceRole[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Company Name",
    companyUrl: "https://company.com",
    isActive: true,
    roles: [
      {
        title: "Senior Frontend Developer",
        type: "Full-time",
        period: "01.2024 – ∞",
        highlights: [
          "Built and maintained component library",
          "Led frontend architecture decisions",
        ],
        technologies: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
      },
    ],
  },
];
```

### Implementation Pattern

```tsx
{
  /* Company entry */
}
<div className="space-y-4">
  <div className="flex items-center gap-3">
    {experience.companyLogo && (
      <Image src={experience.companyLogo} alt="" width={24} height={24} />
    )}
    <h3 className="font-bold">{experience.company}</h3>
    {experience.isActive && <span className="h-2 w-2 rounded-full bg-accent" />}
  </div>

  {/* Roles — collapsible */}
  {experience.roles.map((role) => (
    <div key={role.title} className="space-y-2 pl-9">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{role.title}</h4>
        <button className="text-text-muted hover:text-text-primary">
          <FiChevronDown />
        </button>
      </div>
      <p className="font-mono text-xs text-text-secondary">
        {role.type} | {role.period}
      </p>

      {/* Highlights (when expanded) */}
      <ul className="list-disc space-y-1 pl-4 font-mono text-sm">
        {role.highlights?.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5">
        {role.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>;
```

---

## 7. Projects Section

### Data Structure

```ts
// src/constants/projects.ts
export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  highlights?: string[];
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Project Name",
    url: "https://project.com",
    description: "Brief description",
    technologies: ["React", "TypeScript"],
  },
];
```

### Pattern

- Simple list or card layout
- Each project has: title + link arrow, description, tech badges
- No heavy card styling — bordered container or plain list

---

## 8. Blog Section

2-column grid of recent posts with dark screenshot thumbnails.

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {posts.map((post) => (
    <a key={post.slug} href={`/blog/${post.slug}`} className="group">
      <div className="overflow-hidden rounded-lg border border-border">
        <Image
          src={post.thumbnail}
          alt={post.title}
          className="aspect-video w-full object-cover"
        />
      </div>
      <h3 className="mt-3 font-medium group-hover:underline">{post.title}</h3>
      <p className="font-mono text-xs text-text-secondary">{post.date}</p>
    </a>
  ))}
</div>
```

---

## 9. Navigation (Sticky Navbar)

```tsx
<nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-sm">
  {/* Logo — left */}
  <a href="/" className="font-bold text-lg">
    VG
  </a>

  {/* Links — center (monospaced) */}
  <div className="flex items-center gap-6 font-mono text-sm text-text-secondary">
    <a href="/" className="hover:text-text-primary transition-colors">
      Portfolio
    </a>
    <a href="/blog" className="hover:text-text-primary transition-colors">
      Blog
    </a>
  </div>

  {/* Actions — right */}
  <div className="flex items-center gap-2">
    <button className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs">
      ⌘ K
    </button>
    <ThemeToggle />
  </div>
</nav>
```

---

## 10. Section Order on Main Page

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <HeroSection />
      <SocialLinksSection />
      <AboutSection />
      <StackSection />
      <ComponentsSection /> {/* Optional — if showcasing components */}
      <BlogSection /> {/* Optional — if blog exists */}
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
```

---

## 11. Footer

Minimal footer with inspiration credit and social links:

```tsx
<footer className="border-t border-border py-8 text-center font-mono text-xs text-text-muted">
  <p>
    Built by{" "}
    <a href="/" className="text-text-secondary hover:text-text-primary">
      Vicky Gupta
    </a>
  </p>
</footer>
```
