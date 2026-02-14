import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Issue = {
  id: number;
  number: number;
  title: string;
  state: string;
  comments: number;
};

/**
 * Close a GitHub issue with optimistic update.
 * @param {string} owner (string, required): Repository owner name.
 * @param {string} repo (string, required): Repository name.
 * @param {string} number (string, required): Issue number.
 * @returns {Object} - React Query mutation for closing an issue.
 *
 * Behavior:
 * - Optimistically updates issue state to "closed"
 * - Rolls back to previous state if API request fails
 * - Cancels ongoing queries to prevent race conditions
 * - Refetches issue after mutation to ensure data consistency
 */
export const useCloseIssue = (
  owner: string,
  repo: string,
  number: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${number}`,
        { state: "closed" },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );
      return res.data;
    },

    // Optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["issue", owner, repo, number],
      });

      const previous = queryClient.getQueryData<Issue>([
        "issue",
        owner,
        repo,
        number,
      ]);

      queryClient.setQueryData<Issue>(
        ["issue", owner, repo, number],
        (old) => {
          if (!old) return old;
          return { ...old, state: "closed" };
        }
      );

      return { previous };
    },

    // Rollback on failure
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["issue", owner, repo, number],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["issue", owner, repo, number],
      });
    },
  });
};
