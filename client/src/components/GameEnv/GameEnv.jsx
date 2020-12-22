import React from 'react';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';

const GameEnv = () => {
  const text = 'game environment';
  return (
    <div>
      <h1>{text}</h1>
      <ThreeDEnv />
      <TwoDEnv />
    </div>
  );
};

export default GameEnv;
