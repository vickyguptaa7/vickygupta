"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { educationData } from "@/constants/education";

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
              className="screen-line-after"
            >
              {/* Institution header - clickable */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface"
              >
                {/* Circle avatar with initial */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge bg-surface text-xs font-bold text-text-primary">
                  {edu.institution.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-text-muted">{edu.period}</p>
                </div>

                {/* Active indicator */}
                {edu.isActive && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                )}

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
                    <div className="border-t border-edge px-4 py-3 space-y-2">
                      {/* Degree */}
                      <p className="text-sm font-medium text-text-primary">
                        {edu.degree}
                      </p>

                      {/* Grade */}
                      {edu.grade && (
                        <p className="text-xs text-text-muted">
                          Grade: {edu.grade}
                        </p>
                      )}

                      {/* Highlights */}
                      {edu.highlights && (
                        <ul className="space-y-1">
                          {edu.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-xs leading-relaxed text-text-secondary"
                            >
                              — {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
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
