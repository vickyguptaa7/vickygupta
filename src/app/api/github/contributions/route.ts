import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "vickyguptaa7";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export async function GET() {
  // If no GitHub token, fall back to generated data
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ fallback: true });
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  contributionLevel
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json({ fallback: true });
    }

    const data = await response.json();
    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json({ fallback: true });
    }

    const weeks = calendar.weeks.map((week: ContributionWeek) =>
      week.contributionDays.map((day: ContributionDay) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelToNumber(day.contributionLevel),
      })),
    );

    return NextResponse.json({
      fallback: false,
      totalContributions: calendar.totalContributions,
      weeks,
    });
  } catch {
    return NextResponse.json({ fallback: true });
  }
}

function levelToNumber(level: string): number {
  switch (level) {
    case "NONE":
      return 0;
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}
