const initialState = {
  frames: [],
  currFrame: -1,
};
export const frameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FRAME_ADD": {
      const newFrames = [...state.frames];
      newFrames.push({
        grid: action.payload.grid,
        image: action.payload.image,
      });
      return { frames: [...newFrames], currFrame: newFrames.length - 1 };
    }
    case "FRAME_UPDATE": {
      const newArr = [...state.frames];

      newArr[action.index] = { grid: action.grid, image: action.image };

      console.log(newArr.map((item) => item.image));
      return { frames: newArr, ...state };
    }
    case "ADD_CURR_FRAME": {
      return { ...state, currFrame: action.index };
    }
    case "FRAME_UPDATE_ADD_CURR_FRAME": {
      const newArr = [...state.frames];
      newArr[action.index] = { grid: action.grid, image: action.image };
      return {
        frames: newArr,
        currFrame: action.newIndex,
      };
      // return state;
    }
    default:
      return state;
  }
};
