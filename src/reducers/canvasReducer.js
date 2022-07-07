const initialState = {
  canvasRef: null,
  color: { primary: "#000000", secondary: "#ffffff", current: "black" },
  flood: false,
  eraser: false,
  image: null,
  grid: null,
  line: false,
  pencil: true,
  ellipse: false,
  move: false,
};
export const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CANVAS_INIT":
      return {
        ...state,
        canvasRef: action.canvasRef,
      };
    case "COLOR": {
      return {
        ...state,
        color: { ...state.color, [action.color]: action.colorVal },
      };
    }
    case "TOGGLE_COLOR": {
      const temp = state.color.primary;
      const color = { primary: state.color.secondary, secondary: temp };
      return { ...state, color: color };
    }
    case "SET_CURR_COLOR_PRIMARY": {
      return {
        ...state,
        color: { ...state.color, current: state.color.primary },
      };
    }
    case "SET_CURR_COLOR_SECONDARY": {
      return {
        ...state,
        color: { ...state.color, current: state.color.secondary },
      };
    }
    case "FLOODFILL": {
      return {
        ...state,
        flood: action.value,
        eraser: false,
        line: false,
        pencil: false,
        ellipse: false,
        move: false,
      };
    }
    case "ERASER": {
      return {
        ...state,
        eraser: action.value,
        flood: false,
        line: false,
        pencil: false,
        ellipse: false,
        move: false,
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
        ellipse: false,
        move: false,
      };
    }
    case "PENCIL": {
      return {
        ...state,
        pencil: action.value,
        line: false,
        flood: false,
        eraser: false,
        ellipse: false,
        move: false,
      };
    }
    case "ELLIPSE": {
      return {
        ...state,
        ellipse: true,
        pencil: false,
        line: false,
        flood: false,
        eraser: false,
        move: false,
      };
    }
    case "MOVE": {
      return {
        ...state,
        move: true,
        ellipse: false,
        pencil: false,
        line: false,
        flood: false,
        eraser: false,
      };
    }
    default:
      return state;
  }
};
