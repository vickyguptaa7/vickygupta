"use client";

import { useEffect } from "react";

export function useGlobalSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Find every card on the entire page
      const cards = document.querySelectorAll(".spotlight-card");

      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const rect = htmlCard.getBoundingClientRect();

        // Calculate the mouse position relative to each specific card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        htmlCard.style.setProperty("--mouse-x", `${x}px`);
        htmlCard.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    // Attach to the window to track everywhere
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup to prevent memory leaks
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}
