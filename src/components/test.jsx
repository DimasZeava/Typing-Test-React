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

  useEffect(() => {
    dispatch({ type: "START_TEST", payload: generateWords(20) });
  }, []);

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
    if (state.isActive || !state.isActive) {
      const typedWord = state.typedWord.trim();
      const currentWord = state.word.split(' ')[state.currentWordIndex];
      const isValid = typedWord === currentWord;
      if (e.key === "Backspace") {
        dispatch({
          type: "SET_TYPED_WORD",
          payload: state.typedWord.slice(0, -1),
        });
      } else if (e.key === " ") {
        e.preventDefault();
        console.log(state.currentWordIndex);
        dispatch({ type: "VALIDATE_WORD" });
         dispatch({
        type: 'UPDATE_HISTORY',
        payload: { typedWord, isValid }
      });
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
  }, [state.typedWord]);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Typing Test</h1>
      <div className="mb-4">
        {/* <h2 className="text-xl">Time: {state.timer}s</h2> */}
        <h2 className="text-xl">
    Paragraph:
    {state.word.split(" ").map((word, wordIndex) => {
      const isCurrentWord = wordIndex === state.currentWordIndex;
      const displayWord = isCurrentWord
      ? Array.from(word).map((char, charIndex) => {
          const userChar = state.typedWord[charIndex] || "";
          return {
            char: userChar || char,
            isCorrect: userChar === char,
            isTouched: userChar !== "",
          };
        })
      : Array.from(word).map((char) => ({
          char,
          isCorrect: true,
          isTouched: false,
        }));

    return (
      <span key={wordIndex}>
        {displayWord.map((item, charIndex) => (
          <span
            key={charIndex}
            className={
              item.isTouched
                ? item.isCorrect
                  ? "text-black"
                  : "text-red-500"
                : "text-gray-400"
            }
          >
            {item.char}
          </span>
        ))}
        {" "}
      </span>
    );
  })}
</h2>
      </div>
    </div>
  );
};

export default Test;
