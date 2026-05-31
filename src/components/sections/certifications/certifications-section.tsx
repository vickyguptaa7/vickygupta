"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { SpotlightCard } from "@/components/common/Spotlight";
import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { certificationsData } from "@/constants/honors";

export function CertificationsSection() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      count={certificationsData.length}
      contentClassName="p-0 sm:p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {certificationsData.map((cert, index) => (
          <motion.div key={cert.title} variants={staggerItem}>
            <SpotlightCard
              sides={[
                certificationsData?.length - 1 === index ? "none" : "bottom",
              ]}
            >
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 px-3 py-2.5 transition-colors sm:gap-3 sm:px-4 sm:py-3.5"
                aria-label={`View ${cert.title} credential`}
              >
                {/* Icon / Logo */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed border-edge bg-surface text-text-muted overflow-hidden group-hover:border-accent/20 transition-colors sm:h-8 sm:w-8 group-hover:-rotate-10 duration-300">
                  {cert.logo ? (
                    <Image
                      src={cert.logo}
                      alt={`${cert.issuer} logo`}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <cert.icon className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-text-primary sm:text-sm">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] text-text-muted sm:text-xs">
                    Issued by {cert.issuer} · {cert.date}
                  </p>
                </div>

                {/* Credential link */}
                {cert.credentialUrl && (
                  <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-accent group-hover:opacity-100 group-hover:rotate-45 duration-300" />
                )}
              </a>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
