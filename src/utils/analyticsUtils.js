const getMetricValue = (week, metric) => {
  if (metric === "additions") {
    return week?.a || 0;
  }

  if (metric === "deletions") {
    return week?.d || 0;
  }

  return week?.c || 0;
};

export const metricLabels = {
  commits: "Commits",
  additions: "Additions",
  deletions: "Deletions",
};

const toTimestamp = (seconds) => seconds * 1000;

export const transformRepositoryAnalytics = ({
  codeFrequency,
  commitActivity,
  contributors,
}) => {
  // -----------------------------
  // TOTAL ADDITIONS / DELETIONS
  // -----------------------------

  const codeByWeek = Object.fromEntries(
    codeFrequency
      .filter(
        (row) =>
          Array.isArray(row) &&
          Number.isFinite(row[0])
      )
      .map(([week, additions, deletions]) => [
        String(toTimestamp(week)),
        {
          a: additions || 0,
          d: Math.abs(deletions || 0),
        },
      ])
  );

  // -----------------------------
  // TOTAL COMMITS
  // -----------------------------

  const commitsByWeek = Object.fromEntries(
    commitActivity
      .filter(
        (week) =>
          week &&
          Number.isFinite(week.week)
      )
      .map((week) => [
        String(toTimestamp(week.week)),
        {
          c: week.total || 0,
        },
      ])
  );

  // -----------------------------
  // CONTRIBUTORS
  // -----------------------------

  const normalizedContributors = contributors
    .filter(
      (item) =>
        item?.author?.login &&
        Array.isArray(item.weeks)
    )
    .map((item) => ({
      login: item.author.login,
      avatarUrl: item.author.avatar_url,

      weeks: item.weeks
        .filter(
          (week) =>
            week &&
            Number.isFinite(week.w)
        )
        .map((week) => ({
          timestamp: toTimestamp(week.w),
          a: week.a || 0,
          d: week.d || 0,
          c: week.c || 0,
        })),
    }));

  // -----------------------------
  // ALL AVAILABLE WEEKS
  // -----------------------------

  const contributorTimestamps =
    normalizedContributors.flatMap(
      (contributor) =>
        contributor.weeks.map(
          (week) => week.timestamp
        )
    );

  const allTimestamps = [
    ...new Set([
      ...Object.keys(codeByWeek).map(Number),
      ...Object.keys(commitsByWeek).map(Number),
      ...contributorTimestamps,
    ]),
  ]
    .sort((a, b) => a - b)
    .slice(-52);

  // -----------------------------
  // FAST CONTRIBUTOR LOOKUP
  // -----------------------------

  const contributorsWithData =
    normalizedContributors.map(
      (contributor) => ({
        ...contributor,

        byTimestamp: Object.fromEntries(
          contributor.weeks.map(
            (week) => [
              String(week.timestamp),
              week,
            ]
          )
        ),
      })
    );

  return {
    weeks: allTimestamps,

    contributors: contributorsWithData,

    totals: {
      additions: codeByWeek,
      deletions: codeByWeek,
      commits: commitsByWeek,
    },
  };
};

export const buildChartData = (
  contributors,
  weeks,
  metric,
  totals = {}
) => {
  // -----------------------------
  // CONTRIBUTOR SERIES
  // -----------------------------

  const series = contributors.map(
    (contributor) => ({
      name: contributor.login,
      avatarUrl: contributor.avatarUrl,

      data: weeks.map((timestamp) => {
        const week =
          contributor.byTimestamp[
            String(timestamp)
          ];

        return getMetricValue(
          week,
          metric
        );
      }),
    })
  );

  // -----------------------------
  // TOTAL SERIES
  // -----------------------------

  const totalsByWeek = weeks.map(
    (timestamp) => {
      const repositoryWeek =
        totals[metric]?.[
          String(timestamp)
        ];

      if (repositoryWeek) {
        return getMetricValue(
          repositoryWeek,
          metric
        );
      }

      return contributors.reduce(
        (total, contributor) => {
          const week =
            contributor.byTimestamp[
              String(timestamp)
            ];

          return (
            total +
            getMetricValue(
              week,
              metric
            )
          );
        },
        0
      );
    }
  );

  return {
    totals: totalsByWeek,
    series,
  };
};

export const formatShortWeek = (
  timestamp
) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));

export const formatLongDate = (
  timestamp
) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));

export const formatMetricValue = (
  value
) =>
  new Intl.NumberFormat("en-US").format(
    value || 0
  );