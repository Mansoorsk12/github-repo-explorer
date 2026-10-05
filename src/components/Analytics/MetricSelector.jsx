import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function MetricSelector({
  metric,
  onChange,
}) {
  return (
    <FormControl
      size="small"
      className="analytics-select"
    >
      <InputLabel id="metric-label">
        Metric
      </InputLabel>

      <Select
        labelId="metric-label"
        value={metric}
        label="Metric"
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      >
        <MenuItem value="commits">
          Commits
        </MenuItem>

        <MenuItem value="additions">
          Additions
        </MenuItem>

        <MenuItem value="deletions">
          Deletions
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default MetricSelector;