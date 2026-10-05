import axios from "axios";

const BASE_URL = "https://api.github.com";

const MAX_RETRIES = 5;
const RETRY_DELAY = 1500;

const getCacheKey = (owner, repo) =>
  `github-analytics:${owner}:${repo}`;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchGitHubStats = async (url) => {
  for (
    let attempt = 0;
    attempt <= MAX_RETRIES;
    attempt += 1
  ) {
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      /*
        GitHub may return 202 while statistics
        are still being calculated.
      */

      if (response.status !== 202) {
        return response.data;
      }

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY);
      }
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
    "GitHub is still calculating repository statistics. Please try again shortly."
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
    Check session cache first.
    This prevents unnecessary
    repeated GitHub API requests.
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
    GitHub statistics endpoints
  */

  const codeFrequencyUrl =
    `${baseUrl}/code_frequency`;

  const commitActivityUrl =
    `${baseUrl}/commit_activity`;

  const contributorsUrl =
    `${baseUrl}/contributors`;

  /*
    Fetch sequentially instead of
    sending all requests together.
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
    Normalize response
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
    Cache successful response
  */

  sessionStorage.setItem(
    cacheKey,
    JSON.stringify(result)
  );

  return result;
};  