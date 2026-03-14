"use client";

import { motion } from "motion/react";
import { FiMail } from "react-icons/fi";

import { Section } from "@/components/common/section";

import { heroData } from "@/constants/hero";
import { BsArrowRightShort } from "react-icons/bs";

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
        <p className="text-sm text-text-secondary leading-relaxed w-full">
          Got a project in mind, a problem worth solving, or something you think
          I&apos;d find interesting? I&apos;m always curious to hear what people
          are building. No formal pitch needed, just say hi.
        </p>

        <a
          href={`mailto:${heroData.email}`}
          className="group inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-accent/90 active:scale-[0.98] shadow-sm"
        >
          <FiMail className="h-4 w-4 transition-transform group-hover:-rotate-12 me-2" />
          Say hi
          <BsArrowRightShort
            className="ms-1 transition-transform duration-200 group-hover:translate-x-1"
            size={20}
          />
        </a>
      </motion.div>
    </Section>
  );
}
