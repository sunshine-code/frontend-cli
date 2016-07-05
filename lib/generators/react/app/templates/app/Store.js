import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import rootReducer from "./reducers/RootReducer";

const MIDDLEWARE = [
  isDevelopment && reduxImmutableStateInvariant()
].filter(Boolean);

export default function Store(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...MIDDLEWARE)
  );
}
