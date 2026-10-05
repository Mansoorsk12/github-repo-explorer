import {
  useEffect,
  useMemo,
} from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import MetricSelector from "../Analytics/MetricSelector";
import AnalyticsSkeleton from "../Analytics/AnalyticsSkeleton";
import TotalChangesChart from "../Analytics/TotalChangesChart";
import ContributorChart from "../Analytics/ContributorChart";

import {
  fetchAnalyticsRequest,
  setAnalyticsMetric,
} from "../../redux/analyticsSlice";

import {
  buildChartData,
  metricLabels,
} from "../../utils/analyticsUtils";

function RepositoryDetails() {
  const {
    owner,
    repo,
  } = useParams();

  const dispatch = useDispatch();

  const {
  contributors,
  weeks,
  totals,
  metric,
  loading,
  error,
} = useSelector(
  (state) => state.analytics
);

  /*
    Load analytics whenever the
    repository changes.
  */

  useEffect(() => {
    if (owner && repo) {
      dispatch(
        fetchAnalyticsRequest({
          owner,
          repo,
        })
      );
    }
  }, [
    dispatch,
    owner,
    repo,
  ]);

  /*
    Convert raw contributor data
    into Highcharts data.
  */

  const chartData = useMemo(
  () =>
    buildChartData(
      contributors,
      weeks,
      metric,
      totals
    ),

  [
    contributors,
    weeks,
    metric,
    totals,
  ]
);

  const githubUrl =
    `https://github.com/${owner}/${repo}`;

  return (
    <Box className="analytics-page">

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >

        {/* BACK BUTTON */}

        <Button
          component={Link}
          to="/"
          startIcon={
            <ArrowBackRoundedIcon />
          }
          sx={{
            mb: 2,
            color: "#16d9a3",
            fontWeight: 700,
          }}
        >
          Back to repositories
        </Button>


        {/* HEADER */}

        <Paper className="analytics-hero">

          <Box
            sx={{
              minWidth: 0,
            }}
          >

            <Typography
              className="eyebrow"
            >
              <TrendingUpRoundedIcon
                fontSize="small"
              />

              REPOSITORY ACTIVITY
            </Typography>


            <Typography
              variant="h3"
              className="analytics-title"
            >
              {owner}/{repo}
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mt: 1.5,
                maxWidth: 760,
                lineHeight: 1.7,
              }}
            >
              Weekly repository activity
              for the most recent 52
              weeks. Compare total changes
              with individual contributor
              activity.
            </Typography>

          </Box>


          <Button
            component="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{
              flexShrink: 0,
            }}
          >
            Open on GitHub
          </Button>

        </Paper>


        {/* METRIC SELECTOR */}

        <Paper className="analytics-control">

          <Box>

            <Typography
              variant="subtitle1"
              fontWeight={800}
            >
              Activity metric
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Choose what "changes" means
              for both charts.
            </Typography>

          </Box>


          <MetricSelector
            metric={metric}
            onChange={(value) =>
              dispatch(
                setAnalyticsMetric(
                  value
                )
              )
            }
          />

        </Paper>


        {/* LOADING */}

        {loading && (
          <AnalyticsSkeleton />
        )}


        {/* ERROR */}

        {!loading && error && (
          <Alert
            severity="warning"
            className="analytics-alert"
          >
            {error}
          </Alert>
        )}


        {/* CHARTS */}

        {!loading &&
          !error &&
          weeks.length > 0 && (

            <Stack spacing={2}>

              {/* TOTAL CHART */}

              <Paper className="chart-panel">

                <Box className="chart-heading">

                  <Box>

                    <Typography
                      variant="h6"
                      fontWeight={800}
                    >
                      Total{" "}
                      {metricLabels[metric]}
                      {" "}per week
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      All contributors
                      combined
                    </Typography>

                  </Box>


                  <Chip
                    label={`${weeks.length} weeks`}
                    variant="outlined"
                  />

                </Box>


                <Divider
                  className="chart-divider"
                />


                <TotalChangesChart
                  weeks={weeks}
                  totals={
                    chartData.totals
                  }
                  metric={metric}
                />

              </Paper>


              {/* CONTRIBUTOR CHART */}

              <Paper className="chart-panel">

                <Box className="chart-heading">

                  <Box>

                    <Typography
                      variant="h6"
                      fontWeight={800}
                    >
                      Contributor{" "}
                      {metricLabels[metric]}
                      {" "}per week
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Click a legend item to
                      hide or show a
                      contributor.
                    </Typography>

                  </Box>


                  <Chip
                    label={`${contributors.length} contributors`}
                    variant="outlined"
                  />

                </Box>


                <Divider
                  className="chart-divider"
                />


                <ContributorChart
                  weeks={weeks}
                  series={
                    chartData.series
                  }
                  metric={metric}
                />

              </Paper>

            </Stack>
          )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          weeks.length === 0 && (

            <Paper
              className="empty-analytics"
            >

              <Typography
                variant="h6"
                fontWeight={800}
              >
                No activity data
                available
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                GitHub does not currently
                have weekly contributor
                statistics for this
                repository.
              </Typography>

            </Paper>
          )}

      </Container>

    </Box>
  );
}

export default RepositoryDetails;