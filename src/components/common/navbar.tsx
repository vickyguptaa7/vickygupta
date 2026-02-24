"use client";

import { FaGithub } from "react-icons/fa";

import { ThemeToggle } from "@/components/common/theme-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-2 z-50 screen-line-after screen-line-before bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between border-x border-edge px-4 py-3">
        {/* Logo */}
        <a
          href="/"
          className="font-mono text-sm font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
        >
          Portfolio
        </a>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/vickygupta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
          >
            <FaGithub size={14} />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
