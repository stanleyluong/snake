import React from 'react';

function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const techStack = [
    'React (v18.2.0) - For building the user interface',
    'Vite (v5.x) - As the build tool and development server',
    'JavaScript (ES6+) - Core programming language',
    'HTML5 - For structuring the web page',
    'CSS3 - For styling the application',
    'esbuild - Used by Vite for fast JavaScript bundling',
    'gh-pages - For deploying the game to GitHub Pages'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>About Snake Game</h2>
        <p>This classic Snake game is built with a modern web development stack:</p>
        <ul>
          {techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AboutModal; 