"use client";

import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme/theme-store";
import React from "react";

export type Side = "top" | "right" | "bottom" | "left" | "none";

interface SpotlightCardProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  sides?: Side[];
  dashLength?: number;
  dashGap?: number;
  borderRadius?: number;
  // NEW: Theme and color props
  baseColor?: string;
  highlightColor?: string;
}

export const SpotlightCard = ({
  children,
  containerClassName = "",
  className = "",
  sides = ["top", "right", "bottom", "left"],
  dashLength = 6,
  dashGap = 4,
  borderRadius = 0,
  // Default values keep the original white/dark-mode look
  baseColor = "text-gray-200 dark:text-gray-700",
  highlightColor = "text-gray-600 dark:text-white",
}: SpotlightCardProps) => {
  const isLightMode = useThemeStore((state) => state.theme) === "light";
  const dashArray = `${dashLength} ${dashGap}`;

  const renderDashes = () => {
    if (sides.length === 4) {
      return (
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={borderRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={dashArray}
        />
      );
    }
    return (
      <>
        {sides.includes("top") && (
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={dashArray}
          />
        )}
        {sides.includes("right") && (
          <line
            x1="calc(100% - 1px)"
            y1="0"
            x2="calc(100% - 1px)"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={dashArray}
          />
        )}
        {sides.includes("bottom") && (
          <line
            x1="0"
            y1="calc(100% - 1px)"
            x2="100%"
            y2="calc(100% - 1px)"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={dashArray}
          />
        )}
        {sides.includes("left") && (
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={dashArray}
          />
        )}
      </>
    );
  };

  return (
    <div
      className={cn(
        `spotlight-card relative overflow-hidden`,
        containerClassName,
      )}
    >
      {/* Notice we also make the background color theme-aware (bg-white dark:bg-neutral-900) */}

      {/* LAYER 1: Base subtle border */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* We inject the baseColor prop here */}
        <svg
          className={cn(
            `h-full w-full transition-colors duration-300`,
            isLightMode && "text-gray-200 ",
            !isLightMode && "text-gray-700",
          )}
          width="100%"
          height="100%"
        >
          {renderDashes()}
        </svg>
      </div>

      {/* LAYER 2: Glowing highlight border */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-100"
        style={{
          WebkitMaskImage:
            "radial-gradient(250px circle at var(--mouse-x, 0) var(--mouse-y, 0), black, transparent 40%)",
          maskImage:
            "radial-gradient(250px circle at var(--mouse-x, 0) var(--mouse-y, 0), black, transparent 40%)",
        }}
      >
        {/* We inject the highlightColor prop here, adding transition-colors for smooth hover effects */}
        <svg
          className={cn(
            `h-full w-full transition-colors duration-300`,
            isLightMode && "text-gray-600",
            !isLightMode && "text-white",
          )}
          width="100%"
          height="100%"
        >
          {renderDashes()}
        </svg>
      </div>

      {/* LAYER 3: Content */}
      <div className={cn("relative z-20 h-full w-full flex ", className)}>
        {children}
      </div>
    </div>
  );
};
