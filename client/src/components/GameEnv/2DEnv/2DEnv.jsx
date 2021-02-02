import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Card from '../../Card/Card';
import './2denv.css';

const socket = io();

const TwoDEnv = ({
  deck, user, setTurn, setDeck, turn, enemySlots, setHandleEnd, botDeck, setBotDeck,
  setEnemySlots, setHP, setClick, resource, setResource, setCount, setBotGo, setResourceCount,
  botGo, cardInHand, resourceCount, botHand, setBotHand, count, setCardIndex, setTaken,
}) => {
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
      const newreasource = resource;
      resource.map((val, i) => {
        if (i <= num) {
          newreasource[i] = true;
        } else {
          newreasource[i] = false;
        }
        return false;
      });
      setResource([...newreasource]);
      setResourceCount(newreasource.join('').split('true').length - 1);
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
          <div className={window.innerWidth > 850 ? 'Resourceholder' : 'Resourceholdermobile'}>
            <h2>Resource</h2>
            {resource.map((val, i) => <div key={`${String(i)}`} style={{ backgroundColor: val ? 'blue' : null }} className="ResourcePoints">{}</div>)}
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
  setClick: PropTypes.func.isRequired,
  setResource: PropTypes.func.isRequired,
  resource: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setCount: PropTypes.func.isRequired,
  setBotGo: PropTypes.func.isRequired,
  setResourceCount: PropTypes.func.isRequired,
  botGo: PropTypes.bool.isRequired,
  cardInHand: PropTypes.arrayOf(PropTypes.bool).isRequired,
  resourceCount: PropTypes.number.isRequired,
  botHand: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setBotHand: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  setCardIndex: PropTypes.func.isRequired,
  setTaken: PropTypes.func.isRequired,
};

export default TwoDEnv;
