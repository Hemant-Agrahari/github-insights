import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetch a single GitHub issue.
 * @param {string} owner (string, required): Repository owner name.
 * @param {string} repo (string, required): Repository name.
 * @param {string} number (string, required): Issue number.
 * @returns {Object} - React Query result containing issue data, loading state, and error state.
 *
 * Caching Strategy:
 * - staleTime: 60 seconds (prevents frequent refetch)
 * - gcTime: 5 minutes (keeps data in cache for quick navigation)
 * - refetchOnWindowFocus: false (avoids unnecessary API calls)
 */
export const useIssue = (
  owner: string,
  repo: string,
  number: string
) => {
  return useQuery({
    queryKey: ["issue", owner, repo, number],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues/${number}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );
      return res.data;
    },
    staleTime: 60000,
    gcTime: 300000,
    refetchOnWindowFocus: false,
  });
};
