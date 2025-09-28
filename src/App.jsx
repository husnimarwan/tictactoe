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
    if (selectedPlayer === 'O' && mode === 'ai') {
      const nextSquares = Array(9).fill(null);
      nextSquares[4] = 'X'; // AI makes the first move in the center
      handlePlay(nextSquares);
    }
  }

  useEffect(() => {
    if (mode === 'ai' && !calculateWinner(currentSquares)) {
      const isAiTurn = (player === 'X' && !xIsNext) || (player === 'O' && xIsNext);
      if (isAiTurn) {
        const aiSymbol = player === 'X' ? 'O' : 'X';
        const emptySquares = currentSquares
          .map((square, index) => (square === null ? index : null))
          .filter(val => val !== null);
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const aiMove = emptySquares[randomIndex];
        if (aiMove !== undefined) {
          const nextSquares = currentSquares.slice();
          nextSquares[aiMove] = aiSymbol;
          handlePlay(nextSquares);
        }
      }
    }
  }, [mode, xIsNext, currentSquares, player]);

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

  function goToHome() {
    setMode(null);
    setPlayer(null);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScore({ X: 0, O: 0 });
  }

  return (
    <div className="game">
      <GameBoard
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        score={score}
        onReset={handleReset}
        onGoToHome={goToHome}
        mode={mode}
      />
    </div>
  );
}
