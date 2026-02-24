import {
  FiBriefcase,
  FiClock,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

import type { IconType } from "react-icons";

export interface OverviewItem {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
  isLiveTime?: boolean;
}

export const overviewItems: OverviewItem[] = [
  {
    icon: FiBriefcase,
    label: "Role",
    value: "Full Stack Developer",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "India",
    href: "https://www.google.com/maps/search/?api=1&query=India",
  },
  {
    icon: FiClock,
    label: "Local time",
    value: "",
    isLiveTime: true,
  },
  {
    icon: FiGlobe,
    label: "Website",
    value: "vickygupta.dev",
    href: "https://vickygupta.dev",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "hello@vickygupta.dev",
    href: "mailto:hello@vickygupta.dev",
  },
  {
    icon: FiUser,
    label: "Pronouns",
    value: "he/him",
  },
];
