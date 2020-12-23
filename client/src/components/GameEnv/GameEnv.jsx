import React, { useState } from 'react';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';

const GameEnv = () => {
  const [slots, setSlots] = useState([false, false, false, false]);
  return (
    <div>
      <ThreeDEnv slots={setSlots} />
      <TwoDEnv slots={slots} setSlots={setSlots} />
    </div>
  );
};

export default GameEnv;
