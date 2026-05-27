"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { heroData } from "@/constants/hero";

export function MagneticAvatar() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px);
      y.set(py);
    },
    [x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    // Stop audio on leave
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [x, y]);

  const handleHover = useCallback(() => {
    setIsHovered(true);
    // Play effect sound on hover
    const audio = new Audio("/effect.mp3");
    audioRef.current = audio;
    audio.play().catch(() => {
      // Silently fail if audio doesn't play (e.g., due to browser restrictions)
    });
  }, []);

  return (
    <div className="p-2 flex items-center justify-center sm:p-4">
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative cursor-pointer"
      >
        {/* Spinning gradient ring — only visible on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="hero-avatar-ring absolute -inset-1 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Avatar container */}
        <div className="relative h-24 w-24 rounded-full overflow-hidden border border-edge bg-surface border-dashed sm:h-36 sm:w-36">
          <Image
            src={heroData.avatarUrl}
            alt={heroData.name}
            fill
            className="object-cover rounded-full p-0.5"
            priority
          />
          {/* Inner glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isHovered
                ? "inset 0 0 20px rgba(255,255,255,0.1)"
                : "inset 0 0 0px rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
