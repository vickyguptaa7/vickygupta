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
    value: "Software Engineer",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Delhi, India",
    href: "https://www.google.com/maps/search/?api=1&query=Delhi+India",
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
    value: "vickyguptaa7@gmail.com",
    href: "mailto:vickyguptaa7@gmail.com",
  },
  {
    icon: FiUser,
    label: "Pronouns",
    value: "he/him",
  },
];
