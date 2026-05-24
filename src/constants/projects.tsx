import { StaticImageData } from "next/image";

import codeVerseIcon from "@/assets/images/projects/codeverse-icon.svg";
import whiteboardIcon from "@/assets/images/projects/whiteboard-icon.png";

export interface Project {
  id: string;
  slug: string;
  title: string;
  url: string;
  githubUrl?: string;
  description: string;
  highlights?: string[] | React.ReactNode[];
  technologies: string[];
  screenshot?: string; // Path to screenshot in public/images/projects/
  icon?: StaticImageData;
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
    description: "",
    highlights: [
      <>
        <strong className="font-semibold">Engineered</strong> a{" "}
        <strong className="font-semibold">
          comprehensive browser-based code editor and compiler
        </strong>
        supporting{" "}
        <strong className="font-semibold">
          Python, Java, C, C++, and JavaScript
        </strong>
        , featuring an{" "}
        <strong className="font-semibold">integrated terminal</strong>,{" "}
        <strong className="font-semibold">intelligent autocomplete</strong>, and{" "}
        <strong className="font-semibold">
          multi-tab workspace management
        </strong>
        .
      </>,
      <>
        <strong className="font-semibold">Handled GB-scale</strong> local
        file/folder imports{" "}
        <strong className="font-semibold">without UI degradation</strong> by
        implementing{" "}
        <strong className="font-semibold">virtualized rendering</strong>,{" "}
        <strong className="font-semibold">debounced state updates</strong>, and
        offloading heavy directory computations to{" "}
        <strong className="font-semibold">Web Workers</strong> to maintain a{" "}
        <strong className="font-semibold">less blocking main thread</strong>.
      </>,
      <>
        <strong className="font-semibold">Built</strong> a{" "}
        <strong className="font-semibold">
          containerized Node.js/Express backend
        </strong>{" "}
        using <strong className="font-semibold">Docker</strong>, executing{" "}
        <strong className="font-semibold">untrusted user code</strong> in{" "}
        <strong className="font-semibold">
          heavily isolated, non-root environments
        </strong>
        . Implemented{" "}
        <strong className="font-semibold">
          custom rate and speed limiters
        </strong>{" "}
        to mitigate resource exhaustion and DoS attacks.
      </>,
      <>
        <strong className="font-semibold">Leveraged</strong>{" "}
        <strong className="font-semibold">IndexedDB and local storage</strong>{" "}
        for{" "}
        <strong className="font-semibold">
          persistent, high-speed file caching
        </strong>
        . Implemented{" "}
        <strong className="font-semibold">aggressive memoization</strong> and{" "}
        <strong className="font-semibold">optimized data structures</strong>{" "}
        (trees/hash maps) to{" "}
        <strong className="font-semibold">drastically reduce</strong> data
        access latency and directory traversal times.
      </>,
    ],
    technologies: ["ReactJs", "Tailwind CSS", "Node.js", "Docker", "Firebase"],
    screenshot: "/images/projects/codeverse.png",
    icon: codeVerseIcon,
    // featured: true,
    // status: "live",
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
      <>Pen with color and size adjustment</>,
      <>Eraser with size adjustment</>,
      <>Background color change of the whiteboard</>,
      <>Shapes like line, rectangle, circle to draw</>,
      <>Undo, Redo, Clear the whiteboard drawing</>,
      <>Dark and light mode with save/load from local storage</>,
    ],
    technologies: ["JavaScript", "HTML", "Tailwind CSS"],
    screenshot: "/images/projects/scribbleverse.png",
    icon: whiteboardIcon,
    // featured: true,
    // status: "live",
  },
];
