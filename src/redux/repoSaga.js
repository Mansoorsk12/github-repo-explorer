
import { call, put, select, takeLatest } from "redux-saga/effects";

import { fetchRepositories } from "../services/githubApi";

import {
  fetchReposRequest,
  fetchNextReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
} from "./repoSlice";

function* fetchReposWorker(action) {
  try {
    const period = yield select((state) => state.repos.period);

    const page =
      action.type === fetchNextReposRequest.type
        ? yield select((state) => state.repos.page)
        : 1;

    const data = yield call(fetchRepositories, period, page);

    yield put(
      fetchReposSuccess({
        items: data.items,
        page,
      })
    );
  } catch (error) {
    yield put(
      fetchReposFailure(
        error.response?.data?.message ||
          "Failed to fetch repositories"
      )
    );
  }
}

export function* repoSaga() {
  yield takeLatest(
    [fetchReposRequest.type, fetchNextReposRequest.type],
    fetchReposWorker
  );
}
