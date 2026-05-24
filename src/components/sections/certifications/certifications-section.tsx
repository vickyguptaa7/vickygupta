"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";
import { certificationsData } from "@/constants/honors";

export function CertificationsSection() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      count={certificationsData.length}
      contentClassName="p-0"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {certificationsData.map((cert) => (
          <motion.div
            key={cert.title}
            variants={staggerItem}
            className="screen-line-after"
          >
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface"
              aria-label={`View ${cert.title} credential`}
            >
              {/* Icon / Logo */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-dashed border-edge bg-surface text-text-muted overflow-hidden group-hover:border-accent/20 transition-colors">
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
                <h3 className="text-sm font-medium text-text-primary">
                  {cert.title}
                </h3>
                <p className="text-xs text-text-muted">
                  Issued by {cert.issuer} · {cert.date}
                </p>
              </div>

              {/* Credential link */}
              {cert.credentialUrl && (
                <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-accent group-hover:opacity-100 group-hover:rotate-45 duration-300" />
              )}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
