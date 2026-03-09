"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { staggerContainer, staggerItem } from "@/constants/animation-presets";

import { cn } from "@/lib/utils";

import { socialLinks } from "@/constants/social-links";

function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time || "--:--"}</span>;
}

export function SocialLinksSection() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch">
      {/* Social Links */}
      <div className="flex-1 min-w-0">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3  gap-2"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              className={cn(
                `flex items-center gap-3 px-4 py-3.5 text-sm hover:bg-surface active:scale-[0.99] border-r border-l border-edge screen-line-before group `,
                index % 3 == 0 && "border-l-0",
                index % 3 == 2 && "border-r-0",
              )}
            >
              <link.icon
                className={cn(
                  "h-6 w-6 border border-edge rounded-sm shrink-0 group-hover:border-black/40  transition-colors",
                  link.iconColor || "text-text-primary",
                )}
              />
              <span className="text-text-primary font-medium hero-name-underline relative">
                {link.name}
              </span>
              <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-80 group-hover:text-black group-hover:opacity-100 group-hover:rotate-45 duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
