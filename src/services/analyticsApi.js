import axios from "axios";

const BASE_URL = "https://api.github.com";

const MAX_RETRIES = 5;
const RETRY_DELAY = 1500;

const getCacheKey = (owner, repo) =>
  `github-analytics:${owner}:${repo}`;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchGitHubStats = async (url) => {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await axios.get(url);

      if (response.status !== 202) {
        return response.data;
      }

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        throw new Error(
          "GitHub API rate limit exceeded. Please wait for the limit to reset before loading analytics again."
        );
      }

      throw error;
    }
  }

  throw new Error(
    "GitHub is still calculating repository statistics. Please try again in a moment."
  );
};

export const fetchRepositoryAnalytics = async (owner, repo) => {
  const cacheKey = getCacheKey(owner, repo);

  // Check browser cache first
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch {
      sessionStorage.removeItem(cacheKey);
    }
  }

  const baseUrl =
    `${BASE_URL}/repos/` +
    `${encodeURIComponent(owner)}/` +
    `${encodeURIComponent(repo)}/stats`;

  const codeFrequencyUrl =
    `${baseUrl}/code_frequency`;

  const commitActivityUrl =
    `${baseUrl}/commit_activity`;

  const contributorsUrl =
    `${baseUrl}/contributors`;

  const codeFrequency =
    await fetchGitHubStats(codeFrequencyUrl);

  const commitActivity =
    await fetchGitHubStats(commitActivityUrl);

  const contributors =
    await fetchGitHubStats(contributorsUrl);

  const result = {
    codeFrequency: Array.isArray(codeFrequency)
      ? codeFrequency
      : [],

    commitActivity: Array.isArray(commitActivity)
      ? commitActivity
      : [],

    contributors: Array.isArray(contributors)
      ? contributors
      : [],
  };

  // Cache successful response
  sessionStorage.setItem(
    cacheKey,
    JSON.stringify(result)
  );

  return result;
};