import { StaticImageData } from "next/image";

import algosecLogo from "@/assets/images/experience/algosec.jpg";
import algozenithLogo from "@/assets/images/experience/algozenith.jpeg";

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
  logo?: StaticImageData;
  isActive?: boolean;
  roles: ExperienceRole[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "AlgoSec",
    companyUrl: "https://www.algosec.com/products/algosec-cloud",
    logo: algosecLogo,
    isActive: true,
    roles: [
      {
        title: "Software Development Engineer",
        type: "Full-time",
        period: "06.2024 – Present",
        highlights: [
          "Developed network security applications for the AlgoNext project, enhancing network security and resilience",
          "Automated over 30+ test scenarios using Selenium, increasing test coverage by 20% and reducing manual testing efforts",
          "Reported and tracked 15+ bugs during testing phases, collaborating with senior team members to resolve issues and improve product quality",
        ],
        technologies: [
          "Java",
          "Kubernetes",
          "AWS",
          "Azure",
          "Jenkins",
          "Bitbucket",
          "Git",
        ],
      },
    ],
  },
  {
    id: "2",
    company: "AlgoZenith",
    companyUrl: "https://maang.in/premium",
    logo: algozenithLogo,
    roles: [
      {
        title: "Software Engineer Intern",
        type: "Internship",
        period: "08.2023 – 04.2024",
        highlights: [
          "Collaboratively developed a one-stop learning platform from the ground up, used by thousands of users to enhance their DSA, competitive programming and development skills",
          "Developed an 'Arena Battle' mode - an in-platform coding competition feature - and an interactive online code editor with a gamified leaderboard, increasing user engagement by 30%",
          "Optimized application performance by implementing image compression and reducing API calls, resulting in a 40% improvement in load times and a 25% reduction in bandwidth usage",
        ],
        technologies: [
          "ReactJs",
          "NextJs",
          "JavaScript",
          "React Query",
          "RestAPI",
          "GitHub",
          "Git",
        ],
      },
    ],
  },
];
