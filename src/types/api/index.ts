/**
 * API request/response types.
 * Group by domain: src/types/api/{domain}.ts
 */

// ── GitHub Contributions ────────────────────────────────────────────

export interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

export interface GitHubContributionsResponse {
  total: Record<string, number>;
  contributions: GitHubContribution[];
}
