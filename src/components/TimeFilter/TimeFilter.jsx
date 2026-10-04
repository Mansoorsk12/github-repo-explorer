
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function TimeFilter({ period, onChange }) {
  return (
    <ToggleButtonGroup
      value={period}
      exclusive
      onChange={(event, value) => {
        if (value) onChange(value);
      }}
      size="small"
      color="primary"
    >
      <ToggleButton value="1week">1 Week</ToggleButton>
      <ToggleButton value="2weeks">2 Weeks</ToggleButton>
      <ToggleButton value="1month">1 Month</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TimeFilter;
