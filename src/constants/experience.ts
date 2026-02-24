export interface ExperienceRole {
  title: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  period: string;
  description?: string;
  highlights?: string[];
  technologies: string[];
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  isActive?: boolean;
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
        title: "Senior Full Stack Developer",
        type: "Full-time",
        period: "01.2024 – Present",
        highlights: [
          "Led development of core product features using Next.js and TypeScript",
          "Architected and built a reusable component library used across 3 internal products",
          "Improved application performance by 40% through code splitting and lazy loading",
          "Mentored junior developers and conducted code reviews",
        ],
        technologies: [
          "TypeScript",
          "Next.js",
          "React",
          "Tailwind CSS",
          "PostgreSQL",
          "Prisma",
        ],
      },
    ],
  },
  {
    id: "2",
    company: "Previous Company",
    companyUrl: "https://previous.com",
    roles: [
      {
        title: "Full Stack Developer",
        type: "Full-time",
        period: "06.2022 – 12.2023",
        highlights: [
          "Developed and maintained full-stack web applications serving 10K+ users",
          "Built RESTful APIs with Node.js and integrated third-party services",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
        ],
        technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS", "Redis"],
      },
    ],
  },
  {
    id: "3",
    company: "Startup Co",
    companyUrl: "https://startup.co",
    roles: [
      {
        title: "Frontend Developer",
        type: "Internship",
        period: "01.2022 – 05.2022",
        highlights: [
          "Built responsive UIs from Figma designs with pixel-perfect accuracy",
          "Collaborated with the design team to create a shared component system",
        ],
        technologies: ["React", "JavaScript", "CSS", "Figma"],
      },
    ],
  },
];
