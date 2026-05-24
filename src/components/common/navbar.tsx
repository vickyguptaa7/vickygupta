"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CommandPalette } from "@/components/common/command-palette";
import { TransitionLink } from "@/components/common/page-transition";
import { ThemeToggle } from "@/components/common/theme-toggle";

import { cn } from "@/lib/utils";

import { topNavLinks } from "@/constants/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowImage(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="max-w-4xl mx-auto">
        <div className="flex h-12 items-center justify-between px-2 mx-4 screen-line-after screen-line-before mt-2  border-edge border-l border-dashed border-r ">
          {/* Left — Logo */}
          {showImage && (
            <TransitionLink
              href="/"
              className="font-mono text-sm font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 rounded-sm overflow-hidden border border-edge"
              >
                <Image
                  src="/images/author.jpeg"
                  alt="VG"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover p-px rounded-sm"
                />
              </motion.div>
            </TransitionLink>
          )}

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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
