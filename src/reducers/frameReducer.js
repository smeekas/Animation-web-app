import { getBlankCanvasImage } from "../utils/frame";
import { dimension } from "../variables";
import { setLocalStorageData, getLocalStorageData } from "../utils/localstorage";
const tempGrid = [];
for (let i = 0; i < dimension; i++) {
  tempGrid.push([]);
  for (let j = 0; j < dimension; j++) {
    tempGrid[i].push("#ffffff");
  }
}
const initialState = getLocalStorageData() || {
  frames: [{ grid: tempGrid, image: getBlankCanvasImage(tempGrid) }],
  currFrame: 0,
};
export const frameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_FRAME_UPDATE": {
      console.log(state.currFrame);
      const newFrames = [...state.frames];
      newFrames[state.currFrame] = {
        grid: action.payload.grid,
        image: action.payload.image,
      };
      setLocalStorageData({
        frames: [...newFrames],
        currFrame: state.currFrame,

      })
      return {
        frames: [...newFrames],
        currFrame: state.currFrame,
      };
    }
    case "FRAME_ADD": {
      const newFrames = [...state.frames];
      newFrames[state.currFrame] = {
        grid: action.payload.grid,
        image: action.payload.image,
      };
      newFrames.splice(state.currFrame + 1, 0, {
        grid: tempGrid,
        image: getBlankCanvasImage(tempGrid)
      });
      console.log(getBlankCanvasImage(tempGrid));
      setLocalStorageData({
        frames: [...newFrames],
        currFrame: action.payload.currIndex + 1,

      })
      return {
        frames: [...newFrames],
        currFrame: action.payload.currIndex + 1,
      };
    }
    case "FRAME_UPDATE_ADD_CURR_FRAME": {
      const newArr = [...state.frames];
      newArr[state.currFrame] = { grid: action.grid, image: action.image };
      setLocalStorageData({
        frames: newArr,
        currFrame: action.newIndex,

      })
      return {
        frames: newArr,
        currFrame: action.newIndex,
      };

    }
    case "DELETE_FRAME": {
      if (state.currFrame === 0) {
        const newFrames = [...state.frames];
        newFrames.splice(0, 1);
        return { frames: newFrames, currFrame: 0 };
      } else {
        const newFrames = [...state.frames];

        newFrames.splice(state.currFrame, 1);
        setLocalStorageData({
          frames: newFrames, currFrame: state.currFrame - 1
        })
        return { frames: newFrames, currFrame: state.currFrame - 1 };
      }
    }
    case "MOVE_FRAME_LEFT": {
      if (state.currFrame === 0) {
        return;
      }
      const newFrames = [...state.frames];
      newFrames.splice(
        state.currFrame - 1,
        0,
        newFrames.splice(state.currFrame, 1)[0]
      );
      setLocalStorageData({
        frames: newFrames, currFrame: state.currFrame - 1
      })
      return { frames: newFrames, currFrame: state.currFrame - 1 };
    }
    case "MOVE_FRAME_RIGHT": {
      if (state.currFrame === state.frames.length - 1) {
        return;
      }
      const newFrames = [...state.frames];
      newFrames.splice(
        state.currFrame + 1,
        0,
        newFrames.splice(state.currFrame, 1)[0]
      );
      setLocalStorageData({
        frames: newFrames, currFrame: state.currFrame + 1
      })
      return { frames: newFrames, currFrame: state.currFrame + 1 };
    }
    case "NEW_PROJECT_FRAME": {
      setLocalStorageData({
        frames: [{ grid: tempGrid, image: getBlankCanvasImage(tempGrid) }],
        currFrame: 0,
      })
      return {
        frames: [{ grid: tempGrid, image: getBlankCanvasImage(tempGrid) }],
        currFrame: 0,
      }
    }
    default:
      return state;
  }
};
