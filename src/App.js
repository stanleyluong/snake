import React, { useCallback, useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import { checkCollision, generateFood, getInitialSnake } from './utils/gameUtils';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

function App() {
  const [snake, setSnake] = useState(getInitialSnake());
  const [food, setFood] = useState(generateFood(GRID_SIZE, snake));
  const [direction, setDirection] = useState('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      // Check for collisions
      if (checkCollision(head, GRID_SIZE, newSnake)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood(GRID_SIZE, newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPlaying, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  useEffect(() => {
    let gameInterval;
    if (isPlaying && !gameOver) {
      gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    }
    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, moveSnake]);

  const startGame = () => {
    setSnake(getInitialSnake());
    setFood(generateFood(GRID_SIZE, getInitialSnake()));
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className="game-container">
      <GameBoard
        snake={snake}
        food={food}
        gridSize={GRID_SIZE}
        cellSize={CELL_SIZE}
      />
      <GameInfo
        score={score}
        isPlaying={isPlaying}
        gameOver={gameOver}
        onStart={startGame}
        onPause={pauseGame}
      />
    </div>
  );
}

export default App;
