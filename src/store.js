import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  appReducer,
  usersReducer,
  postReducer,
  postsReducer,
} from "./reducers";

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  post: postReducer,
  posts: postsReducer,
  app: appReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
