import React, { useState } from 'react';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';

// console.log(exampleData);
const GameEnv = () => {
  const [slots, setSlots] = useState([true, true, true, true]);
  return (
    <div>
      <ThreeDEnv slots={slots} />
      <TwoDEnv slots={slots} setSlots={setSlots} exampleData={exampleData} />
    </div>
  );
};

export default GameEnv;
