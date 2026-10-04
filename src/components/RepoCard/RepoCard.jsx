
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import BugReportIcon from "@mui/icons-material/BugReport";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function RepoCard({ repo, onExpand }) {
  const formatNumber = (number) =>
    new Intl.NumberFormat("en-US").format(number);

  return (
    <Card
      onClick={() => onExpand(repo)}
      sx={{
        mb: 2,
        cursor: "pointer",
        borderRadius: 2,
        bgcolor: "#f8f9fa",
        boxShadow: "none",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          "&:last-child": { pb: 2 },
        }}
      >
        <Avatar
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          sx={{
            width: 85,
            height: 85,
            borderRadius: 2,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ overflowWrap: "anywhere" }}
          >
            {repo.full_name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {repo.description || "No description available"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Chip
              icon={<StarIcon />}
              label={formatNumber(repo.stargazers_count)}
              variant="outlined"
            />

            <Chip
              icon={<BugReportIcon />}
              label={formatNumber(repo.open_issues_count)}
              variant="outlined"
            />

            <Typography variant="caption" color="text.secondary">
              By {repo.owner.login}
            </Typography>
          </Box>
        </Box>

        <IconButton
          aria-label="View repository details"
          onClick={(event) => {
            event.stopPropagation();
            onExpand(repo);
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default RepoCard;
