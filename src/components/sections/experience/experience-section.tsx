"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FiChevronDown, FiCode } from "react-icons/fi";

import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { experiences } from "@/constants/experience";
import { cn } from "@/lib/utils";
import { LuCodeXml } from "react-icons/lu";

export function ExperienceSection() {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  return (
    <Section
      id="experience"
      title="Experience"
      count={experiences.length}
      contentClassName="p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {experiences.map((company) => {
          const isExpanded = expandedCompany === company.company;
          const primaryRole = company.roles[0];

          return (
            <motion.div
              key={company.company}
              variants={staggerItem}
              className="screen-line-after group flex w-full flex-col gap-1 p-4 "
            >
              {/* Row 1: Company logo + name + active dot + expand toggle */}
              <div className="flex w-full items-center gap-1">
                {/* Company logo */}
                <div className="flex h-6 w-6 items-center justify-center rounded-full  overflow-hidden">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={`${company.company} logo`}
                      width={20}
                      height={20}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xs font-bold text-text-primary">
                      {company.company.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Company name + active dot */}
                <div className="flex items-center gap-2 flex-1 min-w-0 ">
                  <p
                    className={cn(
                      "text-sm font-semibold text-text-primary hero-name-underline relative w-fit ms-2",
                    )}
                  >
                    {company.company}
                  </p>
                  {company.isActive && (
                    <span className="experience-active-dot relative flex h-2 w-2 shrink-0">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Role info — always visible for primary role */}
              {primaryRole && (
                <div className="flex items-start gap-1 w-full">
                  {/* Code icon */}
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-edge bg-surface text-text-muted mt-2 group-hover:border-black/10 transition-colors">
                    <LuCodeXml className="h-5 w-5 rounded-sm p-0.5 border border-edge group-hover:border-black/10 transition-colors" />
                  </div>
                  {/* Clickable company card */}
                  <button
                    onClick={() =>
                      setExpandedCompany(isExpanded ? null : company.company)
                    }
                    aria-expanded={isExpanded}
                    className={`text-left flex hover:bg-surface p-2 justify-between w-full items-center cursor-pointer group/btn transition-colors duration-200 rounded-sm`}
                  >
                    <div className="flex-1 min-w-0 hover:bg-surface">
                      <p className="text-sm font-medium text-text-primary">
                        {primaryRole.title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {primaryRole.type}
                        <span className="mx-1.5 text-text-muted">|</span>
                        {primaryRole.period}
                      </p>
                    </div>
                    {/* Expand / collapse icon */}
                    <FiChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-text-muted duration-300 transition-transform group-hover/btn:text-black",
                        isExpanded ? "rotate-180" : "",
                      )}
                    />
                  </button>
                </div>
              )}

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
                    <div className="space-y-4 pl-11">
                      {company.roles.map((role, roleIdx) => (
                        <div key={roleIdx} className="space-y-2">
                          {/* Show role header for additional roles (not primary) */}
                          {roleIdx > 0 && (
                            <div className="flex items-start gap-3 -ml-11 pt-2">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge bg-surface text-text-muted">
                                <FiCode className="h-3.5 w-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-primary">
                                  {role.title}
                                </p>
                                <p className="text-xs text-text-muted">
                                  {role.type}
                                  <span className="mx-1.5 text-edge">|</span>
                                  {role.period}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Highlights */}
                          {role.highlights && role.highlights.length > 0 && (
                            <ul className="list-disc pl-4 space-y-1 marker:text-text-muted">
                              {role.highlights.map((highlight, i) => (
                                <li
                                  key={i}
                                  className="text-xs leading-relaxed text-text-secondary font-mono"
                                >
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Row 3: Tech badges — always visible for primary role */}
              {primaryRole?.technologies && (
                <div
                  className={cn(
                    "flex flex-wrap gap-2 pl-9 mt-1",
                    isExpanded && "mt-2",
                  )}
                >
                  {primaryRole.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
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
