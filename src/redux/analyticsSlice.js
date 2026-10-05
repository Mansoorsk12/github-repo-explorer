import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  owner: null,
  repo: null,
  contributors: [],
  weeks: [],
  totals: {
    commits: {},
    additions: {},
    deletions: {},
  },
  metric: "commits",
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,

  reducers: {
    fetchAnalyticsRequest: (state, action) => {
      state.owner = action.payload.owner;
      state.repo = action.payload.repo;
      state.loading = true;
      state.error = null;
      state.contributors = [];
      state.weeks = [];

      state.totals = {
        commits: {},
        additions: {},
        deletions: {},
      };
    },

    fetchAnalyticsSuccess: (state, action) => {
      state.contributors = action.payload.contributors;
      state.weeks = action.payload.weeks;
      state.totals = action.payload.totals;

      state.loading = false;
      state.error = null;
    },

    fetchAnalyticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setAnalyticsMetric: (state, action) => {
      state.metric = action.payload;
    },
  },
});

export const {
  fetchAnalyticsRequest,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
  setAnalyticsMetric,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;