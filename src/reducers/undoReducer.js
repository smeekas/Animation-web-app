const initialState = {
  history: [],
  maxlen: 5,
};
function undoReducer(state = initialState, action) {
  if (action.type === "PUSH_TO_HISTORY") {
    const newHistory = [...state.history];
    if (!newHistory[action.index]) {
      newHistory[action.index] = {
        curr: -2,
        grid: [],
        canUndo: false,
        canRedo: false,
      };
    }

    if (
      newHistory[action.index].curr <
      newHistory[action.index].grid.length - 2
    ) {
      console.log("YUP", newHistory[action.index].curr);

      newHistory[action.index].grid = newHistory[action.index].grid.slice(
        0,
        //TODO: TEST this
        newHistory[action.index].curr + 2
      );
      newHistory[action.index].grid.push(action.grid);
      newHistory[action.index].curr += 1;
      newHistory[action.index].canUndo = newHistory[action.index].curr >= 0;
      newHistory[action.index].canRedo =
        newHistory[action.index].curr <
        newHistory[action.index].grid.length - 2;
      return {
        ...state,
        history: newHistory,
      };
    }
    newHistory[action.index].grid.push(action.grid);
    newHistory[action.index].curr += 1;
    newHistory[action.index].canUndo = newHistory[action.index].curr >= 0;
    newHistory[action.index].canRedo =
      newHistory[action.index].curr < newHistory[action.index].grid.length - 2;
    return {
      ...state,
      history: newHistory,
    };
  }
  if (action.type === "UNDO_POP") {
    const newHistory = [...state.history];
    const canUndo = newHistory[action.index].curr >= 0;
    if (canUndo) {
      newHistory[action.index].curr -= 1;
    }
    newHistory[action.index].canUndo = newHistory[action.index].curr >= 0;
    newHistory[action.index].canRedo =
      newHistory[action.index].curr < newHistory[action.index].grid.length - 2;
    return { ...state, history: newHistory };
  }
  if (action.type === "NEW_PROJECT_UNDO_REDO") {
    return initialState
  }
  if (action.type === "REDO_PUSH") {
    const newHistory = [...state.history];
    const canRedo =
      newHistory[action.index].curr < newHistory[action.index].grid.length - 2;
    if (canRedo) {
      newHistory[action.index].curr += 1;
    }
    console.log(`reducer: ${newHistory[action.index].curr} `);
    newHistory[action.index].canUndo = newHistory[action.index].curr >= 0;
    newHistory[action.index].canRedo =
      newHistory[action.index].curr < newHistory[action.index].grid.length - 2;

    return { ...state, history: newHistory };
  }
  return state;
}
export default undoReducer;

//TODO: draw undo again draw then redo==> wrong behaviour
