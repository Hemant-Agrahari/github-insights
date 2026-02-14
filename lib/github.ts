import { Repository, Contributor } from "@/types/github";
import { githubFetch } from "@/lib/github-client";

/**
 * Fetch repository details from GitHub.
 */
export async function getRepo(
  owner: string,
  repo: string,
): Promise<Repository> {
  try {
    return await githubFetch<Repository>(`/repos/${owner}/${repo}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("rate limit")) {
      throw error;
    }
    throw new Error("Repository not found");
  }
}

/**
 * Fetch top contributors of a repository.
 */
export async function getContributors(
  owner: string,
  repo: string,
): Promise<Contributor[]> {
  try {
    return await githubFetch<Contributor[]>(
      `/repos/${owner}/${repo}/contributors?per_page=5`,
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("rate limit")) {
      throw error;
    }
    throw new Error("Failed to fetch contributors");
  }
}
