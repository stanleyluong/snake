import React from 'react';

function TouchControls({ onDirectionChange }) {
  const handleTouch = (direction) => {
    // Basic haptic feedback if supported (optional, but nice for touch)
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibrate for 50ms
    }
    onDirectionChange(direction);
  };

  return (
    <div className="touch-controls-container">
      <div className="touch-row">
        <button className="touch-button wide" onClick={() => handleTouch('UP')}>↑</button>
      </div>
      <div className="touch-row">
        <button className="touch-button" onClick={() => handleTouch('LEFT')}>←</button>
        <button className="touch-button" onClick={() => handleTouch('DOWN')}>↓</button>
        <button className="touch-button" onClick={() => handleTouch('RIGHT')}>→</button>
      </div>
    </div>
  );
}

export default TouchControls; 