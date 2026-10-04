
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: [],
  loading: false,
  error: null,
  period: "1month",
  page: 1,
  hasMore: true,
};

const repoSlice = createSlice({
  name: "repos",
  initialState,

  reducers: {
    fetchReposRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchNextReposRequest: (state) => {
      if (!state.loading && state.hasMore) {
        state.loading = true;
        state.error = null;
        state.page += 1;
      }
    },

    fetchReposSuccess: (state, action) => {
      const { items, page } = action.payload;

      if (page === 1) {
        state.repos = items;
      } else {
        state.repos = [...state.repos, ...items];
      }

      state.page = page;
      state.hasMore = items.length === 30;
      state.loading = false;
    },

    fetchReposFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setPeriod: (state, action) => {
      state.period = action.payload;
      state.repos = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
});

export const {
  fetchReposRequest,
  fetchNextReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
  setPeriod,
} = repoSlice.actions;

export default repoSlice.reducer;
