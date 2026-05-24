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
        title: "Development Engineer",
        type: "Full-time",
        period: "06.2024 – Present",
        highlights: [
          <>
            {" "}
            Delivered a{" "}
            <strong className="font-semibold">
              granular risk profile feature
            </strong>{" "}
            allowing users to assign{" "}
            <strong className="font-semibold">
              dedicated configurations per AWS, Azure, or GCP account
            </strong>
            . This replaced monolithic profiles, enabling{" "}
            <strong className="font-semibold">
              precise security posture management
            </strong>{" "}
            across complex networks.{" "}
          </>,

          <>
            {" "}
            Led the validation and release of a{" "}
            <strong className="font-semibold">
              GCP risk assessment feature
            </strong>
            , ensured{" "}
            <strong className="font-semibold">
              accurate vulnerability detection
            </strong>{" "}
            across GCP VPCs firewall rules and network firewall policies,
            supporting <strong>standard, custom, and zone-based risks</strong>
            .{" "}
          </>,

          <>
            {" "}
            Drove end-to-end testing for a{" "}
            <strong className="font-semibold">
              dynamic, tenant-specific logging architecture
            </strong>
            , validated XML-based controls that{" "}
            <strong className="font-semibold">
              slashed production log volume
            </strong>
            —dropping microservice logs{" "}
            <strong className="font-semibold">from 102k to 8k</strong> and{" "}
            <strong className="font-semibold">80k to 4.5k</strong> reducing
            storage noise and{" "}
            <strong className="font-semibold">
              extending log retention to a full month
            </strong>
            .{" "}
          </>,

          <>
            {" "}
            Owned the end-to-end testing infrastructure for these features,
            maintaining a strict{" "}
            <strong className="font-semibold">98% automation pass rate</strong>.
            Conducted{" "}
            <strong className="font-semibold">deep root-cause analysis</strong>{" "}
            on complex system bugs and continuously refactored automation suites
            to <strong>eliminate flaky tests</strong> and ensure reliable
            delivery.{" "}
          </>,
        ],
        technologies: ["Java", "AWS", "Azure", "GCP", "Kubernetes", "Jenkins"],
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
            <strong className="font-semibold">"Arena Battle"</strong> a gamified
            coding competition and{" "}
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
