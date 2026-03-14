"use client";

import { FiArrowUp } from "react-icons/fi";

import { Panel, PanelContent } from "@/components/common/panel";
import { VisitorCounter } from "@/components/common/visitor-counter";

import { socialLinks } from "@/constants/social-links";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Panel>
      <PanelContent className="flex flex-col items-center gap-4 py-8">
        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-1.5 border border-edge px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent/30 hover:text-accent cursor-pointer"
          aria-label="Back to top"
        >
          <FiArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
          Back to top
        </button>

        {/* Social icons */}
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-xs text-text-muted transition-colors hover:bg-surface hover:text-text-primary border border-edge hover:border-black/30 border-dashed"
              aria-label={link.name}
            >
              <link.icon size={20} className="" />
            </a>
          ))}
        </div>

        {/* Visitor counter */}
        <VisitorCounter />

        {/* Attribution */}
        <p className="font-mono text-xs text-text-muted">
          Built by{" "}
          <a
            href="/"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            Vicky Gupta
          </a>
        </p>
      </PanelContent>
    </Panel>
  );
}
