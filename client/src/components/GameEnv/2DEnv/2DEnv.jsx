import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Card from '../../Card/Card';
import './2denv.css';
import EnemySlots from './enemySlots';

const socket = io();

const TwoDEnv = ({
  slots, setSlots, deck, user, setTurn, setDeck, turn, enemySlots, setHandleEnd, botDeck,
  setBotDeck, setEnemySlots, setHP, setEnemyHP, enemyHP,
}) => {
  const [resource, setResource] = useState([
    true, false, false, false, false, false, false, false, false, false, false, false]);
  const [count, setCount] = useState(0);
  const [cardInHand, setCardInHand] = useState([deck[0], deck[1], deck[2], deck[3], deck[4]]);
  const [botHand, setBotHand] = useState([botDeck[0],
    botDeck[1], botDeck[2], botDeck[3], botDeck[4]]);
  const [cardIndex, setCardIndex] = useState(0);
  const [clicked, setClick] = useState(false);
  const [resourceCount, setResourceCount] = useState(resource.join('').split('true').length - 1);
  const [taken, setTaken] = useState(0);
  const [botGo, setBotGo] = useState(false);

  const handleResource = (num, check) => {
    if (user) {
      if (check) {
        socket.emit('end', user.id_enemy);
        setTurn(false);
        setCount(num);
        if (!user.id_enemy) {
          setBotGo(!botGo);
        }
        deck.map(() => {
          if (cardInHand.length < 5) {
            cardInHand.push(deck.shift());
          }
          return false;
        });
      }
      resource.map((val, i) => {
        if (i <= num) {
          resource[i] = true;
        } else {
          resource[i] = false;
        }
        return false;
      });
      setResource([...resource]);
      setResourceCount(resource.join('').split('true').length - 1);
    }
  };

  const placeCard = (val, i) => {
    if (user) {
      if (clicked && !val) {
        const arr = slots;
        arr[i] = clicked;
        if (arr[i].description.includes('Charge')) {
          arr[i].turn = 0;
        } else {
          arr[i].turn = 1;
        }
        const number = clicked.description.match(/\d+/g);
        const currentEnemySlots = enemySlots;
        if (!clicked.is_character) {
          socket.emit('Spell', clicked, user.id_enemy);
          arr[i] = false;
        }
        if (clicked.description.includes('damage')) {
          if (currentEnemySlots[i]) {
            currentEnemySlots[i].point_health -= Number(number);
            if (currentEnemySlots[i].point_health <= 0) {
              setTimeout(() => {
                currentEnemySlots[i] = false;
                setEnemySlots([...currentEnemySlots]);
              }, 1000);
            }
          } else {
            socket.emit('HP', user.id_enemy, enemyHP - Number(number), null);
            setEnemyHP(enemyHP - Number(number));
          }
        }
        socket.emit('placed', user.id_enemy, [...arr], enemySlots);
        setEnemySlots([...currentEnemySlots]);
        setSlots([...arr]);
        setClick(false);
        cardInHand.splice(cardIndex, 1);
        setCardInHand(cardInHand);
        handleResource(resourceCount - taken - 1);
        if (clicked.description.includes('resource')) {
          handleResource(number - 1);
        }
      } else if (clicked) {
        // change to handle spell cards
        const currentEnemySlots = enemySlots;
        if (!clicked.is_character) {
          if (slots[i]) {
            const number = clicked.description.match(/\d+/g);
            const arr = slots;
            if (clicked.description.includes('Health')) {
              arr[i].point_health += Number(number);
            }
            if (clicked.description.includes('attack')) {
              arr[i].point_attack += Number(number);
            }
            if (clicked.description.includes('armor')) {
              arr[i].point_armor += Number(number);
            }
            if (clicked.description.includes('damage')) {
              if (currentEnemySlots[i]) {
                currentEnemySlots[i].point_health -= Number(number);
                if (currentEnemySlots[i].point_health <= 0) {
                  setTimeout(() => {
                    currentEnemySlots[i] = false;
                    setEnemySlots([...currentEnemySlots]);
                  }, 1000);
                }
              } else {
                socket.emit('HP', user.id_enemy, enemyHP - Number(number), null);
                setEnemyHP(enemyHP - Number(number));
              }
            }
            socket.emit('Spell', clicked, user.id_enemy);
            socket.emit('placed', user.id_enemy, [...arr], enemySlots);
            setSlots([...arr]);
            cardInHand.splice(cardIndex, 1);
            setCardInHand(cardInHand);
            setResourceCount(resourceCount - taken);
            handleResource(resourceCount - taken - 1);
            setClick(false);
          }
        }
      }
    }
  };
  // handle bot moves here
  useEffect(() => {
    setTimeout(() => {
      if (!turn && !user.id_enemy && user) {
        let enmeyResource = resourceCount;
        botDeck.map(() => {
          if (botHand.length < 5) {
            botHand.push(botDeck.shift());
          }
          return false;
        });
        const arr = enemySlots;
        enemySlots.map((val, i) => {
          for (let j = 0; j < botHand.length; j += 1) {
            if (!val && botHand[j].point_resource <= enmeyResource) {
              enmeyResource -= botHand[j].point_resource;
              arr[i] = { ...botHand[j] };
              if (arr[i].description.includes('Charge')) {
                arr[i].turn = 0;
              } else {
                arr[i].turn = 1;
              }
              botHand.splice(j, 1);
              setBotHand(botHand);
              break;
            }
          }
          return null;
        });
        setEnemySlots([...arr]);
        setTimeout(() => {
          setHandleEnd(true);
          setTurn(true);
        }, 1000);
      }
    }, 2000);
  }, [botGo]);

  useEffect(() => {
    deck.splice(0, 5);
    setDeck([...deck]);
    botDeck.splice(0, 5);
    setBotDeck([...botDeck]);
  }, []);

  return (
    <div className="twodenv">
      {(turn) ? (
        <div className="main">
          <div className="deck">{`DECK:  ${deck.length}CARDS`}</div>
          <div className="Resourceholder">
            <h2>Resource</h2>
            {resource.map((val, i) => <div key={`${String(i)}`} style={{ backgroundColor: val ? 'blue' : null }} className="ResourcePoints">{}</div>)}
          </div>
          <div className="placements">
            <div className="enemySlots">
              {enemySlots.map((val, i) => (
                <EnemySlots key={`${String(i)}`} val={val} />
              ))}
            </div>
            <div className="slots">
              {slots.map((val, i) => (
                <div
                  aria-hidden="true"
                  onClick={() => placeCard(val, i)}
                  className={val ? 'placed' : 'slot'}
                  key={`${String(i)}`}
                >
                  {}
                </div>
              ))}
            </div>
            <div className="discard">{clicked ? <div className="todo">Click square above to place card</div> : null}</div>
          </div>
          <div className="cards">
            {cardInHand.map((val, i) => <Card i={i} setCardIndex={setCardIndex} setTaken={setTaken} resourceCount={resourceCount} setClick={setClick} info={val} key={`${String(i)}`} />)}
          </div>
          <div className="buttonPos">
            <Button type="submit" block onClick={() => setHP(0)}>Surrender</Button>
            <Button type="submit" block onClick={() => handleResource(count + 1, true)}>End Turn</Button>
          </div>
        </div>
      ) : (
        <div>
          <h1>ENEMY TURN</h1>
          <Button type="submit" block onClick={() => setHP(0)}>Surrender</Button>
        </div>
      )}
    </div>
  );
};

TwoDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSlots: PropTypes.func.isRequired,
  deck: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    name_user: PropTypes.string,
    id: PropTypes.number,
    area: PropTypes.string,
    description: PropTypes.string,
    total_win: PropTypes.number,
    total_games: PropTypes.number,
    count_rating: PropTypes.number,
    thumbnail: PropTypes.string,
    id_enemy: PropTypes.number,
  }).isRequired,
  setTurn: PropTypes.func.isRequired,
  setDeck: PropTypes.func.isRequired,
  turn: PropTypes.bool.isRequired,
  enemySlots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setHandleEnd: PropTypes.func.isRequired,
  botDeck: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBotDeck: PropTypes.func.isRequired,
  setEnemySlots: PropTypes.func.isRequired,
  setHP: PropTypes.func.isRequired,
  setEnemyHP: PropTypes.func.isRequired,
  enemyHP: PropTypes.number.isRequired,
};

export default TwoDEnv;
