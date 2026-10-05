import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Link, useParams } from "react-router-dom";

function RepositoryDetails() {

  const {
    owner,
    repo,
  } = useParams();

  const githubUrl =
    `https://github.com/${owner}/${repo}`;

  return (

    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >

      <Button
        component={Link}
        to="/"
        startIcon={
          <ArrowBackRoundedIcon />
        }
        sx={{
          mb: 3,
          color: "#16d9a3",
        }}
      >
        Back to repositories
      </Button>


      <Paper
        sx={{
          p: {
            xs: 3,
            md: 5,
          },
          background:
            "#0a0d10",
          border:
            "1px solid rgba(255,255,255,.08)",
        }}
      >

        <Typography
          variant="overline"
          color="primary"
        >
          REPOSITORY ANALYTICS
        </Typography>


        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            mt: 1,
            overflowWrap:
              "anywhere",
          }}
        >
          {owner}/{repo}
        </Typography>


        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
          }}
        >
          Weekly commit and contributor
          activity will appear here.
        </Typography>


        <Button
          component="a"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          color="primary"
          startIcon={<GitHubIcon />}
          sx={{
            mt: 3,
          }}
        >
          Open on GitHub
        </Button>

      </Paper>

    </Container>

  );
}

export default RepositoryDetails;