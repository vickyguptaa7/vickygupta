import { Panel, PanelContent } from "@/components/common/panel";

import { socialLinks } from "@/constants/social-links";

export function Footer() {
  return (
    <Panel>
      <PanelContent className="flex flex-col items-center gap-4 py-8">
        {/* Social icons */}
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
              aria-label={link.name}
            >
              <link.icon size={14} />
            </a>
          ))}
        </div>

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
