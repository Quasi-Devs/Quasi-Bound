import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';

const GameEnv = ({ setNav }) => {
  const [yourSlots, setYourSlots] = useState([false, false, false, false]);
  const [enemySlots] = useState([false, false, false, false]);
  useEffect(() => setNav(false), []);
  return (
    <div>
      <ThreeDEnv slots={[...yourSlots, ...enemySlots]} />
      <TwoDEnv slots={yourSlots} setSlots={setYourSlots} exampleData={exampleData} />
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.element.isRequired,
};

export default GameEnv;
