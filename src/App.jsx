
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  Typography,
  Paper,
} from "@mui/material";

import TimeFilter from "./components/TimeFilter/TimeFilter";
import RepoList from "./components/RepoList/RepoList";

import {
  fetchReposRequest,
  setPeriod,
} from "./redux/repoSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const { period, repos, loading } = useSelector(
    (state) => state.repos
  );

  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    dispatch(fetchReposRequest());
  }, [dispatch]);

  const handlePeriodChange = (newPeriod) => {
    setSelectedRepo(null);
    dispatch(setPeriod(newPeriod));
    dispatch(fetchReposRequest());
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography
  variant="h3"
  sx={{
    textAlign: "center",
    fontWeight: 700,
  }}
>
  Most Starred Repos
</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            Recently Created Repositories
          </Typography>

          <TimeFilter
            period={period}
            onChange={handlePeriodChange}
          />
        </Box>

        <RepoList onExpand={setSelectedRepo} />

        {selectedRepo && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {selectedRepo.full_name}
            </Typography>

            <Typography color="text.secondary" sx={{ my: 1 }}>
              {selectedRepo.description ||
                "No description available"}
            </Typography>

            <Typography variant="body2">
              Repository details and activity charts will be
              implemented in the next step.
            </Typography>

            <Typography
              component="a"
              href={selectedRepo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: "inline-block", mt: 2 }}
            >
              View on GitHub
            </Typography>
          </Box>
        )}

        {loading && repos.length > 0 && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center", mt: 2 }}
          >
            Updating repositories...
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default App;
