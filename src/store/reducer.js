const initialState = {
  timer: 60,
  word: "",
  typedWord: "",
  isActive: false,
};

const typingTestReducer = (state, action) => {
  switch (action.type) {
    case "START_TEST":
      return {
        ...state,
        isActive: true,
        timer: state.isActive ? state.timer : 60, // Keep the timer if already active
        word: action.payload,
        typedWord: '',
      };
      case "GENERATE_TEXT":
        return{
          ...state,
          word: action.payload,
          typedWord: "",
        }
    case "TICK":
      return {
        ...state,
        timer: state.timer - 1,
      };
    case "SET_TYPED_WORD":
      return {
        ...state,
        typedWord: action.payload,
      };
    case "SET_WORD":
      return {
        ...state,
        word: action.payload,
      };
    case "STOP_TEST":
      return {
        ...state,
        isActive: false,
      };
    default:
      return state;
  }
};

export { initialState, typingTestReducer };
