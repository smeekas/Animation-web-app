const initialState = {
  showScreen: false,
};
function onionScreenReducer(state = initialState, action) {
  if (action.type === "TOGGLE") {
    return { showScreen: !state.showScreen };
  }
  return state;
}
export default onionScreenReducer;
