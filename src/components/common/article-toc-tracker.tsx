"use client";

import { motion, useDragControls, useMotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiList, FiMove } from "react-icons/fi";

import type { TocHeading } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface ArticleTocTrackerProps {
  headings: TocHeading[];
}

export function ArticleTocTracker({ headings }: ArticleTocTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const constraintsRef = useRef<HTMLDivElement>(null);

  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!headings.length) {
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) {
      return;
    }

    const syncActiveHeading = () => {
      const probeY = window.scrollY + 180;
      let nextActiveId = elements[0].id;

      for (const element of elements) {
        if (element.offsetTop <= probeY) {
          nextActiveId = element.id;
          continue;
        }
        break;
      }

      setActiveId(nextActiveId);
    };

    syncActiveHeading();
    window.addEventListener("scroll", syncActiveHeading, { passive: true });
    window.addEventListener("resize", syncActiveHeading);

    return () => {
      window.removeEventListener("scroll", syncActiveHeading);
      window.removeEventListener("resize", syncActiveHeading);
    };
  }, [headings]);

  const activeHeadingLabel = useMemo(() => {
    return (
      headings.find((heading) => heading.id === activeId)?.text ??
      "On this page"
    );
  }, [activeId, headings]);

  if (!headings.length) {
    return null;
  }

  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={constraintsRef}
        className="fixed inset-0 z-49 pointer-events-none"
      />

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={constraintsRef}
        style={{ x, y }}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-[min(92vw,38rem)] -translate-x-1/2"
      >
        <div className="border border-edge bg-background/95 shadow-lg shadow-black/8 backdrop-blur-md">
          <div className="flex items-center border-b border-edge/80">
            <button
              type="button"
              onPointerDown={(e) => dragControls.start(e)}
              className="inline-flex items-center justify-center px-2.5 py-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary cursor-grab active:cursor-grabbing"
              aria-label="Drag table of contents"
            >
              <FiMove className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface"
              aria-expanded={isOpen}
              aria-controls="article-toc-list"
              aria-label="Toggle table of contents"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FiList className="h-4 w-4 shrink-0 text-text-muted" />
                <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-text-muted sm:text-[10px]">
                  Table of contents
                </span>
                <span className="truncate text-xs text-text-primary sm:text-sm">
                  {activeHeadingLabel}
                </span>
              </span>
              <FiChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-text-muted transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
          </div>

          {isOpen && (
            <nav
              id="article-toc-list"
              className="max-h-60 overflow-y-auto"
              aria-label="Table of contents"
            >
              <ul className="p-2">
                {headings.map((heading) => {
                  const isActive = heading.id === activeId;

                  return (
                    <li key={heading.id}>
                      <button
                        type="button"
                        onClick={() => handleNavigate(heading.id)}
                        className={cn(
                          "block w-full px-2 py-1.5 text-left text-xs transition-colors sm:text-sm",
                          heading.level === 3 && "pl-5",
                          isActive
                            ? "bg-surface font-medium text-text-primary"
                            : "text-text-secondary hover:bg-surface hover:text-text-primary",
                        )}
                        aria-current={isActive ? "location" : undefined}
                      >
                        {heading.text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </motion.div>
    </>
  );
}
