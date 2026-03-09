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
    iconColor: "text-[#0A66C2]",
  },
  {
    name: "GitHub",
    url: "https://github.com/vickyguptaa7/",
    icon: FaGithubSquare,
    iconColor: "text-text-primary",
  },
  // {
  //   name: "Email",
  //   url: "mailto:vickyguptaa7@gmail.com",
  //   icon: FiMail,
  // },
  {
    name: "X (Twitter)",
    url: "https://x.com/vickyguptaa7",
    icon: FaSquareXTwitter,
    iconColor: "text-text-primary",
  },
];
