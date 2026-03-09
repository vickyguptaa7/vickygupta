import type { GitHubContributionsResponse } from "@/types/api";

import axios from "axios";

const GITHUB_CONTRIBUTIONS_API =
  "https://github-contributions-api.jogruber.de/v4";

const GITHUB_USERNAME = "vickyguptaa7";

/**
 * Dedicated axios instance for the public GitHub contributions API.
 * Separate from the main app axios instance since this hits an external domain.
 */
const githubApi = axios.create({
  baseURL: GITHUB_CONTRIBUTIONS_API,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Fetches the last year of GitHub contribution data for the configured user.
 */
export async function fetchGitHubContributions(): Promise<GitHubContributionsResponse> {
  const { data } = await githubApi.get<GitHubContributionsResponse>(
    `/${GITHUB_USERNAME}`,
    { params: { y: "last" } },
  );
  return data;
}

export { GITHUB_USERNAME };
