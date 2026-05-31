"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { Side, SpotlightCard } from "@/components/common/Spotlight";
import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { codingProfiles } from "@/constants/coding-profiles";
import { useMediaQuery } from "@/hooks/use-media-query";

export function CodingProfilesSection() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  function getBorderSides(index: number): Side[] {
    if (isSmallScreen) {
      if (index === 0) return ["bottom"];
      if (index === 1) return ["top", "bottom"];
      if (index === 2) return ["top", "bottom"];
      if (index === 3) return ["top"];
      return [];
    } else {
      if (index === 0) return ["right", "bottom"];
      if (index === 1) return ["left", "bottom"];
      if (index === 2) return ["right", "top"];
      if (index === 3) return ["left", "top"];
    }
  }
  return (
    <Section
      id="coding-profiles"
      title="Coding Profiles"
      count={codingProfiles.length}
      contentClassName="p-0 sm:p-0"
    >
      <motion.div
        className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {codingProfiles.map((profile, index) => (
          <motion.a
            key={profile.platform}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
          >
            <SpotlightCard
              className="group flex items-center gap-2.5 px-3 py-3 transition-colors  group my-px sm:gap-3 sm:px-4 sm:py-4"
              sides={getBorderSides(index)}
            >
              {/* Platform Icon */}
              <div className="m-px flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden border border-edge border-dashed bg-surface transition-colors group-hover:border-accent/60 sm:h-9 sm:w-9 group-hover:-rotate-10 duration-300">
                {profile.logo ? (
                  <Image
                    src={profile.logo}
                    alt={`${profile.platform} logo`}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                ) : (
                  <profile.icon className="h-5 w-5 text-text-primary" />
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-text-primary sm:text-sm">
                    {profile.platform}
                  </span>
                  {profile.rating && (
                    <span
                      className="px-2 py-0.5 text-[9px] font-semibold sm:text-[10px]"
                      style={{
                        backgroundColor: `${profile.ratingColor}20`,
                        color: profile.ratingColor,
                      }}
                    >
                      {profile.rating}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-text-muted group-hover:text-text-secondary transition-colors sm:text-xs">
                  @{profile.handle}
                  {profile.rank && (
                    <span className="ml-1.5 text-text-muted group-hover:text-text-secondary transition-colors">
                      · {profile.rank}
                    </span>
                  )}
                </p>
              </div>

              <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-accnet group-hover:opacity-100 group-hover:rotate-45 duration-300 group-hover:text-text-primary" />
            </SpotlightCard>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
