const initialState = {
  videoBlob: null,
  hide: false,
  fps: 1
};
const exportReducer = (state = initialState, action) => {
  if (action.type === "ADD") {
    return { videoBlob: action.blob };
  }
  if (action.type === "HIDE_WHILE_EXPORT") {
    return { ...state, hide: true };
  }
  if (action.type === "SHOW_EXPORT_FINISHED") {
    return { ...state, hide: false };
  }
  if (action.type === "FPS") {
    return { ...state, fps: action.fps }
  }
  return state;
};
export default exportReducer;
