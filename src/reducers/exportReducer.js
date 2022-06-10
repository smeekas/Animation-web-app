const initialState = {
  videoBlob: null,
};
const exportReducer = (state=initialState, action) => {
  if (action.type === "ADD") {
    return { videoBlob: action.blob };
  }
  return state;
};
export default exportReducer;
