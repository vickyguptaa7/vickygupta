"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiAward,
  FiBriefcase,
  FiCode,
  FiFileText,
  FiGithub,
  FiGrid,
  FiLayers,
  FiMail,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { LuBookOpen, LuGraduationCap } from "react-icons/lu";
import { RiTrophyLine } from "react-icons/ri";

import { cn } from "@/lib/utils";

/* ─────────────────────── types ─────────────────────── */
interface CommandItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  group: string;
  keywords?: string[];
}

/* ─────────────────────── data ─────────────────────── */
const commandItems: CommandItem[] = [
  // Menu (pages)
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/",
    icon: <FiGrid size={16} />,
    group: "Menu",
    keywords: ["home", "main", "portfolio"],
  },
  {
    id: "blog-page",
    label: "Blog",
    href: "/blog",
    icon: <LuBookOpen size={16} />,
    group: "Menu",
    keywords: ["blog", "articles", "posts", "writing"],
  },

  // Portfolio sections
  {
    id: "about",
    label: "About",
    href: "/#about",
    icon: <FiUser size={16} />,
    group: "Portfolio",
    keywords: ["about", "intro", "bio", "me"],
  },
  {
    id: "coding-profiles",
    label: "Coding Profiles",
    href: "/#coding-profiles",
    icon: <FiCode size={16} />,
    group: "Portfolio",
    keywords: ["coding", "profiles", "leetcode", "competitive"],
  },
  {
    id: "github",
    label: "GitHub Heatmap",
    href: "/#github",
    icon: <FiGithub size={16} />,
    group: "Portfolio",
    keywords: ["github", "contributions", "heatmap", "git"],
  },
  {
    id: "stack",
    label: "Tech Stack",
    href: "/#stack",
    icon: <FiLayers size={16} />,
    group: "Portfolio",
    keywords: ["tech", "stack", "technologies", "skills", "tools"],
  },
  {
    id: "experience",
    label: "Experience",
    href: "/#experience",
    icon: <FiBriefcase size={16} />,
    group: "Portfolio",
    keywords: ["experience", "work", "job", "career"],
  },
  {
    id: "education",
    label: "Education",
    href: "/#education",
    icon: <LuGraduationCap size={16} />,
    group: "Portfolio",
    keywords: ["education", "school", "university", "degree"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    icon: <FiFileText size={16} />,
    group: "Portfolio",
    keywords: ["projects", "work", "apps", "applications"],
  },
  {
    id: "blog-section",
    label: "Blog",
    href: "/#blog",
    icon: <LuBookOpen size={16} />,
    group: "Portfolio",
    keywords: ["blog", "posts", "articles"],
  },
  {
    id: "honors",
    label: "Honors & Awards",
    href: "/#honors",
    icon: <RiTrophyLine size={16} />,
    group: "Portfolio",
    keywords: ["honors", "awards", "achievements"],
  },
  {
    id: "certifications",
    label: "Certifications",
    href: "/#certifications",
    icon: <FiAward size={16} />,
    group: "Portfolio",
    keywords: ["certifications", "certificates"],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    icon: <FiMail size={16} />,
    group: "Portfolio",
    keywords: ["contact", "email", "reach", "message"],
  },
];

/* ─────────────────────── component ─────────────────────── */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Filter items by search query
  const filtered = useMemo(() => {
    if (!query.trim()) return commandItems;
    const q = query.toLowerCase();
    return commandItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.includes(q)),
    );
  }, [query]);

  // Group filtered items
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    }
    return groups;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatList = useMemo(() => {
    const items: CommandItem[] = [];
    for (const group of Object.values(grouped)) {
      items.push(...group);
    }
    return items;
  }, [grouped]);

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  // Navigate to an item
  const navigateTo = useCallback(
    (item: CommandItem) => {
      closePalette();

      if (item.href.startsWith("/#")) {
        const sectionId = item.href.slice(2);
        if (pathname === "/") {
          // Same page — scroll to section
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // Navigate to home then scroll
          router.push(item.href);
        }
      } else {
        router.push(item.href);
      }
    },
    [closePalette, pathname, router],
  );

  // Toggle on ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePalette, open, openPalette]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${activeIndex}"]`,
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Keyboard navigation inside the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (flatList.length > 0) {
          setActiveIndex((prev) => (prev + 1) % flatList.length);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (flatList.length > 0) {
          setActiveIndex((prev) =>
            prev <= 0 ? flatList.length - 1 : prev - 1,
          );
        }
        break;
      case "Enter":
        e.preventDefault();
        if (flatList[activeIndex]) {
          navigateTo(flatList[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        closePalette();
        break;
    }
  };

  const modal =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-100 bg-black/30 backdrop-blur-[2px]"
              onClick={closePalette}
            />

            {/* Dialog */}
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed inset-0 z-101 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[90vw] max-w-lg overflow-hidden rounded-lg border border-edge border-dashed bg-background shadow-2xl pointer-events-auto">
                {/* Search input */}
                <div className="flex items-center gap-2.5 border-b border-edge border-dashed px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                  <FiSearch size={16} className="shrink-0 text-text-muted" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-xs text-text-primary outline-none placeholder:text-text-muted sm:text-sm"
                  />
                  <kbd className="hidden rounded border border-edge px-1.5 py-0.5 font-mono text-[9px] text-text-muted sm:inline-block sm:text-[10px]">
                    ESC
                  </kbd>
                </div>

                {/* Results list */}
                <div
                  ref={listRef}
                  className="max-h-[60vh] overflow-y-auto overscroll-contain p-2"
                >
                  {flatList.length === 0 ? (
                    <div className="px-3 py-8 text-center text-xs text-text-muted sm:text-sm">
                      No results found.
                    </div>
                  ) : (
                    Object.entries(grouped).map(([group, items]) => (
                      <div key={group} className="mb-1">
                        <div className="px-3 pb-1.5 pt-2 text-[11px] font-medium text-text-muted sm:text-xs">
                          {group}
                        </div>
                        {items.map((item) => {
                          const globalIndex = flatList.indexOf(item);
                          const isActive = globalIndex === activeIndex;
                          return (
                            <button
                              key={item.id}
                              data-index={globalIndex}
                              onClick={() => navigateTo(item)}
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors sm:gap-3 sm:px-3 sm:py-2 sm:text-sm",
                                isActive
                                  ? "bg-surface text-text-primary"
                                  : "text-text-secondary hover:bg-surface/50",
                              )}
                            >
                              <span
                                className={cn(
                                  "flex shrink-0 items-center justify-center transition-colors duration-300",
                                  isActive
                                    ? "text-text-primary"
                                    : "text-text-muted",
                                )}
                              >
                                {item.icon}
                              </span>
                              <span className="truncate font-mono text-[11px] sm:text-xs">
                                {item.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-edge px-3 py-1.5 sm:px-4 sm:py-2">
                  <span className="text-[11px] text-text-muted sm:text-xs">
                    Go to Page
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono text-[9px] text-text-muted sm:text-[10px]">
                        ↑
                      </kbd>
                      <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono text-[9px] text-text-muted sm:text-[10px]">
                        ↓
                      </kbd>
                      <span className="ml-0.5 text-[9px] text-text-muted sm:text-[10px]">
                        Navigate
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono text-[9px] text-text-muted sm:text-[10px]">
                        ↵
                      </kbd>
                      <span className="ml-0.5 text-[9px] text-text-muted sm:text-[10px]">
                        Open
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono text-[9px] text-text-muted sm:text-[10px]">
                        Esc
                      </kbd>
                      <span className="ml-0.5 text-[9px] text-text-muted sm:text-[10px]">
                        Close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openPalette}
        className="flex items-center justify-center gap-1.5 p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
        aria-label="Search (⌘K)"
      >
        <FiSearch size={14} />
        <kbd className="hidden rounded border border-edge px-1.5 py-0.5 font-mono text-[9px] text-text-muted sm:inline-block sm:text-[10px]">
          ⌘K
        </kbd>
      </button>

      {modal}
    </>
  );
}
