import type { IconType } from "react-icons";
import { FiAward } from "react-icons/fi";

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
    title: "Smart India Hackathon • Winner",
    issuer: "AICTE",
    date: "December 2023",
    description:
      "The winner under the problem statement given by AICTE 'Develop Online Proctored Exam Tool' Software Edition.",
    url: "https://drive.google.com/file/d/11KpbP_f7_s7xUv2yD2q7XwloCsltZxVZ/view",
    icon: FiAward,
  },
  {
    title: "Google Farewell Challenge • Global Rank 345",
    issuer: "Google",
    date: "April 2023",
    description:
      "Secured a global rank of 345 and an all-India rank of 128 in the Round A 2023 coding competition.",
    url: "https://drive.google.com/file/d/1Vls-iQqAV_Z84gk2UmDiO7xGHLenIl20/view?usp=drive_link",
    icon: FiAward,
  },
  {
    title: "Reply Coding Challenge • Global Rank 85",
    issuer: "Reply",
    date: "March 2023",
    description:
      "Secured a global rank of 85 in the Standard Edition coding competition (Team of 4).",
    url: "https://drive.google.com/file/d/1hCcVpx70VVQGAvpLCL67BvqDxyJWpTyb/view?usp=drive_link",
    icon: FiAward,
  },
  {
    title: "Google Kickstart • Global Rank 383",
    issuer: "Google",
    date: "October 2022",
    description:
      "Secured a global rank of 383 and an all-India rank of 248 in Round G 2022 coding competition.",
    url: "https://drive.google.com/file/d/1_NZhgJ3SPsAxMnO6mZPvRDtJ0m8CXy1D/view?usp=drive_link",
    icon: FiAward,
  },
  {
    title: "Smart India Hackathon • Finalist",
    issuer: "AICTE",
    date: "August 2022",
    description:
      "One of the finalists under the problem statement given by AICTE 'Graphical Password Authentication' Software Edition.",
    url: "https://drive.google.com/file/d/1jWVyusKzGxK6Ve7g0dD28gyicBT5k0bB/view?usp=drive_link",
    icon: FiAward,
  },
  {
    title: "Google Kickstart • Global Rank 772",
    issuer: "Google",
    date: "May 2022",
    description:
      "Secured a global rank of 772 and an all-India rank of 432 in Round C 2022 coding competition.",
    url: "https://drive.google.com/file/d/1CjDzk_xH8wRvEBywamR03bYJhRTAamZA/view?usp=drive_link",
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
    title: "Google Cloud Certified - Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "Feb 2025",
    credentialUrl:
      "https://www.credly.com/badges/3611dbac-6295-433c-8828-dd03255aee08/public_url",
    icon: FiAward,
  },
];
