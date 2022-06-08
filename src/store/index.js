import { createStore } from "redux";
import { canvasReducer } from "../reducers/canvasReducer";
import { combineReducers } from "redux";
import { frameReducer } from "../reducers/frameReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
  combineReducers({
    canvas: canvasReducer,
    frames: frameReducer,
  }),
  composeWithDevTools()
);

export default store;
