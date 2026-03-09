import { useQuery } from "@tanstack/react-query";

import { fetchGitHubContributions } from "@/services/api/github";

export const GITHUB_CONTRIBUTIONS_QUERY_KEY = ["github", "contributions"];

/**
 * React Query hook for fetching GitHub contribution data.
 * Caches for 1 hour and retries once on failure.
 */
export function useGitHubContributions() {
  return useQuery({
    queryKey: GITHUB_CONTRIBUTIONS_QUERY_KEY,
    queryFn: fetchGitHubContributions,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
}
