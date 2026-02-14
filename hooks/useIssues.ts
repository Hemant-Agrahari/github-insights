import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetch GitHub repository issues.
 * @param {string} owner Repository owner
 * @param {string} repo Repository name
 * @param {number} page Page number
 * @param {string} state Issue state (open/closed)
 * @param {string} sort Sort field (created/comments)
 * @param {string} assignee Assignee filter
 */
export const useIssues = (
  owner: string,
  repo: string,
  page: number,
  state: string,
  sort: string = "created",
  assignee: string = ""
) => {
  return useQuery<any[]>({
    queryKey: ["issues", owner, repo, page, state, sort, assignee],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
          params: {
            page,
            per_page: 10,
            state,
            sort,
            assignee: assignee || undefined,
          },
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
    placeholderData: (previousData) => previousData,
  });
};
