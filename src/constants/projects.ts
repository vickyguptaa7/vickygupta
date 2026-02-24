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
    title: "CareerZenith",
    url: "https://careerzenith.com",
    description:
      "AI-powered resume builder with job optimization, ATS scoring, and real-time collaboration. Helps users craft perfect resumes tailored to specific job descriptions.",
    highlights: [
      "AI-driven keyword analysis and resume optimization",
      "Real-time collaboration and version history",
      "500+ active users",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "OpenAI",
    ],
  },
  {
    id: "2",
    title: "Portfolio",
    url: "https://vickygupta.dev",
    description:
      "Personal portfolio website built with Next.js 16, featuring clean bento-box design, dark/light mode, and scroll-triggered animations.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    id: "3",
    title: "DevTools Dashboard",
    url: "https://github.com/vickygupta/devtools-dashboard",
    description:
      "A developer productivity dashboard aggregating GitHub activity, deployment status, and project metrics into a single view.",
    technologies: ["React", "Node.js", "Docker", "Redis", "Chart.js"],
  },
];
