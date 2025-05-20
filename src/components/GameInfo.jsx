import React from 'react';

function GameInfo({ score, isPlaying, gameOver, onStart, onPause }) {
  return (
    <div className="game-info">
      <div className="score">Score: {score}</div>
      <div className="controls">
        {!isPlaying && !gameOver && (
          <button onClick={onStart}>Start Game</button>
        )}
        {isPlaying && (
          <button onClick={onPause}>Pause</button>
        )}
        {gameOver && (
          <button onClick={onStart}>Play Again</button>
        )}
      </div>
      {gameOver && (
        <div className="game-over">Game Over!</div>
      )}
    </div>
  );
}

export default GameInfo; 