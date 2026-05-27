import { StaticImageData } from "next/image";

import algosecLogo from "@/assets/images/experience/algosec.jpg";
import algozenithLogo from "@/assets/images/experience/algozenith.jpeg";

export interface ExperienceRole {
  title: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  period: string;
  description?: string;
  highlights?: string[] | React.ReactNode[];
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
        title: "Software Engineer",
        type: "Full-time",
        period: "05.2026 – Present",
        highlights: [
          <>
            Ramping up on architecture, product context, and team workflows
            while turning questions into clarity.
          </>,
        ],
        technologies: [
          "ReactJs",
          "NextJs",
          "JavaScript",
          "TypeScript",
          "TailwindCSS",
          "Django",
          "React Query",
          "RestAPI",
        ],
      },
      {
        title: "Development Engineer",
        type: "Full-time",
        period: "06.2024 – 05.2026",
        highlights: [
          <>
            {" "}
            Led the validation of a{" "}
            <strong className="font-semibold">GCP risk feature</strong>,ensured
            accurate
            <strong className="font-semibold">
              vulnerability detection
            </strong>{" "}
            across
            <strong className="font-semibold"> VPCs firewall rules </strong>and
            <strong className="font-semibold">network firewall policies</strong>
            , supporting standard,{" "}
            <strong className="font-semibold">custom</strong>, and{" "}
            <strong className="font-semibold">zone-based</strong> risks.
          </>,

          <>
            {" "}
            Engineered{" "}
            <strong className="font-semibold">
              E2E validation architecture{" "}
            </strong>
            for{" "}
            <strong className="font-semibold">granular risk profiles</strong>,
            covering{" "}
            <strong className="font-semibold">
              100% of AWS, Azure, and GCP{" "}
            </strong>
            configurations during migration from{" "}
            <strong className="font-semibold">legacy profile</strong>.
          </>,

          <>
            Owned{" "}
            <strong className="font-semibold">
              core cloud-risk feature automation
            </strong>
            , improving reliability to{" "}
            <strong className="font-semibold">99%</strong> and{" "}
            <strong className="font-semibold">
              reducing manual release validation effort by 80%
            </strong>{" "}
            across distributed microservice workflows.
          </>,
        ],
        technologies: ["AWS", "Azure", "GCP", "Java", "Kubernetes", "Jenkins"],
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
          <>
            Collaboratively developed a{" "}
            <strong className="font-semibold">
              one-stop learning platform
            </strong>{" "}
            from the ground up used by{" "}
            <strong className="font-semibold">1,000+ daily active users</strong>{" "}
            to enhance their{" "}
            <strong className="font-semibold">
              DSA, competitive programming, and development skills
            </strong>
            .
          </>,
          <>
            Architected{" "}
            <strong className="font-semibold">&quot;Arena Battle&quot;</strong>{" "}
            a gamified coding competition and{" "}
            <strong className="font-semibold">interactive problem page</strong>,
            directly driving a{" "}
            <strong className="font-semibold">
              30% increase in platform engagement
            </strong>
            .
          </>,
          <>
            Optimized application performance by implementing{" "}
            <strong className="font-semibold">
              advanced image compression
            </strong>{" "}
            and reducing API calls through{" "}
            <strong className="font-semibold">caching</strong>, resulting in a{" "}
            <strong className="font-semibold">
              40% improvement in load times
            </strong>{" "}
            and a{" "}
            <strong className="font-semibold">
              25% reduction in bandwidth usage
            </strong>
            .
          </>,
          <>
            Built{" "}
            <strong className="font-semibold">
              extensible UI architectures
            </strong>{" "}
            for complex interactive features like{" "}
            <strong className="font-semibold">
              problem pages, courses, playlists, and contests
            </strong>
            , enhancing{" "}
            <strong className="font-semibold">
              platform consistency and perceived load speeds
            </strong>{" "}
            through{" "}
            <strong className="font-semibold">
              optimistic UI patterns, lazy loading, and skeleton loaders
            </strong>{" "}
            across{" "}
            <strong className="font-semibold">
              high-traffic user workflows
            </strong>
            .
          </>,
        ],
        technologies: [
          "ReactJs",
          "NextJs",
          "JavaScript",
          "TypeScript",
          "TailwindCSS",
          "Django",
          "React Query",
          "RestAPI",
        ],
      },
    ],
  },
];
