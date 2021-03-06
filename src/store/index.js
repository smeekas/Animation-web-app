import { createStore } from "redux";
import { canvasReducer } from "../reducers/canvasReducer";
import { combineReducers } from "redux";
import { frameReducer } from "../reducers/frameReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import exportReducer from "../reducers/exportReducer";
import onionScreenReducer from "../reducers/onionScreenReducer";
import undoReducer from "../reducers/undoReducer";
import tooltipReducer from "../reducers/tooltipReducer";
const store = createStore(
  combineReducers({
    canvas: canvasReducer,
    frames: frameReducer,
    export: exportReducer,
    onion: onionScreenReducer,
    undo: undoReducer,
    tooltip:tooltipReducer
  }),
  composeWithDevTools()
);

export default store;
