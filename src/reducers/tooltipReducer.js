const initialState = {
  x: null,
  y: null,
  name: null,
};
function tooltipReducer(state = initialState, action) {
  if (action.type === "ADD_TOOLTIP") {
    return { x: action.x, y: action.y, name: action.name };
  }
  if (action.type === "UPDATE_TOOLTIP") {
    return { ...state, x: action.x, y: action.y };
  }
  if (action.type === "REMOVE_TOOLTIP") {
    return initialState;
  }
  return state;
}
export default tooltipReducer;
