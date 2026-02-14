import axios from "axios";

const githubApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

export const githubFetch = async <T>(
  endpoint: string,
  config = {},
): Promise<T> => {
  try {
    const response = await githubApi.get<T>(endpoint, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("GitHub rate limit exceeded");
      }

      throw new Error(
        `GitHub API Error: ${error.response?.statusText || error.message}`,
      );
    }

    throw error;
  }
};
