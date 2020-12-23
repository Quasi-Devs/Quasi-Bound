import React, { useState } from 'react';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';

const GameEnv = () => {
  const [slots, setSlots] = useState([true, true, true, true]);
  return (
    <div>
      <ThreeDEnv slots={slots} />
      <TwoDEnv slots={slots} setSlots={setSlots} />
    </div>
  );
};

export default GameEnv;
