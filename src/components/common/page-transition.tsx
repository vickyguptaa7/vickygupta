"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

/* ─────────────────────── timing ─────────────────────── */
const EXIT_DURATION = 0.35; // seconds — fade out current page
const EXIT_MS = EXIT_DURATION * 1000 + 30;

/* ─────────────────────── context ─────────────────────── */
interface PageTransitionCtx {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionCtx = createContext<PageTransitionCtx>({
  navigate: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionCtx);

/* ─────────────────────── provider ─────────────────────── */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const lockRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (lockRef.current) return;

      const base = href.split("#")[0] || "/";
      if (base === pathname) return;

      if (prefersReduced) {
        router.push(href);
        return;
      }

      lockRef.current = true;
      setIsExiting(true);

      setTimeout(() => {
        router.push(href);
        window.scrollTo({ top: 0 });
        setIsExiting(false);
        lockRef.current = false;
      }, EXIT_MS);
    },
    [pathname, router, prefersReduced],
  );

  return (
    <TransitionCtx.Provider value={{ navigate, isTransitioning: isExiting }}>
      {children}

      {/* overlay: soft full-screen fade + progress bar */}
      <AnimatePresence>
        {isExiting && (
          <>
            {/* dim overlay */}
            <motion.div
              className="fixed inset-0 z-9998 bg-background/60 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: EXIT_DURATION * 0.6 }}
              aria-hidden="true"
            />
            {/* progress bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-9999 h-[3px] origin-left bg-foreground"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                scaleX: { duration: EXIT_DURATION, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.15 },
              }}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}

/* ─────────────────────── page content wrapper ─────────────────────── */
export function PageContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── transition-aware link ─────────────────────── */
interface TransitionLinkProps extends Omit<
  React.ComponentProps<typeof Link>,
  "onClick"
> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Drop-in replacement for next/link that triggers the page
 * transition overlay before navigating.
 */
export function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { navigate, isTransitioning } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const url = typeof href === "string" ? href : (href.pathname ?? "/");

    // Let hash-only, external, and same-page links pass through normally
    if (url.startsWith("#") || url.startsWith("http")) return;

    const base = url.split("#")[0] || "/";
    if (base === pathname) return;

    e.preventDefault();
    if (!isTransitioning) navigate(url);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
