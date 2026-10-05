import { all, fork } from "redux-saga/effects";

import { repoSaga } from "./repoSaga";
import { analyticsSaga } from "./analyticsSaga";

export default function* rootSaga() {
  yield all([
    fork(repoSaga),
    fork(analyticsSaga),
  ]);
}