"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { CommandPalette } from "@/components/common/command-palette";
import { TransitionLink } from "@/components/common/page-transition";
import { ThemeToggle } from "@/components/common/theme-toggle";

import { cn } from "@/lib/utils";

import { topNavLinks } from "@/constants/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className={cn(
        "fixed left-0 top-0 right-0 z-50 transition-all duration-300",
        " bg-background/60 backdrop-blur-xl",
      )}
    >
      <div className="flex h-12 items-center justify-between px-4 border-edge border-l border-r max-w-3xl mx-auto screen-line-after screen-line-before mt-2">
        {/* Left — Logo */}
        <TransitionLink
          href="/"
          className="font-mono text-sm font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
        >
          VG
        </TransitionLink>

        {/* Centre — Page links */}
        <div className="flex items-center gap-0.5">
          {topNavLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary",
                )}
              >
                {link.label}
              </TransitionLink>
            );
          })}
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-1">
          <CommandPalette />
          <a
            href="https://github.com/vickyguptaa7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="GitHub"
          >
            <FaGithub size={14} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
