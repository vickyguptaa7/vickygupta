"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/common/panel";
import { useGitHubContributions } from "@/hooks/queries/use-github-contributions";
import { GITHUB_USERNAME } from "@/services/api/github";
import { useThemeStore } from "@/store/theme/theme-store";
import {
  formatDisplayDate,
  generateContributionData,
  getContributionColor,
  groupContributionsIntoWeeks,
} from "@/utils/github";

interface DayData {
  date: string;
  count: number;
  level: number;
}

interface HoveredCell {
  day: DayData;
  x: number;
  y: number;
}

/**
 * GitHub-style contribution heatmap.
 * Fetches real data from public GitHub contributions API via React Query,
 * falls back to generated data on error.
 * Colors are theme-aware.
 */
export function GitHubHeatmapSection() {
  const [hovered, setHovered] = useState<HoveredCell | null>(null);
  const { theme } = useThemeStore();
  const { data } = useGitHubContributions();

  const apiWeeks = useMemo(() => {
    if (!data?.contributions?.length) return null;
    return groupContributionsIntoWeeks(data.contributions);
  }, [data]);

  const apiTotal = useMemo(() => {
    if (!data) return null;
    return (
      data.total?.lastYear ??
      data.contributions.reduce((sum, d) => sum + d.count, 0)
    );
  }, [data]);

  const fallbackWeeks = useMemo(() => generateContributionData(), []);
  const weeks = apiWeeks || fallbackWeeks;
  const totalContributions =
    apiTotal ?? weeks.flat().reduce((sum, d) => sum + d.count, 0);

  const getColor = useCallback(
    (level: number) => getContributionColor(level, theme),
    [theme],
  );

  const handleCellHover = useCallback(
    (day: DayData, e: React.MouseEvent<HTMLDivElement>) => {
      const cellRect = e.currentTarget.getBoundingClientRect();
      setHovered({
        day,
        x: cellRect.left + cellRect.width / 2,
        y: cellRect.top,
      });
    },
    [],
  );

  const handleCellLeave = useCallback(() => setHovered(null), []);

  return (
    <Panel id="github">
      <PanelHeader className="py-4">
        <PanelTitle>GitHub</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Heatmap grid — scrollable on mobile/tablet only */}
          <div className="max-md:overflow-x-auto pb-4">
            <div className="flex gap-[3px] min-w-[700px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <motion.div
                      key={di}
                      className="h-[11px] w-[11px] rounded-[2px] cursor-pointer"
                      style={{
                        backgroundColor: getColor(day.level),
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      onMouseEnter={(e) => handleCellHover(day, e)}
                      onMouseLeave={handleCellLeave}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Tooltip rendered via portal to escape all overflow containers */}
          {typeof document !== "undefined" &&
            createPortal(
              <AnimatePresence>
                {hovered && (
                  <div
                    className="pointer-events-none fixed z-[9999]"
                    style={{
                      left: hovered.x,
                      top: hovered.y,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <div className="mb-1.5 whitespace-nowrap rounded-md border border-edge bg-background px-2.5 py-1.5 text-xs shadow-lg">
                        <span className="font-medium text-text-primary">
                          {hovered.day.count}{" "}
                          {hovered.day.count === 1
                            ? "contribution"
                            : "contributions"}
                        </span>
                        <span className="text-text-muted"> on </span>
                        <span className="text-text-secondary">
                          {formatDisplayDate(hovered.day.date)}
                        </span>
                        {/* Caret */}
                        <div className="absolute left-1/2 -bottom-[5px] -translate-x-1/2">
                          <div className="h-[6px] w-[6px] rotate-45 border-b border-r border-edge bg-background" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>,
              document.body,
            )}

          {/* Legend */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-text-muted">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {totalContributions.toLocaleString()} contributions in{" "}
                {new Date().getFullYear()}
              </a>
            </p>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="h-[11px] w-[11px] rounded-[2px] transition-colors duration-200"
                  style={{ backgroundColor: getColor(level) }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </PanelContent>
    </Panel>
  );
}
