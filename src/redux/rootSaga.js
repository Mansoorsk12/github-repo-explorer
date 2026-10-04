
import { all, fork } from "redux-saga/effects";
import { repoSaga } from "./repoSaga";

export default function* rootSaga() {
  yield all([
    fork(repoSaga),
  ]);
}
