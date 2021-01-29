import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';
import _ from 'underscore';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ThreeDEnv from './3DEnv/3DEnv';
import TwoDEnv from './2DEnv/2DEnv';
import exampleData from '../../../example';
import botData from '../../../bot';
import gif from '../../models/ezgif-4-462b92d9253b.gif';

const socket = io();

const useStyles = makeStyles({
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadImage: {
    filter: 'invert(100%)',
  },
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
  const [spellSlot, setSpellSlot] = useState(false);
  const [clicked, setClick] = useState(false);
  const [resource, setResource] = useState([
    true, false, false, false, false, false, false, false, false, false, false, false]);
  const [count, setCount] = useState(0);
  const [cardInHand, setCardInHand] = useState([]);
  const [botHand, setBotHand] = useState([botDeck[0],
    botDeck[1], botDeck[2], botDeck[3], botDeck[4]]);
  const [cardIndex, setCardIndex] = useState(0);
  const [resourceCount, setResourceCount] = useState(resource.join('').split('true').length - 1);
  const [taken, setTaken] = useState(0);
  const [botGo, setBotGo] = useState(false);
  const classes = useStyles();

  socket.on(`${user.id}Spell`, (spell) => {
    setSpellSlot(spell);
    setTimeout(() => {
      setSpellSlot(false);
    }, 3000);
  });

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
            const newDeck = _.shuffle(data);
            setCardInHand([newDeck[0], newDeck[1], newDeck[2], newDeck[3], newDeck[4]]);
            setDeck(newDeck);
          } else {
            const newDeck = _.shuffle(exampleData);
            setCardInHand([newDeck[0], newDeck[1], newDeck[2], newDeck[3], newDeck[4]]);
            setDeck(newDeck);
          }
        }).catch((err) => console.warn(err));
    }
  }, [user]);

  useEffect(() => setNav(false), []);
  useEffect(() => axios.get('/data/user')
    .then(({ data }) => {
      setUser(data);
      if (data.id_enemy === null) {
        setTurn(true);
      } else {
        setTurn(data.id > data.id_enemy);
      }
    }).catch((err) => console.warn(err)), []);

  useEffect(() => {
    if (user) {
      if (handleEnd && turn) {
        let hp = enemyHP;
        socket.emit('HP', user.id_enemy, hp, null);
        setEnemyHP(hp);
        hp = HP;
        enemySlots.map(async (val, i) => {
          if (val && val.turn === 0) {
            if (yourSlots[i]) {
              if (val.point_attack && yourSlots[i].point_armor < val.point_attack
                && val.point_health > 0) {
                yourSlots[i].point_health -= (val.point_attack - yourSlots[i].point_armor);
                enemySlots[i].point_health
                -= (yourSlots[i].point_attack - enemySlots[i].point_armor);
              }
            } else if (val.point_attack) {
              let counter = true;
              for (let j = 0; j <= 3; j += 1) {
                if (yourSlots[j]) {
                  if (yourSlots[j].description.includes('Provoke') && yourSlots[j].point_health > 0) {
                    if (yourSlots[j].point_armor < val.point_attack) {
                      yourSlots[j].point_health -= (val.point_attack - yourSlots[j].point_armor);
                    }
                    if (enemySlots[i].point_armor < yourSlots[j].point_attack) {
                      enemySlots[i].point_health
                      -= (yourSlots[j].point_attack - enemySlots[i].point_armor);
                    }
                    counter = false;
                    break;
                  }
                }
              }
              if (counter && val.point_health > 0) {
                hp -= val.point_attack;
              }
            }
          } else if (val) {
            enemySlots[i].turn = 0;
          }
          if (!val.point_health || val.point_health <= 0) {
            setEnemySlots([...enemySlots]);
            setTimeout(() => {
              enemySlots[i] = false;
            }, 1000);
          }
          if (!yourSlots[i].point_health || yourSlots[i].point_health <= 0) {
            setYourSlots([...yourSlots]);
            setTimeout(() => {
              yourSlots[i] = false;
            }, 1000);
          }
          return null;
        });
        socket.emit('placed', user.id_enemy, [...yourSlots], [...enemySlots]);
        socket.emit('HP', user.id_enemy, null, hp);
        setHP(hp);
        setTimeout(() => {
          setEnemySlots([...enemySlots]);
          setYourSlots([...yourSlots]);
          socket.emit('placed', user.id_enemy, [...yourSlots], [...enemySlots]);
        }, 2000);
        setHandleEnd(false);
      }
    }
  }, [turn]);

  return (
    <div>
      {(deck) ? (
        <div>
          <ThreeDEnv
            slots={[...yourSlots, ...enemySlots]}
            yourSlots={yourSlots}
            user={user}
            HP={HP}
            enemyHP={enemyHP}
            done={done}
            spellSlot={spellSlot}
            deck={deck}
            setTurn={setTurn}
            setCount={setCount}
            cardInHand={cardInHand}
            setBotGo={setBotGo}
            botGo={botGo}
            resource={resource}
            setResource={setResource}
            setResourceCount={setResourceCount}
            clicked={clicked}
            enemySlots={enemySlots}
            setEnemySlots={setEnemySlots}
            setEnemyHP={setEnemyHP}
            setSlots={setYourSlots}
            setCardInHand={setCardInHand}
            cardIndex={cardIndex}
            resourceCount={resourceCount}
            taken={taken}
            setClicked={setClick}
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
              clicked={clicked}
              resource={resource}
              setResource={setResource}
              setClick={setClick}
              count={count}
              setHP={setHP}
              setCount={setCount}
              cardInHand={cardInHand}
              setCardInHand={setCardInHand}
              botHand={botHand}
              setBotHand={setBotHand}
              cardIndex={cardIndex}
              setCardIndex={setCardIndex}
              resourceCount={resourceCount}
              setResourceCount={setResourceCount}
              taken={taken}
              botGo={botGo}
              setBotGo={setBotGo}
              setTaken={setTaken}
            />
          ) : (
            <a href="/home">
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Return To Menu
              </Button>
            </a>
          )}
        </div>
      ) : <div className={classes.loader}><img src={gif} alt="" width={window.innerWidth / 1.5} height={window.innerHeight} /></div>}
    </div>
  );
};
GameEnv.propTypes = {
  setNav: PropTypes.func.isRequired,
};
export default GameEnv;
