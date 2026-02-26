"use client";

import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { codingProfiles } from "@/constants/coding-profiles";

export function CodingProfilesSection() {
  return (
    <Section
      id="coding-profiles"
      title="Coding Profiles"
      count={codingProfiles.length}
      contentClassName="p-0"
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2"
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
            className={`group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-surface screen-line-after ${
              index % 2 === 0 ? "sm:border-r sm:border-edge" : ""
            }`}
          >
            {/* Platform Icon */}
            <div className="border border-edge group-hover:border-accent/10">
              <div className="flex h-9 w-9 m-px shrink-0 items-center justify-center border border-edge bg-surface transition-colors group-hover:border-accent/10">
                <profile.icon className="h-5 w-5 text-text-primary" />
              </div>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">
                  {profile.platform}
                </span>
                {profile.rating && (
                  <span
                    className="px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${profile.ratingColor}20`,
                      color: profile.ratingColor,
                    }}
                  >
                    {profile.rating}
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted">
                @{profile.handle}
                {profile.rank && (
                  <span className="ml-1.5 text-text-muted">
                    · {profile.rank}
                  </span>
                )}
              </p>
            </div>

            <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-black group-hover:opacity-100 group-hover:rotate-45 duration-300" />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
