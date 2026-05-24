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
          href={`mailto:${heroData.email}?subject=Hello%20Vicky!&body=Hi%20Vicky,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0D%0A%0D%0A[Write%20your%20message%20here]%0D%0A%0D%0ALooking%20forward%20to%20hearing%20from%20you!`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark group"
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
