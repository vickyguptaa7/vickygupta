export interface Project {
  id: string;
  slug: string;
  title: string;
  url: string;
  githubUrl?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  screenshot?: string; // Path to screenshot in public/images/projects/
  featured?: boolean;
  status?: "live" | "building" | "archived";
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "code-verse",
    title: "Code Verse",
    url: "https://code-verse-app.netlify.app/",
    githubUrl: "https://github.com/vickyguptaa7/Code-Verse",
    description:
      "CodeVerse, an online code editor and compiler designed to support various programming languages including Java, C++, Python, and more.",
    highlights: [
      "Multiple tabs for editing multiple files simultaneously",
      "Integrated terminal with online compilation",
      "Search and replace functionality with code folding",
      "Import/download files and folders from local system",
      "Autocomplete suggestions and multiple language support",
      "Persistent storage of files and folders",
    ],
    technologies: ["ReactJs", "Tailwind CSS", "Node.js", "Docker", "Firebase"],
    screenshot: "/images/projects/codeverse.png",
    featured: true,
    status: "live",
  },
  {
    id: "2",
    slug: "scribble-verse",
    title: "Scribble Verse",
    url: "https://vickyguptaa7.github.io/Scribble-Verse/",
    githubUrl: "https://github.com/vickyguptaa7/WhiteBoard",
    description:
      "Whiteboard, a digital tool that emulates the functionality of a physical whiteboard. Users can draw, write, and take notes in a digital format.",
    highlights: [
      "Pen with color and size adjustment",
      "Eraser with size adjustment",
      "Background color change of the whiteboard",
      "Shapes like line, rectangle, circle to draw",
      "Undo, Redo, Clear the whiteboard drawing",
      "Dark and light mode with save/load from local storage",
    ],
    technologies: ["JavaScript", "HTML", "Tailwind CSS"],
    screenshot: "/images/projects/scribbleverse.png",
    featured: true,
    status: "live",
  },
];
