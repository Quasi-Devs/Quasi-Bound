import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';
import _ from 'underscore';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';

const socket = io();
const GameEnv = ({ setNav }) => {
  const [yourSlots, setYourSlots] = useState([false, false, false, false]);
  const [enemySlots, setEnemySlots] = useState([false, false, false, false]);
  const [user, setUser] = useState({});
  const [turn, setTurn] = useState(false);
  const [deck, setDeck] = useState(_.shuffle(exampleData));
  const [handleEnd, setHandleEnd] = useState(false);
  const [HP] = useState(250);
  const [enemyHP] = useState(250);

  // working on removing 0HP cards not working
  if (handleEnd && turn) {
    yourSlots.map((val, i) => {
      if (val.point_health === 0) {
        yourSlots[i] = false;
      }
      return null;
    });
    enemySlots.map((val, i) => {
      if (val.point_health === 0) {
        enemySlots[i] = false;
      }
      return null;
    });
    setEnemySlots([...enemySlots]);
    setYourSlots([...yourSlots]);
    setHandleEnd(false);
  }

  socket.on(`${user.id}`, (array) => {
    setEnemySlots(array);
  });
  socket.on(`${user.id}Turn`, () => {
    setHandleEnd(true);
    setTurn(!turn);
  });
  useEffect(() => setNav(false), []);
  useEffect(() => axios.get('/data/user').then(({ data }) => {
    setUser(data);
    setTurn(data.id > data.id_enemy);
  }), []);

  return (
    <div>
      <ThreeDEnv slots={[...yourSlots, ...enemySlots]} user={user} HP={HP} enemyHP={enemyHP} />
      <TwoDEnv
        slots={yourSlots}
        setSlots={setYourSlots}
        deck={deck}
        setDeck={setDeck}
        user={user}
        setTurn={setTurn}
        turn={turn}
      />
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.element.isRequired,
};

export default GameEnv;
