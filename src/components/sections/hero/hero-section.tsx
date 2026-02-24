"use client";

import { motion } from "motion/react";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";

import { Panel } from "@/components/common/panel";
import { Separator } from "@/components/common/separator";

import { heroData } from "@/constants/hero";

export function HeroSection() {
  return (
    <>
      <Panel className="p-0">
        <div className="flex flex-col sm:flex-row items-stretch">
          {/* Avatar Area */}
          <div className="flex items-center justify-center p-6 sm:p-8 shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border border-edge bg-surface flex items-center justify-center text-4xl font-bold text-text-primary overflow-hidden relative shadow-sm"
            >
              {heroData.avatarInitials}
            </motion.div>
          </div>

          {/* Info Area */}
          <div className="flex flex-col flex-1 min-w-0 border-t sm:border-t-0 sm:border-l border-edge">
            <div className="flex flex-col justify-center flex-1 p-6 sm:p-8 border-b border-edge">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="font-mono text-sm text-text-muted opacity-50 mb-3 tracking-tight">
                  text-3xl text-zinc-950 font-medium
                </div>
                <h1 className="text-3xl font-medium tracking-tight text-text-primary flex items-center gap-2">
                  {heroData.name}
                  <MdVerified className="h-6 w-6 text-blue-500 rounded-full bg-white dark:bg-transparent" />
                  <button
                    className="p-1 rounded-full hover:bg-surface transition-colors focus:outline-none"
                    aria-label="Pronounce name"
                  >
                    <HiSpeakerWave className="h-5 w-5 text-text-muted" />
                  </button>
                </h1>
              </motion.div>
            </div>

            <div className="p-6 sm:p-8 flex items-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-lg text-text-secondary"
              >
                {heroData.role}
              </motion.p>
            </div>
          </div>
        </div>
      </Panel>
      <Separator />
    </>
  );
}
