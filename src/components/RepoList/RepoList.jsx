
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

import RepoCard from "../RepoCard/RepoCard";

function RepoList({ onExpand }) {
  const { repos, loading, error } = useSelector(
    (state) => state.repos
  );

  if (loading && repos.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Fetching repositories...
        </Typography>
      </Box>
    );
  }

  if (error && repos.length === 0) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (repos.length === 0) {
    return (
      <Typography textAlign="center" sx={{ py: 5 }}>
        No repositories found.
      </Typography>
    );
  }

  return (
    <Box>
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          onExpand={onExpand}
        />
      ))}

      {loading && (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default RepoList;
