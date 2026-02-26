"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { Section } from "@/components/common/section";
import { TechBadge } from "@/components/common/tech-badge";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { experiences } from "@/constants/experience";

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

          return (
            <motion.div
              key={company.company}
              variants={staggerItem}
              className="screen-line-after"
            >
              {/* Company header - clickable */}
              <button
                onClick={() =>
                  setExpandedCompany(isExpanded ? null : company.company)
                }
                aria-expanded={isExpanded}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-surface ${
                  isExpanded
                    ? "border-l-2 border-l-accent"
                    : "border-l-2 border-l-transparent"
                }`}
              >
                {/* Company dot indicator */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge bg-surface text-xs font-bold text-text-primary">
                  {company.company.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    {company.company}
                  </p>
                  <p className="text-xs text-text-muted">
                    {company.roles[0]?.period}
                  </p>
                </div>

                {/* Expand indicator */}
                <FiChevronDown
                  className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-edge px-4 py-3 space-y-4">
                      {company.roles.map((role, roleIdx) => (
                        <div key={roleIdx} className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {role.title}
                            </p>
                            <p className="text-xs text-text-muted">
                              {role.period}
                            </p>
                          </div>

                          {/* Highlights */}
                          {role.highlights && (
                            <ul className="list-disc pl-4 space-y-1 marker:text-gray-400">
                              {role.highlights.map((highlight, i) => (
                                <li
                                  key={i}
                                  className="text-xs leading-relaxed text-text-secondary"
                                >
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Tech chips */}
                          {role.technologies && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {role.technologies.map((tech) => (
                                <TechBadge key={tech} name={tech} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
