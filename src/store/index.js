import { createStore } from "redux";
import { canvasReducer } from "../reducers/canvasReducer";
import { combineReducers } from "redux";
import { frameReducer } from "../reducers/frameReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import exportReducer from "../reducers/exportReducer";
const store = createStore(
  combineReducers({
    canvas: canvasReducer,
    frames: frameReducer,
    export: exportReducer,
  }),
  composeWithDevTools()
);

export default store;
