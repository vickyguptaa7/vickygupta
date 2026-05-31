"use client";

import { motion } from "motion/react";
import { BsCodeSlash } from "react-icons/bs";
import { FiClock, FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

import { SocialLinksSection } from "../social-links/social-links-section";
import { CopyableChip } from "./copyable-chip";
import { InfoChip } from "./info-chip";
import { LiveClock } from "./live-clock";
import { MagneticAvatar } from "./magnetic-avatar";
import { RotatingTagline } from "./rotating-tagline";

import { Section } from "@/components/common/section";
import { SpotlightCard } from "@/components/common/Spotlight";
import { heroData } from "@/constants/hero";
import { useMediaQuery } from "@/hooks/use-media-query";

export function HeroSection() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <Section id="profile" contentClassName="p-0 sm:p-0">
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Avatar Area */}
        <div className="flex">
          <MagneticAvatar />
          <SpotlightCard
            sides={["left"]}
            containerClassName="sm:hidden"
            className="group flex flex-col justify-center flex-1 p-3 "
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="text-xl font-semibold tracking-tight text-text-primary flex items-center gap-2 text-balance sm:text-2xl">
                <span className="hero-name-underline relative">
                  {heroData.name}
                </span>
                <motion.span
                  whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex"
                >
                  <MdVerified className="h-5 w-5 text-blue-500 shrink-0" />
                </motion.span>
              </h1>
              <div className="mt-1">
                <RotatingTagline />
              </div>
            </motion.div>
          </SpotlightCard>
        </div>

        {/* Info Area */}
        <SpotlightCard
          sides={[isSmallScreen ? "top" : "left"]}
          dashGap={3}
          dashLength={5}
        >
          <div className="flex flex-col flex-1 min-w-0">
            {/* Name + Tagline */}
            <div className="hidden sm:flex group flex-col justify-center flex-1 p-3 sm:p-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h1 className="text-xl font-semibold tracking-tight text-text-primary flex items-center gap-2 text-balance sm:text-2xl">
                  <span className="hero-name-underline relative">
                    {heroData.name}
                  </span>
                  <motion.span
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex"
                  >
                    <MdVerified className="h-5 w-5 text-blue-500 shrink-0" />
                  </motion.span>
                </h1>
                <div className="mt-1">
                  <RotatingTagline />
                </div>
              </motion.div>
            </div>

            {/* Metadata Row */}
            <SpotlightCard sides={[isSmallScreen ? "none" : "top"]}>
              <div className="flex flex-wrap items-center gap-1.5 p-3 sm:gap-2 sm:p-4">
                <InfoChip>
                  <BsCodeSlash
                    className="h-3.5 w-3.5 text-text-muted group-hover:text-text-primary transition-colors"
                    strokeWidth={"0.6"}
                  />
                  {heroData.role}
                </InfoChip>
                <CopyableChip
                  icon={FiMail}
                  value={heroData.email}
                  href={`mailto:${heroData.email}`}
                  target="_blank"
                  delay={0.05}
                />
                <InfoChip>
                  <IoLocationOutline className="h-3.5 w-3.5 text-text-muted group-hover:text-text-primary transition-colors" />
                  {heroData.location}
                </InfoChip>
                <InfoChip delay={0.15}>
                  <FiClock className="h-3.5 w-3.5 text-text-muted group-hover:text-text-primary transition-colors" />
                  <LiveClock />
                </InfoChip>
                <InfoChip>
                  <span className=" group-hover:text-text-primary transition-colors">
                    {heroData.pronouns}
                  </span>
                </InfoChip>
              </div>
            </SpotlightCard>
          </div>
        </SpotlightCard>
      </div>
      <SocialLinksSection />
    </Section>
  );
}
