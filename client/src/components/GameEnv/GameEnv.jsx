import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';
import _ from 'underscore';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';

const socket = io.connect('https://vertical-dryad-300701.uc.r.appspot.com', {
   "transports": ['websocket']
});
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
    setHandleEnd(true);
    setTurn(true);
  });

  socket.once(`${user.id}hp`, (hp, hp2) => {
    if (hp !== null) {
      setHP(hp);
    }
    if (hp2 !== null) {
      setEnemyHP(hp2);
    }
  });

  socket.on(`${user.id}`, (array, card) => {
    setEnemySlots(array);
    setYourSlots(card);
  });

  useEffect(() => setNav(false), []);
  useEffect(() => axios.get('/data/user').then(({ data }) => {
    setUser(data);
    setTurn(data.id > data.id_enemy);
  }), []);

  useEffect(() => {
    if (handleEnd && turn) {
      yourSlots.map((val, i) => {
        if (val) {
          if (enemySlots[i]) {
            if (val.point_attack) {
              enemySlots[i].point_health -= val.point_attack;
            }
          } else if (val.point_attack) {
            socket.emit('HP', user.id_enemy, enemyHP - val.point_attack, null);
            setEnemyHP(enemyHP - val.point_attack);
          }
        }
        return null;
      });
      enemySlots.map((val, i) => {
        if (val) {
          if (yourSlots[i]) {
            if (val.point_attack) {
              yourSlots[i].point_health -= val.point_attack;
            }
          } else if (val.point_attack) {
            socket.emit('HP', user.id_enemy, null, HP - val.point_attack);
            setHP(HP - val.point_attack);
          }
        }
        if (!val.point_health || val.point_health <= 0) {
          enemySlots[i] = false;
        }
        if (!yourSlots[i].point_health || yourSlots[i].point_health <= 0) {
          yourSlots[i] = false;
        }
        return null;
      });
      console.info(enemyHP, HP);
      setEnemySlots([...enemySlots]);
      setYourSlots([...yourSlots]);
      setHandleEnd(false);
    }
  }, [turn]);

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
        enemyHP={enemyHP}
        HP={HP}
      />
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.element.isRequired,
};

export default GameEnv;
