import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'pixelmate',
  storage
}
// const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  rootReducer,
  // combineReducers({
  //   canvas: canvasReducer,
  //   frames: frameReducer,
  //   export: exportReducer,
  //   onion: onionScreenReducer,
  //   undo: undoReducer,
  //   tooltip:tooltipReducer
  // }),
  composeWithDevTools()
);

export default store;
// export const persistor = persistStore(store)
