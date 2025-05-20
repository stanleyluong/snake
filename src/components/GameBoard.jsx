import React from 'react';

function GameBoard({ snake, food, gridSize, cellSize }) {
  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
    gap: '1px',
    backgroundColor: '#333',
    padding: '1px',
  };

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    backgroundColor: '#1a1a1a',
  };

  const snakeCellStyle = {
    ...cellStyle,
    backgroundColor: '#4CAF50',
    borderRadius: '2px',
  };

  const foodCellStyle = {
    ...cellStyle,
    backgroundColor: '#f44336',
    borderRadius: '50%',
  };

  const renderCells = () => {
    const cells = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            style={isSnake ? snakeCellStyle : isFood ? foodCellStyle : cellStyle}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="game-board" style={boardStyle}>
      {renderCells()}
    </div>
  );
}

export default GameBoard; 