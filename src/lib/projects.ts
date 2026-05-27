import { projects, type Project } from "@/constants/projects";

export interface ProjectDetail extends Project {
  content: string;
}

const projectContentBySlug: Record<string, string> = {
  "code-verse": `## Overview

Code Verse is a browser-based coding workspace built for writing, organizing, and running code across multiple languages. It combines a code editor, terminal-style execution flow, file management, and persistent local storage into a focused developer experience.

## Engineering Highlights

- Supports Python, Java, C, C++, and JavaScript execution from a unified web interface.
- Uses multi-tab workspace management so users can switch between files without losing context.
- Handles large local file and folder imports with virtualized rendering, debounced updates, and worker-backed directory processing.
- Persists workspace data with IndexedDB and local storage for faster repeat access.
- Runs untrusted code through a Docker-backed Node.js and Express service with isolated, non-root environments.
- Applies custom rate and speed limiters to reduce resource exhaustion risk.

## Stack

The frontend is built with React and Tailwind CSS. The execution backend uses Node.js, Express, Docker, and Firebase for supporting application services.`,

  "scribble-verse": `## Overview

Scribble Verse is a lightweight digital whiteboard for sketching, annotating, and experimenting directly in the browser. It recreates the immediacy of a physical whiteboard while adding persistent state and theme support.

## Features

- Draw with a configurable pen color and stroke size.
- Erase with adjustable eraser sizing.
- Change the whiteboard background color.
- Create common shapes including lines, rectangles, and circles.
- Undo, redo, and clear drawing actions.
- Switch between dark and light modes with state saved locally.

## Stack

The project is built with JavaScript, HTML, and Tailwind CSS, with local storage used to preserve preferences and board state.`,
};

function withProjectContent(project: Project): ProjectDetail {
  return {
    ...project,
    content:
      projectContentBySlug[project.slug] ??
      `## Overview\n\n${project.description || project.title}`,
  };
}

export function getAllProjects(): ProjectDetail[] {
  return projects.map(withProjectContent);
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  const project = projects.find((item) => item.slug === slug);
  return project ? withProjectContent(project) : null;
}
