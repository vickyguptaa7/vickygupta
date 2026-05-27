import { TransitionLink } from "@/components/common/page-transition";
import { socialLinks } from "@/constants/social-links";

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1XY3laHq5E781TUEJ6apap02qkwQRonGT/view?usp=drive_link",
  },
];

export function BlogFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto max-w-2xl px-3 py-9 sm:px-4 sm:py-12">
        <div className="grid gap-8 text-xs sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10 sm:text-sm">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#909092] sm:text-xs">
                Navigate
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {footerNavLinks.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  if (isExternal) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#909092] transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <TransitionLink
                      key={link.label}
                      href={link.href}
                      className="text-[#909092] transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </TransitionLink>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#909092] sm:text-xs">
                Connect
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#909092] transition-colors hover:text-text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="mailto:vickyguptaa7@gmail.com"
                  className="text-[#909092] transition-colors hover:text-text-primary"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#909092] sm:text-sm">
            © 2026 Vicky Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
