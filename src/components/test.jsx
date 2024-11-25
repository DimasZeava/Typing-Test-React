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

  // Mulai tes dan generate kata-kata saat komponen dimuat
  useEffect(() => {
    dispatch({ type: "START_TEST", payload: generateWords(20) });
  }, []); // [] memastikan hanya berjalan sekali saat komponen dimuat

  // Hitung mundur timer
  useEffect(() => {
    let interval = null;
    if (state.isActive && state.timer > 0) {
      interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    } else if (state.timer === 0) {
      dispatch({ type: "STOP_TEST" });
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state.isActive, state.timer]);

  // Handle input pengguna
  const handleKeyPress = (e) => {
    if (!state.isActive) {
      if (/^[a-zA-Z]$/.test(e.key)) {
        dispatch({ type: "START_TEST", payload: generateWords(20) });
      }
    } else {
      if (e.key === " ") {
        if (state.typedWord.trim() === state.word.split(" ")[0]) {
          const remainingWords = state.word.split(" ").slice(1).join(" ");
          dispatch({ type: "SET_WORD", payload: remainingWords });
        }
        dispatch({ type: "SET_TYPED_WORD", payload: "" });
      } else if (e.key === "Backspace") {
        dispatch({
          type: "SET_TYPED_WORD",
          payload: state.typedWord.slice(0, -1),
        });
      } else if (e.key.length === 1) {
        dispatch({
          type: "SET_TYPED_WORD",
          payload: state.typedWord + e.key,
        });
      }
    }
  };

  // Tambahkan event listener untuk keydown
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
        <h2 className="text-xl">Time: {state.timer}s</h2>
        <h2 className="text-xl">
          Paragraph:
          {state.word.split("").map((char, index) => (
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
          {state.typedWord.split("").map((char, index) => (
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
