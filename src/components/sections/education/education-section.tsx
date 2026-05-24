"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { educationData } from "@/constants/education";
import { cn } from "@/lib/utils";

export function EducationSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Section
      id="education"
      title="Education"
      count={educationData.length}
      contentClassName="p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {educationData.map((edu) => {
          const isExpanded = expandedId === edu.id;

          return (
            <motion.div
              key={edu.id}
              variants={staggerItem}
              className="screen-line-after group flex w-full flex-col gap-1 p-4"
            >
              {/* Row 1: Institution logo + name + active dot */}
              <div className="flex w-full items-center gap-1">
                {/* Institution logo */}
                <div className="flex h-6 w-6 items-center justify-center rounded-full overflow-hidden">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      width={20}
                      height={20}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xs font-bold text-text-primary">
                      {edu.institution.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Institution name + active dot */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-semibold text-text-primary hero-name-underline relative w-fit ms-2",
                    )}
                  >
                    {edu.institution}
                  </p>
                  {edu.isActive && (
                    <span className="experience-active-dot relative flex h-2 w-2 shrink-0">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Degree info — always visible */}
              <div className="flex items-start gap-1 w-full">
                {/* Graduation icon */}
                <LuGraduationCap className="mx-0.5 mt-2.5 h-5 w-5 rounded-sm p-0.5 border border-dashed text-text-muted border-edge group-hover:border-accent/20 transition-colors" />
                {/* Clickable degree card */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                  aria-expanded={isExpanded}
                  className="text-left flex hover:bg-surface p-2 justify-between w-full items-center cursor-pointer group/btn transition-colors duration-200 rounded-sm"
                >
                  <div className="flex-1 min-w-0 hover:bg-surface">
                    <p className="text-sm font-medium text-text-primary">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-text-muted">
                      {edu.period}
                      {edu.grade && (
                        <>
                          <span className="mx-1.5 text-text-muted">|</span>
                          {edu.grade}
                        </>
                      )}
                    </p>
                  </div>
                  {/* Expand / collapse icon */}
                  <FiChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-text-muted duration-300 transition-transform group-hover/btn:text-accent",
                      isExpanded ? "rotate-180" : "",
                    )}
                  />
                </button>
              </div>

              {/* Expanded highlights — animated */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden w-full"
                  >
                    <div className="space-y-2 pl-11">
                      {/* Description */}
                      {edu.description && (
                        <p className="text-xs leading-relaxed text-text-secondary font-mono">
                          {edu.description}
                        </p>
                      )}

                      {/* Highlights */}
                      {edu.highlights && edu.highlights.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 marker:text-text-muted">
                          {edu.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-xs leading-relaxed text-text-secondary font-mono"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Achievements */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 marker:text-text-muted">
                          {edu.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-xs leading-relaxed text-text-secondary font-mono"
                            >
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Row 3: Coursework badges — always visible */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div
                  className={cn(
                    "flex flex-wrap gap-2 pl-9 mt-1",
                    isExpanded && "mt-2",
                  )}
                >
                  {edu.coursework.map((course) => (
                    <TechBadge key={course} name={course} />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
