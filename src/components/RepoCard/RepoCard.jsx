import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

function RepoCard({ repo }) {

  const formatNumber = (number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
    }).format(number);

  const analyticsUrl =
    `/repository/${repo.owner.login}/${repo.name}`;

  return (
    <Card
      component="article"
      className="repo-card"
    >

      <CardContent className="repo-card-content">

        {/* OWNER */}

        <Box
          component="a"
          href={repo.owner.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="owner-avatar-link"
        >

          <Avatar
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="repo-avatar"
          />

        </Box>


        {/* MAIN CONTENT */}

        <Box className="repo-main">

          <Box className="repo-title-row">

            <Box sx={{ minWidth: 0 }}>

              {/* REPOSITORY NAME */}

              <Typography
                component={RouterLink}
                to={analyticsUrl}
                className="repo-name"
              >
                {repo.full_name}
              </Typography>


              {/* GITHUB LINK */}

              <Typography
                component="a"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-external-link"
              >
                View on GitHub

                <OpenInNewRoundedIcon
                  sx={{
                    fontSize: 13,
                  }}
                />

              </Typography>

            </Box>


            {/* ANALYTICS BUTTON */}

            <Tooltip title="Open repository analytics">

              <IconButton
                component={RouterLink}
                to={analyticsUrl}
                className="repo-arrow"
                aria-label="Open repository analytics"
              >

                <ArrowForwardRoundedIcon />

              </IconButton>

            </Tooltip>

          </Box>


          {/* DESCRIPTION */}

          <Typography className="repo-description">

            {repo.description ||
              "No description available for this repository."}

          </Typography>


          {/* STATS */}

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
          >

            <Chip
              icon={<StarRoundedIcon />}
              label={`${formatNumber(
                repo.stargazers_count
              )} stars`}
              className="stat-chip"
            />

            <Chip
              icon={<BugReportRoundedIcon />}
              label={`${formatNumber(
                repo.open_issues_count
              )} issues`}
              className="stat-chip"
            />


            {/* PROFILE LINK */}

            <Typography
              component="a"
              href={repo.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="owner-link"
            >
              @{repo.owner.login}
            </Typography>

          </Stack>

        </Box>

      </CardContent>

    </Card>
  );
}

export default RepoCard;