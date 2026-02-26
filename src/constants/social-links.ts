import type { IconType } from "react-icons";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaXTwitter } from "react-icons/fa6";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vickyguptaa7/",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/vickyguptaa7/",
    icon: FaGithubSquare,
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
  },
];
