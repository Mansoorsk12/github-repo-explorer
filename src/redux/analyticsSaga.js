import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchAnalyticsRequest,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} from "./analyticsSlice";

import { fetchRepositoryAnalytics } from "../services/analyticsApi";

import {
  transformRepositoryAnalytics,
} from "../utils/analyticsUtils";

function* fetchAnalyticsWorker(action) {
  try {
    const { owner, repo } = action.payload;

    const data = yield call(
      fetchRepositoryAnalytics,
      owner,
      repo
    );

    const transformed =
      transformRepositoryAnalytics(data);

    if (transformed.weeks.length === 0) {
      throw new Error(
        "No weekly repository activity is available."
      );
    }

    yield put(
      fetchAnalyticsSuccess(
        transformed
      )
    );
  } catch (error) {
    yield put(
      fetchAnalyticsFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to load repository analytics."
      )
    );
  }
}

export function* analyticsSaga() {
  yield takeLatest(
    fetchAnalyticsRequest.type,
    fetchAnalyticsWorker
  );
}