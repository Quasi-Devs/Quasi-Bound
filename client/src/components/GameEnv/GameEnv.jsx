import React from 'react';
import ThreeDEnv from './3DEnv/3DEnv';

const GameEnv = () => {
  const text = 'game environment';
  return (
    <div>
      <h1>{text}</h1>
      <ThreeDEnv />
    </div>
  );
};

export default GameEnv;
