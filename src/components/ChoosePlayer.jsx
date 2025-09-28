import React, { useState } from 'react';

const ChoosePlayer = ({ onSelectPlayer }) => {
  const [selected, setSelected] = useState('X');

  return (
    <div className="choose-player">
      <h2>Pick your side</h2>
      <div className="player-selection">
        <div
          className={`player ${selected === 'X' ? 'selected' : ''}`}
          onClick={() => setSelected('X')}
        >
          X
        </div>
        <div
          className={`player ${selected === 'O' ? 'selected' : ''}`}
          onClick={() => setSelected('O')}
        >
          O
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => onSelectPlayer(selected)}>
        Continue
      </button>
    </div>
  );
};

export default ChoosePlayer;
