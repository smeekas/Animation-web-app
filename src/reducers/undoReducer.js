const initialState = {
  history: [],
  maxlen: 5,
};
function undoReducer(state = initialState, action) {
  if (action.type === "PUSH_TO_HISTORY") {
    const newHistory = [...state.history];
    // console.log(newHistory);
    if (!newHistory[action.index]) {
      newHistory[action.index] = {
        curr: -2,
        grid: [],
        canUndo: false,
        canRedo: false,
      };
    }
    newHistory[action.index].grid.push(action.grid);
    newHistory[action.index].curr += 1;
    return {
      ...state,
      history: newHistory,
      canUndo: newHistory[action.index].curr >= 0,
      canRedo:
        newHistory[action.index].curr <
        newHistory[action.index].grid.length - 1,
    };
  }
  if (action.type === "UNDO_POP") {
    const newHistory = [...state.history];
    newHistory[action.index].curr -= 1;
    return { ...state, history: newHistory };
  }
  return state;
}
export default undoReducer;
//TODO: undo last history remove error,
//TODO: redo testing
//TODO: migrate functionality to Toolbar