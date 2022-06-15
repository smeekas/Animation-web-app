import { createStore } from "redux";
import { canvasReducer } from "../reducers/canvasReducer";
import { combineReducers } from "redux";
import { frameReducer } from "../reducers/frameReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import exportReducer from "../reducers/exportReducer";
import onionScreenReducer from "../reducers/onionScreenReducer";
import undoReducer from "../reducers/undoReducer";
const store = createStore(
  combineReducers({
    canvas: canvasReducer,
    frames: frameReducer,
    export: exportReducer,
    onion: onionScreenReducer,
    undo: undoReducer,
  }),
  composeWithDevTools()
);

export default store;
