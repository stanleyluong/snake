import { useCallback, useEffect, useState } from 'react';
import './App.css';
import AboutModal from './components/AboutModal.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameInfo from './components/GameInfo.jsx';
import TouchControls from './components/TouchControls.jsx';
import { checkCollision, generateFood, getInitialSnake } from './utils/gameUtils.js';

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
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

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

  const handleDirectionChange = (newDirection) => {
    if (!isPlaying) return; // Only change direction if playing

    // Prevent immediate 180-degree turns
    if (newDirection === 'UP' && direction === 'DOWN') return;
    if (newDirection === 'DOWN' && direction === 'UP') return;
    if (newDirection === 'LEFT' && direction === 'RIGHT') return;
    if (newDirection === 'RIGHT' && direction === 'LEFT') return;

    setDirection(newDirection);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return;

      // Prevent default scroll behavior for arrow keys used in game
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      let newDirection = null;
      switch (e.key) {
        case 'ArrowUp': newDirection = 'UP'; break;
        case 'ArrowDown': newDirection = 'DOWN'; break;
        case 'ArrowLeft': newDirection = 'LEFT'; break;
        case 'ArrowRight': newDirection = 'RIGHT'; break;
        default: return; // Exit if not an arrow key
      }
      handleDirectionChange(newDirection);
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, direction, handleDirectionChange]);

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

  const toggleAboutModal = () => {
    setIsAboutModalOpen(!isAboutModalOpen);
    if (!isAboutModalOpen && isPlaying) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="game-container">
      <header className="page-header">
        <h1>Snake</h1>
        <img src="/icons8-snake-94.png" alt="Snake Icon" />
      </header>
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
      <TouchControls onDirectionChange={handleDirectionChange} />
      <button className="about-button" onClick={toggleAboutModal}>About</button>
      <AboutModal isOpen={isAboutModalOpen} onClose={toggleAboutModal} />
    </div>
  );
}

export default App; 