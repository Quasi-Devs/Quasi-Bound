import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';

const socket = io();
const GameEnv = ({ setNav }) => {
  const [yourSlots, setYourSlots] = useState([false, false, false, false]);
  const [enemySlots, setEnemySlots] = useState([false, false, false, false]);
  const [user, setUser] = useState();
  // console.info('ENEMY', enemySlots);
  if (user) {
    socket.on(`${user.id}`, (array) => {
      setEnemySlots(array);
    });
  }
  useEffect(() => setNav(false), []);
  useEffect(() => axios.get('/data/user').then(({ data }) => setUser(data)), []);
  return (
    <div>
      <ThreeDEnv slots={[...yourSlots, ...enemySlots]} user={user} />
      <TwoDEnv slots={yourSlots} setSlots={setYourSlots} exampleData={exampleData} user={user} />
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.element.isRequired,
};

export default GameEnv;
