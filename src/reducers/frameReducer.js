const tempGrid = [];
for (let i = 0; i < process.env.REACT_APP_ROWS_COLUMNS; i++) {
  tempGrid.push([]);
  for (let j = 0; j < process.env.REACT_APP_ROWS_COLUMNS; j++) {
    tempGrid[i].push("#ffffff");
  }
}
const initialState = {
  frames: [{ grid: tempGrid }],
  // frames: [],
  currFrame: 0,
};
export const frameReducer = (state = initialState, action) => {
  // console.log(state.frames[0].grid[0]);
  switch (action.type) {
    // case "FRAME_ADD": {
    //   const newFrames = [...state.frames];
    //   newFrames.push({
    //     grid: action.payload.grid,
    //     image: action.payload.image,
    //   });
    //   return { frames: [...newFrames], currFrame: newFrames.length - 1 };
    // }
    case "FRAME_ADD": {
      const newFrames = [...state.frames];
      newFrames[state.currFrame] = {
        grid: action.payload.grid,
        image: action.payload.image,
      };
      const newCurrFrame = state.currFrame + 1;
      newFrames.push({ grid: tempGrid });
      // return { frames: [...newFrames], currFrame: newFrames.length - 1 };
      return { frames: [...newFrames], currFrame: newFrames.length - 1 };
    }
    // case "FRAME_UPDATE": {
    //   const newArr = [...state.frames];

    //   newArr[action.index] = { grid: action.grid, image: action.image };

    //   console.log(newArr.map((item) => item.image));
    //   return { frames: newArr, ...state };
    // }
    // case "ADD_CURR_FRAME": {
    //   return { ...state, currFrame: action.index };
    // }
    case "FRAME_UPDATE_ADD_CURR_FRAME": {
      const newArr = [...state.frames];
      newArr[action.index] = { grid: action.grid, image: action.image };
      return {
        frames: newArr,
        currFrame: action.newIndex,
      };
      // return state;
    }
    case "COPY_PREV_FRAME": {
      // if (state.currFrame !== 0) {
      //   const newArr = [...state.frames];
      //   // console.log(newArr[state.currFrame-1]);
      //   newArr[state.currFrame] = { ...newArr[state.currFrame - 1] };
      //   return { frames: newArr, ...state };
      // }
      // return state;
    }
    default:
      return state;
  }
};
