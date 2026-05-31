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
import { SpotlightCard } from "./Spotlight";

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
        " bg-background/60 backdrop-blur-xl flex gap-0",
      )}
    >
      <SpotlightCard
        containerClassName="hidden md:flex h-12 mt-1.5 flex-1"
        sides={["top", "bottom"]}
      >
        {null}
      </SpotlightCard>
      <div className="max-w-[calc(896px-2rem)] w-full mx-auto">
        {/* UI purpose to extend the borderline to end */}
        <SpotlightCard
          containerClassName="mt-1.5 px-1.5 mx-3 lg:mx-0  sm:h-12 sm:px-2"
          className="flex items-center"
        >
          <div className=" flex h-11 items-center justify-between flex-1">
            {/* Left — Logo */}
            {showImage && (
              <TransitionLink
                href="/"
                className="font-mono text-xs font-bold tracking-tight text-text-primary transition-colors hover:text-accent sm:text-sm"
              >
                <SpotlightCard
                  dashGap={2}
                  dashLength={4}
                  containerClassName="rounded-sm"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="w-7 h-7 rounded-sm overflow-hidden p-0.5"
                  >
                    <Image
                      src="/images/author.jpeg"
                      alt="VG"
                      width={28}
                      height={28}
                      className="w-full h-full object-cover p-px rounded-sm"
                    />
                  </motion.div>
                </SpotlightCard>
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
                      "relative px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs",
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
        </SpotlightCard>
      </div>
      <SpotlightCard
        containerClassName="hidden md:flex h-12 mt-1.5 flex-1"
        sides={["top", "bottom"]}
      >
        {null}
      </SpotlightCard>
    </motion.nav>
  );
}
