"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { honorsData } from "@/constants/honors";

export function HonorsSection() {
  return (
    <Section
      id="honors"
      title="Honors & Awards"
      count={honorsData.length}
      contentClassName="p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {honorsData.map((honor) => (
          <motion.div
            key={honor.title}
            variants={staggerItem}
            className="screen-line-after"
          >
            <a
              href={honor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface"
            >
              {/* Icon / Logo */}
              <div className="border border-edge rounded-[7px] p-px group-hover:border-black/10 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge bg-surface text-text-muted overflow-hidden group-hover:border-black/10 transition-colors">
                  {honor.logo ? (
                    <Image
                      src={honor.logo}
                      alt={`${honor.issuer} logo`}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <honor.icon className="h-3.5 w-3.5" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary">
                  {honor.title}
                </h3>
                <p className="text-xs text-text-muted">
                  {honor.issuer} · {honor.date}
                </p>
                {honor.description && (
                  <ul className="mt-1 marker:text-gray-400">
                    <li className="text-xs text-text-secondary">
                      {honor.description}
                    </li>
                  </ul>
                )}
              </div>

              {/* Link */}
              {honor.url && (
                <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-black group-hover:opacity-100 group-hover:rotate-45 duration-300" />
              )}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
