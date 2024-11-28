const initialState = {
  // timer: 60,
  word: "",
  typedWord: "",
  isActive: false,
  validatedWords: [],
  currentWordIndex: 0,
};

const typingTestReducer = (state, action) => {
  switch (action.type) {
    case "START_TEST":
      return {
        ...state,
        isActive: true,
        // timer: state.isActive ? state.timer : 60,
        word: action.payload,
        typedWord: "",
        validatedWords: [],
        currentWordIndex: 0,
      };
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
        typedWord: "",
      };
    case "VALIDATE_WORD" :
      const currentWord = state.word.split(' ')[state.currentWordIndex];
      const isValid = state.typedWord === currentWord;
      return {
        ...state, 
        validatedWords:[
          ...state.validatedWords,
          { word: state.typedWord, isValid: true },
        ],
        typedWord: "",
        currentWordIndex: state.currentWordIndex + 1,
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
