const initialState = {
  history: [],
  maxlen: 5,
};
function undoReducer(state = initialState, action) {
  if (action.type === "PUSH_TO_HISTORY") {
    const newHistory = [...state.history];
    console.log(newHistory);
    if (!newHistory[action.index]) {
      newHistory[action.index] = { curr: 0 };
    }
    newHistory[action.index] = {
      ...newHistory[action.index],
      grid: action.grid,
    };
    return { ...state, history: newHistory };
  }
  return state;
}
export default undoReducer;
