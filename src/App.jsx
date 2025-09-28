import { useState, useEffect } from 'react';
import Home from './components/Home';
import ChoosePlayer from './components/ChoosePlayer';
import GameBoard, { calculateWinner } from './components/GameBoard';

export default function Game() {
  const [mode, setMode] = useState(null);
  const [player, setPlayer] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    if (winner) {
      setScore(prevScore => ({ ...prevScore, [winner]: prevScore[winner] + 1 }));
    }
  }, [currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleModeSelect(selectedMode) {
    setMode(selectedMode);
  }

  function handlePlayerSelect(selectedPlayer) {
    setPlayer(selectedPlayer);
  }

  useEffect(() => {
    if (mode === 'ai' && !xIsNext && !calculateWinner(currentSquares)) {
      const emptySquares = currentSquares
        .map((square, index) => (square === null ? index : null))
        .filter(val => val !== null);
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const aiMove = emptySquares[randomIndex];
      const nextSquares = currentSquares.slice();
      nextSquares[aiMove] = 'O';
      handlePlay(nextSquares);
    }
  }, [mode, xIsNext, currentSquares]);

  if (!mode) {
    return <Home onSelectMode={handleModeSelect} />;
  }

  if (!player) {
    return <ChoosePlayer onSelectPlayer={handlePlayerSelect} />;
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="game">
      <GameBoard
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        score={score}
        onReset={handleReset}
      />
    </div>
  );
}
