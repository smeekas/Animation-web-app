const initialState = {
  canvasRef: null,
  color: "black",
  flood: false,
  eraser: false,
  image: null,
  grid: null,
};
export const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CANVAS_INIT":
      return {
        ...state,
        canvasRef: action.canvasRef,
      };
    case "COLOR": {
      return { ...state, color: action.value };
    }
    case "FLOODFILL": {
      return { ...state, flood: action.value };
    }
    case "ERASER": {
      return { ...state, eraser: action.value };
    }
    case "IMAGE": {
      return { ...state, image: action.value };
    }
    case "GRID": {
      return { ...state, grid: action.grid };
    }
    default:
      return state;
  }
};
