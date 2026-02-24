"use client";

import { motion } from "motion/react";
import { FiMail } from "react-icons/fi";

import { Section } from "@/components/common/section";

export function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-3"
      >
        <p className="text-sm text-text-secondary">
          Interested in working together? Feel free to reach out.
        </p>

        <a
          href="mailto:hello@vickygupta.dev"
          className="inline-flex items-center gap-2 rounded-md border border-edge px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface"
        >
          <FiMail className="h-4 w-4" />
          hello@vickygupta.dev
        </a>
      </motion.div>
    </Section>
  );
}
