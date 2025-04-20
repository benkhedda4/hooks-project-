import React, { useState } from 'react';
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from 'react-icons/fa';

const choices = [
  { name: "Rock", icon: <FaRegHandRock size={40} /> },
  { name: "Paper", icon: <FaRegHandPaper size={40} /> },
  { name: "Scissors", icon: <FaRegHandScissors size={40} /> },
];

const getIcon = (name) => {
  const found = choices.find(c => c.name === name);
  return found?.icon || null;
};

const App = () => {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

 

  const generateComputerChoice = () => {
    const random = Math.floor(Math.random() * 3);
    return choices[random].name;
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "Draw!";
    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setUserScore(prev => prev + 1);
      return "You Win!";
    } else {
      setComputerScore(prev => prev + 1);
      return "You Lose!";
    }
  };

  const handleChoice = (choice) => {
    const compChoice = generateComputerChoice();
    setUserChoice(choice);
    setComputerChoice(compChoice);
    const result = determineWinner(choice, compChoice);
    setResult(result);
    playSound(result);
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setUserScore(0);
    setComputerScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">✊✋✌️ Rock Paper Scissors</h1>

      <div className="flex gap-6 mb-4">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className="text-4xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            onClick={() => handleChoice(choice.name)}
          >
            {choice.icon}
          </button>
        ))}
      </div>

      <div className="text-lg mt-4 text-center">
        {userChoice && <p><strong>You:</strong> {getIcon(userChoice)}</p>}
        {computerChoice && <p><strong>Computer:</strong> {getIcon(computerChoice)}</p>}
        {result && <p className="mt-2 text-2xl font-semibold">Result: {result}</p>}
      </div>

      <div className="flex gap-8 text-xl font-semibold mt-6">
        <p>👤 You: {userScore}</p>
        <p>💻 Computer: {computerScore}</p>
      </div>

      <button
        className="mt-6 bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded"
        onClick={resetGame}
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

export default App;