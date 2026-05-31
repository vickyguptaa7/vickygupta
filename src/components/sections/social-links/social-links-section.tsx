"use client";

import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";

import { cn } from "@/lib/utils";

import { Side, SpotlightCard } from "@/components/common/Spotlight";
import { socialLinks } from "@/constants/social-links";
import { useMediaQuery } from "@/hooks/use-media-query";

export function SocialLinksSection() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  function getBorderSides(index: number): Side[] {
    if (isSmallScreen) {
      if (index === 0) return ["right", "bottom"];
      if (index === 1) return ["left", "bottom"];
      if (index === 2) return ["right", "top"];
      if (index === 3) return ["left", "top"];
      return [];
    } else {
      if (index === 0) return ["right"];
      if (index === socialLinks.length - 1) return ["left"];
      return ["left", "right"];
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch">
      {/* Social Links */}
      <SpotlightCard containerClassName="w-full" sides={["top"]}>
        <div className="flex-1 min-w-0">
          <motion.div
            className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                className={cn(
                  ` `,
                  // "sm:border-l sm:border-r",
                  // index % 4 == 0 && "sm:border-l-0",
                  // index % 4 == 3 && "sm:border-r-0",
                  // index % 2 == 0 && "border-r ",
                  // index % 2 == 1 && "border-l",
                  // index <= 1 && "border-b sm:border-b-0",
                  // index >= 2 && "border-t sm:border-t-0",
                )}
              >
                <SpotlightCard
                  containerClassName="h-full w-full"
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs active:scale-[0.99] sm:gap-3 sm:px-4 sm:py-3.5 sm:text-sm group"
                  sides={getBorderSides(index)}
                >
                  <link.icon
                    className={cn(
                      "h-5 w-5 border border-dashed border-edge rounded-xs shrink-0 group-hover:border-accent/60 group-hover:-rotate-10 duration-300 transition-colors sm:h-6 sm:w-6",
                      link.iconColor || "text-text-primary",
                    )}
                  />
                  <span className="text-text-primary font-medium hero-name-underline relative">
                    {link.name}
                  </span>
                  <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-accent group-hover:opacity-100 group-hover:rotate-45 duration-300" />
                </SpotlightCard>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </SpotlightCard>
    </div>
  );
}
