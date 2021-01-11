import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';
import _ from 'underscore';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';
import botData from '../../../bot';

const socket = io('https://vertical-dryad-300701.uc.r.appspot.com', {
  transports: ['websocket'],
});

const GameEnv = ({
  setNav,
}) => {
  const [yourSlots, setYourSlots] = useState([false, false, false, false]);
  const [enemySlots, setEnemySlots] = useState([false, false, false, false]);
  const [user, setUser] = useState(false);
  const [turn, setTurn] = useState(false);
  const [deck, setDeck] = useState(false);
  const [botDeck, setBotDeck] = useState(_.shuffle(botData));
  const [handleEnd, setHandleEnd] = useState(false);
  const [HP, setHP] = useState(250);
  const [enemyHP, setEnemyHP] = useState(250);
  const [done, setDone] = useState(false);

  socket.on(`${user.id}Turn`, () => {
    setHandleEnd(true);
    setTurn(true);
  });
  socket.on(`${user.id}hp`, (hp, hp2) => {
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

  if ((HP <= 0 || enemyHP <= 0) && !done) {
    if (enemyHP <= 0 && HP <= 0) {
      if (user.id_enemy) {
        axios.get(`data/wins/${user.id}/${user.total_win + 0.5}`);
        axios.get(`/data/elo/${user.id}/${user.count_rating + 5}`);
      } else {
        axios.get(`data/wins/${user.id}/${user.total_win + 0.5}`);
      }
    } else if (enemyHP <= 0) {
      if (user.id_enemy) {
        axios.get(`data/wins/${user.id}/${user.total_win + 1}`);
        axios.get(`/data/elo/${user.id}/${user.count_rating + 10}`);
      } else {
        axios.get(`data/wins/${user.id}/${user.total_win + 1}`);
      }
    } else if (HP <= 0 && user.id_enemy) {
      axios.get(`/data/elo/${user.id}/${user.count_rating - 10}`);
    }
    axios.get(`data/games/${user.id}/${user.total_games + 1}`);
    setDone(true);
    socket.emit('HP', user.id_enemy, enemyHP, HP);
  }

  useEffect(() => {
    if (user) {
      axios.get(`/data/deckCards/${user.default_deck}`)
        .then(({ data }) => {
          if (data.length !== 0) {
            setDeck(_.shuffle(data));
          } else {
            setDeck(_.shuffle(exampleData));
          }
        }).catch((err) => console.warn(err));
    }
  }, [user]);

  useEffect(() => setNav(false), []);
  useEffect(() => axios.get('/data/user').then(({ data }) => {
    setUser(data);
    if (data.id_enemy === null) {
      setTurn(true);
    } else {
      setTurn(data.id > data.id_enemy);
    }
  }), []);
  useEffect(() => {
    if (user) {
      if (handleEnd && turn) {
        let hp = enemyHP;
        yourSlots.map((val, i) => {
          if (val && val.turn === 0) {
            if (enemySlots[i]) {
              if (val.point_attack && enemySlots[i].point_armor < val.point_attack) {
                enemySlots[i].point_health -= (val.point_attack - enemySlots[i].point_armor);
              }
            } else if (val.point_attack) {
              let counter = true;
              for (let j = 0; j <= 3; j += 1) {
                if (enemySlots[j]) {
                  if (enemySlots[j].description.includes('Provoke') && enemySlots[j].point_health > 0) {
                    if (enemySlots[j].point_armor < val.point_attack) {
                      enemySlots[j].point_health -= (val.point_attack - enemySlots[j].point_armor);
                    }
                    counter = false;
                    break;
                  }
                }
              }
              if (counter) {
                hp -= val.point_attack;
              }
            }
          } else if (val) {
            yourSlots[i].turn = 0;
          }
          return null;
        });
        socket.emit('HP', user.id_enemy, hp, null);
        setEnemyHP(hp);
        hp = HP;
        enemySlots.map((val, i) => {
          if (val && val.turn === 0) {
            if (yourSlots[i]) {
              if (val.point_attack && yourSlots[i].point_armor < val.point_attack) {
                yourSlots[i].point_health -= (val.point_attack - yourSlots[i].point_armor);
              }
            } else if (val.point_attack) {
              let counter = true;
              for (let j = 0; j <= 3; j += 1) {
                if (yourSlots[j]) {
                  if (yourSlots[j].description.includes('Provoke') && yourSlots[j].point_health > 0) {
                    if (yourSlots[j].point_armor < val.point_attack) {
                      yourSlots[j].point_health -= (val.point_attack - yourSlots[j].point_armor);
                    }
                    counter = false;
                    break;
                  }
                }
              }
              if (counter) {
                hp -= val.point_attack;
              }
            }
          } else if (val) {
            enemySlots[i].turn = 0;
          }
          if (!val.point_health || val.point_health <= 0) {
            enemySlots[i] = false;
          }
          if (!yourSlots[i].point_health || yourSlots[i].point_health <= 0) {
            yourSlots[i] = false;
          }
          return null;
        });
        socket.emit('placed', user.id_enemy, [...yourSlots], [...enemySlots]);
        socket.emit('HP', user.id_enemy, null, hp);
        setHP(hp);
        setEnemySlots([...enemySlots]);
        setYourSlots([...yourSlots]);
        setHandleEnd(false);
      }
    }
  }, [turn]);

  return (
    <div>
      {(user, deck) ? (
        <div>
          <ThreeDEnv
            slots={[...yourSlots, ...enemySlots]}
            user={user}
            HP={HP}
            enemyHP={enemyHP}
            done={done}
          />
          {!done ? (
            <TwoDEnv
              slots={yourSlots}
              setSlots={setYourSlots}
              deck={deck}
              setDeck={setDeck}
              user={user}
              setTurn={setTurn}
              turn={turn}
              setHandleEnd={setHandleEnd}
              enemySlots={enemySlots}
              setEnemySlots={setEnemySlots}
              botDeck={botDeck}
              setBotDeck={setBotDeck}
              enemyHP={enemyHP}
              setEnemyHP={setEnemyHP}
              HP={HP}
              setHP={setHP}
            />
          ) : <a href="/home"><button type="submit">Return To Menu</button></a>}
        </div>
      ) : <h1>loading in ...</h1>}
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.func.isRequired,
};
export default GameEnv;
