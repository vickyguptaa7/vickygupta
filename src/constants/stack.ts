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
  category?: string;
}

export const techStack: TechItem[] = [
  // Languages
  { name: "C", icon: SiC, category: "Language" },
  { name: "C++", icon: SiCplusplus, category: "Language" },
  { name: "JavaScript", icon: SiJavascript, category: "Language" },
  { name: "TypeScript", icon: SiTypescript, category: "Language" },
  // Frontend
  { name: "HTML5", icon: SiHtml5, category: "Frontend" },
  { name: "CSS3", icon: SiCss3, category: "Frontend" },
  { name: "React", icon: SiReact, category: "Frontend" },
  { name: "Redux", icon: SiRedux, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  // Backend
  { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
  { name: "Express", icon: SiExpress, category: "Backend" },
  { name: "Firebase", icon: SiFirebase, category: "Backend" },
  // Database
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "MySQL", icon: SiMysql, category: "Database" },
  // Tools
  { name: "Git", icon: SiGit, category: "Tools" },
  { name: "GitHub", icon: SiGithub, category: "Tools" },
  { name: "VS Code", icon: VscCode, category: "Tools" },
  { name: "Netlify", icon: SiNetlify, category: "Tools" },
  { name: "Docker", icon: SiDocker, category: "Tools" },
  { name: "Render", icon: SiRender, category: "Tools" },
];
