import { useState, useEffect } from 'react'

function App() {
  const words = ['example', 'random', 'typing', 'test', 'javascript', 'react', 'component', 'state', 'effect', 'hook']
  const [timer, setTimer] = useState(60)
  const [word, setWord] = useState('')
  const [typedWord, setTypedWord] = useState('')
  const [activeWord, setActiveWord] = useState('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsActive(false)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, timer])

  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }

  const handleChange = (e) => {
    setTypedWord(e.target.value)
    if (e.target.value === word) {
      setActiveWord(word)
      setWord(getRandomWord())
      setTypedWord('')
    }
  }

  const startTest = () => {
    setIsActive(true)
    setTimer(60)
    setWord(getRandomWord())
    setTypedWord('')
    setActiveWord('')
  }

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Typing Test</h1>
      <div className="mb-4">
        <button onClick={startTest} className="bg-blue-500 text-white px-4 py-2 rounded">Start Test</button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl">Time: {timer}s</h2>
        <h2 className="text-xl">Word: 
          {word.split('').map((char, index) => (
            <span key={index} className={typedWord[index] === char ? 'text-black' : 'text-gray-400'}>
              {char}
            </span>
          ))}
        </h2>
        <input 
          type="text" 
          value={typedWord} 
          onChange={handleChange} 
          disabled={!isActive} 
          className={`border p-2 rounded ${typedWord === word ? 'border-green-500' : 'border-gray-300'}`} 
        />
        <h2 className={`text-xl mt-2 ${activeWord ? 'text-green-500' : 'text-red-500'}`}>Typed Word: {activeWord}</h2>
      </div>
    </div>
  )
}

export default App