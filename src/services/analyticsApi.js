import axios from "axios";

const BASE_URL = "https://api.github.com";

const getCacheKey = (owner, repo) =>
  `github-analytics:${owner}:${repo}`;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchGitHubStats = async (url) => {
  const MAX_ATTEMPTS = 10;

  for (
    let attempt = 0;
    attempt < MAX_ATTEMPTS;
    attempt += 1
  ) {
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      /*
        GitHub has finished calculating
        the repository statistics.
      */

      if (response.status === 200) {
        return response.data;
      }

      /*
        GitHub is still calculating
        the repository statistics.
      */

      if (response.status === 202) {
        const delay = Math.min(
          2000 * Math.pow(2, attempt),
          10000
        );

        console.log(
          `GitHub is calculating statistics. Retrying in ${
            delay / 1000
          } seconds...`
        );

        await sleep(delay);
        continue;
      }

      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      const remaining =
        error.response?.headers?.[
          "x-ratelimit-remaining"
        ];

      const reset =
        error.response?.headers?.[
          "x-ratelimit-reset"
        ];

      console.error("GitHub API error:", {
        url,
        status,
        message,
        remaining,
        reset,
      });

      /*
        Rate limit handling
      */

      if (status === 403) {
        if (remaining === "0") {
          const resetTime = reset
            ? new Date(
                Number(reset) * 1000
              ).toLocaleTimeString()
            : "later";

          throw new Error(
            `GitHub API rate limit exceeded. Try again after ${resetTime}.`
          );
        }

        throw new Error(
          message ||
            "GitHub rejected this request with HTTP 403."
        );
      }

      throw new Error(
        message ||
          error.message ||
          "Failed to load repository statistics."
      );
    }
  }

  throw new Error(
    "GitHub is taking longer than expected to calculate repository statistics. Please try again shortly."
  );
};


/*
  Fetch repository analytics
  from GitHub's three statistics endpoints.
*/

export const fetchRepositoryAnalytics = async (
  owner,
  repo
) => {
  const cacheKey =
    getCacheKey(owner, repo);

  /*
    Check browser session cache first.
  */

  const cachedData =
    sessionStorage.getItem(cacheKey);

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

  /*
    Required GitHub endpoints
  */

  const codeFrequencyUrl =
    `${baseUrl}/code_frequency`;

  const commitActivityUrl =
    `${baseUrl}/commit_activity`;

  const contributorsUrl =
    `${baseUrl}/contributors`;

  /*
    Fetch sequentially.
  */

  const codeFrequency =
    await fetchGitHubStats(
      codeFrequencyUrl
    );

  const commitActivity =
    await fetchGitHubStats(
      commitActivityUrl
    );

  const contributors =
    await fetchGitHubStats(
      contributorsUrl
    );

  /*
    Normalize API response.
  */

  const result = {
    codeFrequency:
      Array.isArray(codeFrequency)
        ? codeFrequency
        : [],

    commitActivity:
      Array.isArray(commitActivity)
        ? commitActivity
        : [],

    contributors:
      Array.isArray(contributors)
        ? contributors
        : [],
  };

  /*
    Cache successful response.
  */

  sessionStorage.setItem(
    cacheKey,
    JSON.stringify(result)
  );

  return result;
};