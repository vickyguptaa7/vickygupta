import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/vickygupta",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/vickygupta",
    icon: FaLinkedin,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/vickygupta",
    icon: FaXTwitter,
  },
  {
    name: "Email",
    url: "mailto:hello@vickygupta.dev",
    icon: FiMail,
  },
];
