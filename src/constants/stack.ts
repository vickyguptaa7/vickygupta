import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiRender,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export interface TechItem {
  name: string;
  icon: IconType;
  color: string;
  category?: string;
}

export const techStack: TechItem[] = [
  // Languages
  { name: "C", icon: SiC, color: "#A8B9CC", category: "Language" },
  { name: "C++", icon: SiCplusplus, color: "#00599C", category: "Language" },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    category: "Language",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    category: "Language",
  },
  // Frontend
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "Frontend" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", category: "Frontend" },
  { name: "React", icon: SiReact, color: "#61DAFB", category: "Frontend" },
  { name: "Redux", icon: SiRedux, color: "#764ABC", category: "Frontend" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "Frontend",
  },
  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "Backend" },
  { name: "Express", icon: SiExpress, color: "#888888", category: "Backend" },
  { name: "Firebase", icon: SiFirebase, color: "#DD2C00", category: "Backend" },
  // Database
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Database" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "Database" },
  // Tools
  { name: "Git", icon: SiGit, color: "#F05032", category: "Tools" },
  { name: "GitHub", icon: SiGithub, color: "#888888", category: "Tools" },
  { name: "VS Code", icon: VscCode, color: "#007ACC", category: "Tools" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7", category: "Tools" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "Tools" },
  { name: "Render", icon: SiRender, color: "#46E3B7", category: "Tools" },
];
