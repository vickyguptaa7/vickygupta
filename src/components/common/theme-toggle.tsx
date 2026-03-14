"use client";

import { FiMoon, FiSun } from "react-icons/fi";

import { useThemeStore } from "@/store/theme/theme-store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const handleClick = () => {
    toggleTheme();
    // Play click sound
    const audio = new Audio("/click.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {
      // Silently fail if audio doesn't play (e.g., due to browser restrictions)
    });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary active:scale-[0.98]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
