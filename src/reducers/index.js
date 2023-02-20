import { combineReducers } from "redux"
import { canvasReducer } from "./canvasReducer"
import { frameReducer } from "./frameReducer"
import exportReducer from "./exportReducer"
import onionScreenReducer from "./onionScreenReducer"
import undoReducer from "./undoReducer"
import tooltipReducer from "./tooltipReducer"
export const rootReducer=combineReducers({
    canvas: canvasReducer,
    frames: frameReducer,
    export: exportReducer,
    onion: onionScreenReducer,
    undo: undoReducer,
    tooltip:tooltipReducer
  })