"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { codingProfiles } from "@/constants/coding-profiles";
import { cn } from "@/lib/utils";

export function CodingProfilesSection() {
  return (
    <Section
      id="coding-profiles"
      title="Coding Profiles"
      count={codingProfiles.length}
      contentClassName="p-0 sm:p-0"
    >
      <motion.div
        className="grid grid-cols-1 gap-1.5 screen-line-after sm:grid-cols-2 sm:gap-2"
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
            className={cn(
              `group flex items-center gap-2.5 px-3 py-3 transition-colors hover:bg-surface group border-dashed my-px border-edge sm:gap-3 sm:px-4 sm:py-4`,
              index <= 1 && "border-y sm:border-t-0 sm:border-b",
              index >= 2 && "border-y sm:border-b-0 sm:border-t",
              index % 2 == 0 && "sm:border-r",
              index % 2 == 1 && "sm:border-l",
              index % 4 == 0 && "border-t-0",
              index % 4 == 3 && "border-b-0",
            )}
          >
            {/* Platform Icon */}
            <div className="m-px flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-edge border-dashed bg-surface transition-colors group-hover:border-accent/20 sm:h-9 sm:w-9 group-hover:-rotate-10 duration-300">
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
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
