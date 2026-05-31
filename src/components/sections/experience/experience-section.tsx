"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { SpotlightCard } from "@/components/common/Spotlight";
import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { experiences } from "@/constants/experience";
import { cn } from "@/lib/utils";
import { LuCodeXml } from "react-icons/lu";

export function ExperienceSection() {
  const [expandedCompanyRole, setExpandedCompanyRole] = useState<string | null>(
    null,
  );

  return (
    <Section
      id="experience"
      title="Experience"
      count={experiences.length}
      contentClassName="p-0 sm:p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full"
      >
        {experiences.map((company, index) => {
          const roles = company.roles;

          return (
            <motion.div key={company.company} variants={staggerItem}>
              <SpotlightCard
                className="group flex w-full flex-col gap-1 p-3 sm:p-4"
                sides={[experiences?.length - 1 === index ? "none" : "bottom"]}
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
                      <span className="text-[11px] font-bold text-text-primary sm:text-xs">
                        {company.company.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Company name + active dot */}
                  <div className="flex items-center gap-2 flex-1 min-w-0 ">
                    <p
                      className={cn(
                        "text-xs font-semibold text-text-primary hero-name-underline relative w-fit ms-2 sm:text-sm",
                      )}
                    >
                      {company.company}
                    </p>
                    {company.isActive && (
                      <motion.span className="relative inline-block h-2.5 w-2.5 shrink-0">
                        {/* Pulsing ring waves */}
                        <motion.span
                          className="absolute inset-0 rounded-full border border-green-500"
                          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 0.3,
                          }}
                        />
                        {/* Center dot */}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                      </motion.span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 overflow-hidden">
                  {roles?.map((role, roleIndx) => {
                    const isExpanded = expandedCompanyRole === role.title;
                    return (
                      <div
                        key={role.title}
                        className="flex flex-col gap-1  relative"
                      >
                        {/* Row 2: Role info — always visible for primary role */}
                        {role && (
                          <div className="flex items-start gap-1 w-full">
                            {/* Code icon */}
                            <div className="relative">
                              <div className="relative h-5 w-5 mx-0.5 mt-2.5  p-0.5 text-text-muted border border-edge group-hover:border-accent/40 border-dashed transition-colors flex justify-center items-center group-hover:-rotate-10 z-1 ">
                                <LuCodeXml className="h-4 p-0.5 w-4 z-10 relative bg-white group-hover:text-accent/40 duration-300 transition-colors" />
                              </div>
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-screen border-l-[1px] border-dashed border-edge group-hover:border-accent/40 duration-300 transition-colors"></div>
                            </div>
                            {roleIndx == roles.length - 1 && (
                              <div className="absolute bottom-0 left-3 w-2 border-dashed border-t-[1px] border-edge group-hover:border-accent/40 duration-300 transition-colors"></div>
                            )}
                            {/* Clickable company card */}
                            <button
                              onClick={() =>
                                setExpandedCompanyRole(
                                  isExpanded ? null : role.title,
                                )
                              }
                              aria-expanded={isExpanded}
                              className={`text-left flex hover:bg-surface p-1.5 justify-between w-full items-center cursor-pointer group/btn transition-colors duration-200 rounded-sm sm:p-2`}
                            >
                              <div className="flex-1 min-w-0 hover:bg-surface">
                                <p className="text-xs font-medium text-text-primary sm:text-sm">
                                  {role.title}
                                </p>
                                <p className="text-[11px] text-text-muted sm:text-xs">
                                  {role.type}
                                  <span className="mx-1.5 text-text-muted">
                                    |
                                  </span>
                                  {role.period}
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
                              <div className="space-y-3 pl-9 sm:space-y-4 sm:pl-11">
                                {role.highlights &&
                                  role.highlights.length > 0 && (
                                    <ul className="list-disc pl-4 space-y-1 marker:text-text-muted">
                                      {role.highlights.map((highlight, i) => (
                                        <li
                                          key={i}
                                          className="text-[11px] leading-relaxed text-text-secondary font-mono sm:text-xs"
                                        >
                                          {highlight}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Row 3: Tech badges — always visible for primary role */}
                        {role?.technologies && (
                          <div
                            className={cn(
                              "flex flex-wrap gap-1.5 pl-8 mt-1 sm:gap-2 sm:pl-9",
                              isExpanded && "mt-2",
                            )}
                          >
                            {role.technologies.map((tech) => (
                              <TechBadge key={tech} name={tech} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
