import {
  Box,
  Skeleton,
} from "@mui/material";

function AnalyticsSkeleton() {
  return (
    <Box className="analytics-skeleton-stack">
      <Skeleton
        variant="rounded"
        height={340}
        animation="wave"
      />

      <Skeleton
        variant="rounded"
        height={460}
        animation="wave"
      />
    </Box>
  );
}

export default AnalyticsSkeleton;