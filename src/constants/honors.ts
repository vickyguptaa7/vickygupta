import type { IconType } from "react-icons";
import { FiAward, FiBook } from "react-icons/fi";

export interface HonorItem {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
  icon: IconType;
}

export const honorsData: HonorItem[] = [
  {
    title: "Dean's List — Academic Excellence",
    issuer: "University",
    date: "2022",
    description: "Recognized for outstanding academic performance.",
    icon: FiAward,
  },
  {
    title: "Hackathon Winner — Best Technical Solution",
    issuer: "TechFest",
    date: "2023",
    description:
      "Won first place for building an innovative AI-powered application.",
    icon: FiAward,
  },
];

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon: IconType;
}

export const certificationsData: CertificationItem[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialUrl: "#",
    icon: FiBook,
  },
  {
    title: "Meta Front-End Developer Certificate",
    issuer: "Meta (Coursera)",
    date: "2023",
    credentialUrl: "#",
    icon: FiBook,
  },
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google (Coursera)",
    date: "2022",
    credentialUrl: "#",
    icon: FiBook,
  },
];
