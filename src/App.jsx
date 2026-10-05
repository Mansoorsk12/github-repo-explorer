import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Paper,
  Chip,
  IconButton,
  Stack,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Divider,
} from "@mui/material";

import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import TimeFilter from "./components/TimeFilter/TimeFilter";
import RepoList from "./components/RepoList/RepoList";
import RepositoryDetails from "./components/RepoDetails/RepositoryDetails";

import {
  fetchReposRequest,
  setPeriod,
} from "./redux/repoSlice";

import "./App.css";

const theme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#050607",
      paper: "#0c0f12",
    },

    primary: {
      main: "#16d9a3",
    },

    secondary: {
      main: "#8b5cf6",
    },
  },

  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

function Dashboard() {
  const dispatch = useDispatch();

  const {
    period,
    repos,
  } = useSelector((state) => state.repos);

  useEffect(() => {
    dispatch(fetchReposRequest());
  }, [dispatch]);

  const handlePeriodChange = (newPeriod) => {
    dispatch(setPeriod(newPeriod));
    dispatch(fetchReposRequest());
  };

  return (
    <Box className="dashboard-shell">

      {/* TOP NAVBAR */}

      <AppBar
        position="sticky"
        elevation={0}
        className="topbar"
      >
        <Toolbar
          sx={{
            minHeight: "64px !important",
            px: { xs: 2, md: 3 },
          }}
        >

          <Box
            component={Link}
            to="/"
            className="brand-link"
          >
            <Box className="brand-mark">
              <CodeRoundedIcon fontSize="small" />
            </Box>

            <Typography
              variant="h6"
              fontWeight={800}
            >
              Git<span>Lookout</span>
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >

            <Chip
              icon={<ExploreRoundedIcon />}
              label="Repository Explorer"
              variant="outlined"
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            />

            <IconButton
              component="a"
              href="https://github.com/Mansoorsk12/github-repo-explorer"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>

          </Stack>

        </Toolbar>
      </AppBar>


      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >

        {/* HERO */}

        <Paper className="hero-panel">

          <Box
            sx={{
              maxWidth: 820,
            }}
          >

            <Typography className="eyebrow">

              <TrendingUpRoundedIcon
                fontSize="small"
              />

              OPEN-SOURCE PULSE

            </Typography>

            <Typography
              component="h1"
              className="hero-title"
              sx={{
                fontSize: {
                  xs: "2.2rem",
                  md: "4rem",
                },
              }}
            >
              Most Starred Repos
            </Typography>

            <Typography className="hero-subtitle">
              Discover the fastest-growing GitHub
              repositories created recently, then
              drill into weekly commit and contributor
              activity.
            </Typography>

          </Box>


          <Box className="hero-stat">

            <Typography variant="caption">
              LOADED REPOSITORIES
            </Typography>

            <Typography
              variant="h3"
              fontWeight={800}
            >
              {repos.length}
            </Typography>

          </Box>

        </Paper>


        {/* FILTER */}

        <Paper className="control-panel">

          <Box>

            <Typography
              variant="subtitle1"
              fontWeight={700}
            >
              Repository discovery
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Sorted by stars · newest repositories first
            </Typography>

          </Box>


          <TimeFilter
            period={period}
            onChange={handlePeriodChange}
          />

        </Paper>


        {/* REPOSITORIES */}

        <Paper className="content-panel">

          <Box className="section-heading">

            <Box>

              <Typography
                variant="h6"
                fontWeight={800}
              >
                Trending repositories
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Select a repository to view analytics.
              </Typography>

            </Box>

            <Chip
              icon={<StarRoundedIcon />}
              label="Most starred"
              color="primary"
              variant="outlined"
            />

          </Box>


          <Divider
            sx={{
              borderColor:
                "rgba(255,255,255,.08)",
              mb: 2,
            }}
          />


          <RepoList />

        </Paper>


        {/* FOOTER */}

        <Box className="footer-note">

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Powered by the GitHub REST API
          </Typography>

          <Typography
            component="a"
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noopener noreferrer"
            variant="caption"
            color="primary"
            sx={{
              textDecoration: "none",
              display: "flex",
              gap: 0.5,
            }}
          >
            API documentation

            <ArrowOutwardRoundedIcon
              sx={{
                fontSize: 14,
              }}
            />

          </Typography>

        </Box>

      </Container>

    </Box>
  );
}


function App() {

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/repository/:owner/:repo"
            element={<RepositoryDetails />}
          />

        </Routes>

      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;