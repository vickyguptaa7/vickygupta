"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/common/panel";

/**
 * GitHub-style contribution heatmap.
 * Generates a 52×7 grid of cells with random contribution intensities.
 */
export function GitHubHeatmapSection() {
  const weeks = useMemo(() => generateContributionData(), []);
  const totalContributions = useMemo(
    () => weeks.flat().reduce((sum, d) => sum + d.count, 0),
    [weeks],
  );

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
          {/* Heatmap grid */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-[3px] min-w-[700px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{
                        backgroundColor: getContributionColor(day.level),
                      }}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-text-muted">
              {totalContributions.toLocaleString()} contributions in{" "}
              {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{ backgroundColor: getContributionColor(level) }}
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

function getContributionColor(level: number): string {
  // Uses CSS variable colors — green scale
  const colors = [
    "var(--surface)", // 0 - empty
    "#0e4429", // 1
    "#006d32", // 2
    "#26a641", // 3
    "#39d353", // 4
  ];
  return colors[level] ?? colors[0];
}

interface DayData {
  date: string;
  count: number;
  level: number;
}

function generateContributionData(): DayData[][] {
  const weeks: DayData[][] = [];
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1);

  // Generate 52 weeks
  for (let w = 0; w < 52; w++) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);

      if (date > now) {
        week.push({ date: formatDate(date), count: 0, level: 0 });
      } else {
        // Seeded random based on date to be consistent
        const seed =
          date.getFullYear() * 10000 +
          (date.getMonth() + 1) * 100 +
          date.getDate();
        const rand = seededRandom(seed);
        const count =
          rand < 0.3
            ? 0
            : rand < 0.5
              ? Math.floor(rand * 3)
              : rand < 0.7
                ? Math.floor(rand * 6)
                : Math.floor(rand * 12);
        const level =
          count === 0
            ? 0
            : count <= 2
              ? 1
              : count <= 4
                ? 2
                : count <= 7
                  ? 3
                  : 4;
        week.push({ date: formatDate(date), count, level });
      }
    }
    weeks.push(week);
  }

  return weeks;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
