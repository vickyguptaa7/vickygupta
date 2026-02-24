"use client";

import { motion } from "motion/react";
import { FiExternalLink } from "react-icons/fi";

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
            <div className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface">
              {/* Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-edge bg-surface text-text-muted">
                <cert.icon className="h-3.5 w-3.5" />
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
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
                  aria-label={`View ${cert.title} credential`}
                >
                  <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
