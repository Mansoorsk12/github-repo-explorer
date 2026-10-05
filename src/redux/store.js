import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import repoReducer from "./repoSlice";
import analyticsReducer from "./analyticsSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repos: repoReducer,
    analytics: analyticsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;