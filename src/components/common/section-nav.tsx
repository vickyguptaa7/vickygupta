"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiMove } from "react-icons/fi";

import { cn } from "@/lib/utils";

import { sectionNavLinks } from "@/constants/navigation";

/**
 * Floating section navigation that appears when scrolling the portfolio page.
 * Draggable to any position on screen. On mobile it scrolls horizontally and
 * stays within viewport bounds.
 */
export function SectionNav() {
  const [activeSection, setActiveSection] = useState("");
  const [visible, setVisible] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Keep cursor style reactive to drag
  const cursor = useTransform([x, y], () => "grab");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    });

    for (const link of sectionNavLinks) {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
  };

  return (
    <>
      {/* Full-viewport drag constraints boundary */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 z-[49] pointer-events-none"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            style={{ x, y, cursor }}
            whileDrag={{ scale: 1.03, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 touch-none"
          >
            <nav
              className="flex items-center border border-edge bg-background/80 shadow-lg shadow-black/[0.08] backdrop-blur-xl max-w-[calc(100vw-2rem)]"
              aria-label="Section navigation"
            >
              {/* Drag handle */}
              <div
                className="flex shrink-0 items-center justify-center px-2 py-2 text-text-muted/50 cursor-grab active:cursor-grabbing"
                aria-hidden="true"
              >
                <FiMove size={12} />
              </div>

              {/* Scrollable link area on mobile */}
              <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar px-0.5 py-1">
                {sectionNavLinks.map((link) => {
                  const isActive = activeSection === link.href;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-all select-none",
                        isActive
                          ? "bg-surface text-text-primary"
                          : "text-text-muted hover:text-text-secondary hover:bg-surface/50",
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
