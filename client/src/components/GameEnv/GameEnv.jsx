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
  const [HP, setHP] = useState(250);
  const [enemyHP, setEnemyHP] = useState(250);

  socket.once(`${user.id}Turn`, () => {
    console.info('HIT');
    setHandleEnd(true);
    setTurn(true);
  });

  socket.on(`${user.id}`, (array, card) => {
    // console.info('HIT');
    setEnemySlots(array);
    setYourSlots(card);
  });

  // handels end of turn calulations
  if (handleEnd && turn) {
    yourSlots.map((val, i) => {
      if (val) {
        if (enemySlots[i]) {
          if (val.point_attack) {
            enemySlots[i].point_health -= val.point_attack;
          }
        } else {
          setEnemyHP(enemyHP - val.point_attack);
        }
      }
      if (!val.point_health) {
        yourSlots[i] = false;
      }
      return null;
    });
    enemySlots.map((val, i) => {
      if (val) {
        if (yourSlots[i]) {
          yourSlots[i].point_health -= val.point_attack;
        } else {
          setHP(HP - val.point_attack);
        }
      }
      if (!val.point_health) {
        enemySlots[i] = false;
      }
      return null;
    });
    setEnemySlots([...enemySlots]);
    setYourSlots([...yourSlots]);
    setHandleEnd(false);
  }

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
        enemySlots={enemySlots}
      />
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.element.isRequired,
};

export default GameEnv;
