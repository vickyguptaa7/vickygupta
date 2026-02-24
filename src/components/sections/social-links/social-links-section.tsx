"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { Panel } from "@/components/common/panel";
import { staggerContainer, staggerItem } from "@/constants/animation-presets";

import { cn } from "@/lib/utils";

import { overviewItems } from "@/constants/overview";
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
    <Panel className="p-0">
      {/* Overview Info List */}
      <div className="flex flex-col sm:flex-row items-stretch screen-line-after">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-2 p-6 sm:p-8"
          >
            {overviewItems.map((item, index) => {
              const content = (
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-surface border border-edge shrink-0">
                    <item.icon className="h-3.5 w-3.5 text-text-muted" />
                  </div>
                  <span className="font-medium text-text-primary truncate">
                    {item.isLiveTime ? <LiveTime /> : item.value}
                  </span>
                </div>
              );

              const baseClasses = `transition-colors hover:opacity-80 rounded-md py-1 col-span-1`;

              if (item.href) {
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={
                      item.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className={`block ${baseClasses}`}
                  >
                    {content}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className={baseClasses}
                >
                  {content}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Social Links */}
        <div className="flex-1 min-w-0">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3"
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
                  `flex items-center gap-3 px-4 py-3.5 text-sm hover:bg-surface active:scale-[0.99] screen-line-after`,
                  index % 2 === 0 && "border-r sm:border-r-0 border-edge",
                  index % 3 !== 2 && "sm:border-r sm:border-edge",
                )}
              >
                <link.icon className="h-4 w-4 shrink-0 text-text-primary" />
                <span className="text-text-secondary">{link.name}</span>
                <FiArrowUpRight className="ml-auto h-3.5 w-3.5 text-text-muted opacity-50" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </Panel>
  );
}
