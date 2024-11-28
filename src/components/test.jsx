import { useEffect, useReducer } from "react";
import { initialState, typingTestReducer } from "../store/reducer";

const generateWords = (count) => {
  const words = [
    "example",
    "random",
    "typing",
    "test",
    "javascript",
    "react",
    "component",
    "state",
    "effect",
    "hook",
  ];
  let sentence = [];
  for (let i = 0; i < count; i++) {
    sentence.push(words[Math.floor(Math.random() * words.length)]);
  }
  return sentence.join(" ");
};

const Test = () => {
  const [state, dispatch] = useReducer(typingTestReducer, initialState);

  // TIME FUNCTIONALITY
  // useEffect(() => {
  //   let interval = null;
  //   if (state.isActive && state.timer > 0) {
  //     interval = setInterval(() => {
  //       dispatch({ type: "TICK" });
  //     }, 1000);
  //   } else if (state.timer === 0) {
  //     dispatch({ type: "STOP_TEST" });
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [state.isActive, state.timer]);

  const handleKeyPress = (e) => {
    if (!state.isActive) {
      dispatch({ type: "START_TEST", payload: generateWords(20) });
    }

      if (state.isActive || !state.isActive) {
        if (e.key === "Backspace") {
          dispatch({
            type: "SET_TYPED_WORD",
            payload: state.typedWord.slice(0, -1),
          });
        } else if (e.key === " ") {
          const typedWord = state.typedWord + e.key;
          const word = state.word;
          if (typedWord === word.substring(0, typedWord.length)) {
            if (typedWord === word) {
              dispatch({ type: "GENERATE_TEXT", payload: generateWords(20) });
            }
          }
          dispatch({ type: "SET_TYPED_WORD", payload: typedWord });
        } else if (/^[a-zA-Z]$/.test(e.key)) {
          dispatch({
            type: "SET_TYPED_WORD",
            payload: state.typedWord + e.key,
          });
        }
      }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [state.typedWord, state.isActive]);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Typing Test</h1>
      <div className="mb-4">
        {/* <h2 className="text-xl">Time: {state.timer}s</h2> */}
        <h2 className="text-xl">
          Paragraph:
          {Array.from(state.word).map((char, index) => (
            <span
              key={index}
              className={
                state.typedWord[index] === char ? "text-black" : "text-gray-400"
              }
            >
              {char}
            </span>
          ))}
        </h2>
        <h2 className="text-xl mt-2">
          Typed Word:
          {Array.from(state.typedWord).map((char, index) => (
            <span
              key={index}
              className={
                state.word[index] === char ? "text-black" : "text-red-500"
              }
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default Test;
