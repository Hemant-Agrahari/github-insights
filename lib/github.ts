const BASE = "https://api.github.com";

/**
 * Get request headers for GitHub API.
 */
function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
}

/**
 * Fetch repository details from GitHub.
 * @param {string} owner (string, required): Repository owner name.
 * @param {string} repo (string, required): Repository name.
 * @returns {Promise<Object>} Repository details.
 *
 * Caching:
 * - Revalidated every 60 seconds using Next.js ISR.
 *
 * Error Handling:
 * - Throws error if repository is not found.
 * - Throws specific error if rate limit is exceeded.
 */
export async function getRepo(owner: string, repo: string) {
  const res = await fetch(`${BASE}/repos/${owner}/${repo}`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (res.status === 403) {
    throw new Error("GitHub rate limit exceeded");
  }

  if (!res.ok) {
    throw new Error("Repository not found");
  }

  return res.json();
}

/**
 * Fetch top contributors of a repository.
 * @param {string} owner (string, required): Repository owner name.
 * @param {string} repo (string, required): Repository name.
 * @returns {Promise<Array>} List of top 5 contributors.
 *
 * Caching:
 * - Revalidated every 60 seconds.
 */
export async function getContributors(owner: string, repo: string) {
  const res = await fetch(
    `${BASE}/repos/${owner}/${repo}/contributors?per_page=5`,
    {
      headers: getHeaders(),
      next: { revalidate: 60 },
    }
  );

  if (res.status === 403) {
    throw new Error("GitHub rate limit exceeded");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch contributors");
  }

  return res.json();
}
