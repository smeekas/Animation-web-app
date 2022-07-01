const initialState = {
  videoBlob: null,
  hide: false,
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
  return state;
};
export default exportReducer;
