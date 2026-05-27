"use client";

import { usePathname } from "next/navigation";

import { CommandPalette } from "@/components/common/command-palette";
import { TransitionLink } from "@/components/common/page-transition";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";

const blogNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function BlogHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-3 sm:h-14 sm:px-4">
        <nav className="flex items-center gap-5 text-xs font-medium sm:text-sm">
          {blogNavLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/#contact"
                  ? pathname === "/blog"
                  : pathname.startsWith(link.href);

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  (
                    link.href === "/blog"
                      ? pathname.startsWith("/blog")
                      : isActive
                  )
                    ? "text-text-primary"
                    : "text-[#909092] hover:text-text-primary",
                )}
              >
                {link.label}
              </TransitionLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
