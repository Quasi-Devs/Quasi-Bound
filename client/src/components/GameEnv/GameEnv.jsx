import React, { useState } from 'react';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';

const GameEnv = () => {
  const [yourSlots, setYourSlots] = useState([false, false, false, false]);
  const [enemySlots] = useState([false, false, false, false]);
  return (
    <div>
      <ThreeDEnv slots={[...yourSlots, ...enemySlots]} />
      <TwoDEnv slots={yourSlots} setSlots={setYourSlots} exampleData={exampleData} />
    </div>
  );
};

export default GameEnv;
