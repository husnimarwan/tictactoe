import React from 'react';

const Home = ({ onSelectMode }) => {
  return (
    <div className="home">
      <h1>XO</h1>
      <h2>Choose your play mode</h2>
      <div className="btn-container">
        <button className="btn btn-primary" onClick={() => onSelectMode('ai')}>
          With AI
        </button>
        <button className="btn btn-secondary" onClick={() => onSelectMode('friend')}>
          With a friend
        </button>
      </div>
    </div>
  );
};

export default Home;
