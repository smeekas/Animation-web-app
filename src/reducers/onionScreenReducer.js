const initialState = {
  showScreen: false,
};
function onionScreenReducer(state = initialState, action) {
  if (action.type === "TOGGLE") {
    return { showScreen: !state.showScreen };
  }
  if (action.type === "DISABLE_ONION_SCREEN") {
    return { showScreen: false };
  }
  return state;
}
export default onionScreenReducer;
