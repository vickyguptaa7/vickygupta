import type { GitHubContribution } from "@/types/api";

interface DayData {
  date: string;
  count: number;
  level: number;
}

/**
 * Groups a flat array of daily contributions into weekly arrays (7 days each)
 * to match the grid rendering format.
 */
export function groupContributionsIntoWeeks(
  contributions: GitHubContribution[],
): DayData[][] {
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  for (const day of contributions) {
    currentWeek.push({
      date: day.date,
      count: day.count,
      level: day.level,
    });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

/** Returns theme-aware color for a contribution level (0–4). */
export function getContributionColor(level: number, theme: string): string {
  const lightColors = [
    "var(--surface)", // 0 - empty
    "#9be9a8", // 1
    "#40c463", // 2
    "#30a14e", // 3
    "#216e39", // 4
  ];

  const darkColors = [
    "var(--surface)", // 0 - empty
    "#0e4429", // 1
    "#006d32", // 2
    "#26a641", // 3
    "#39d353", // 4
  ];

  const colors = theme === "dark" ? darkColors : lightColors;
  return colors[level] ?? colors[0];
}

/** Generates deterministic placeholder contribution data for 52 weeks. */
export function generateContributionData(): DayData[][] {
  const weeks: DayData[][] = [];
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1);

  for (let w = 0; w < 52; w++) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);

      if (date > now) {
        week.push({ date: formatDate(date), count: 0, level: 0 });
      } else {
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

/** Formats "2025-06-15" → "Jun 15, 2025" for the tooltip display. */
export function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[parseInt(month, 10) - 1] ?? month;
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
}
