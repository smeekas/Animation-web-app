const initialState = {
  canvasRef: null,
  color: "black",
  flood: false,
  eraser: false,
  image: null,
  grid: null,
  line: false,
  pencil: true,
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
      return {
        ...state,
        flood: action.value,
        eraser: false,
        line: false,
        pencil: false,
      };
    }
    case "ERASER": {
      return {
        ...state,
        eraser: action.value,
        flood: false,
        line: false,
        pencil: false,
      };
    }
    case "IMAGE": {
      return { ...state, image: action.value };
    }
    case "GRID": {
      return { ...state, grid: action.grid };
    }
    case "LINE": {
      return {
        ...state,
        line: action.value,
        flood: false,
        eraser: false,
        pencil: false,
      };
    }
    case "PENCIL": {
      return {
        ...state,
        pencil: action.value,
        line: false,
        flood: false,
        eraser: false,
      };
    }
    default:
      return state;
  }
};
