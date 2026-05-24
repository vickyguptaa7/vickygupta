import type { IconType } from "react-icons";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
  iconColor?: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vickyguptaa7/",
    icon: FaLinkedin,
    iconColor: "text-text-primary",
  },
  {
    name: "GitHub",
    url: "https://github.com/vickyguptaa7/",
    icon: FaGithubSquare,
    iconColor: "text-text-primary",
  },
  {
    name: "Twitter",
    url: "https://x.com/vickyguptaa7",
    icon: FaSquareXTwitter,
    iconColor: "text-text-primary",
  },
];
