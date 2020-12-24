import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import './2denv.css';

const TwoDEnv = ({ slots, setSlots, exampleData }) => {
  const [resource, setResource] = useState([
    true, false, false, false, false, false, false, false, false, false, false, false]);
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState(exampleData);
  const [cardInHand, setCardInHand] = useState([deck[0], deck[1], deck[2], deck[3], deck[4]]);

  const handleResource = () => {
    setCardInHand(cardInHand);
    setDeck(deck);
    setCount(count + 1);
    const counter = count + 1;
    resource.map((val, i) => {
      if (i <= counter) {
        resource[i] = true;
      }
      return false;
    });
    setResource([...resource]);
  };

  useEffect(() => deck.splice(0, 5), []);

  return (
    <div className="main">
      <div className="deck">deck</div>
      <div className="discard">discard</div>
      <div className="Resourceholder">
        {resource.map((val, i) => <div key={`${String(i)}`} style={{ backgroundColor: val ? 'blue' : null }} className="ResourcePoints">{}</div>)}
      </div>
      <div className="placements">
        {slots.map((val, i) => (
          <div
            aria-hidden="true"
            onClick={() => {
              const arr = slots;
              arr[i] = !val;
              setSlots([...arr]);
            }}
            className={val ? 'slots' : 'placed'}
            key={`${String(i)}`}
          >
            {}
          </div>
        ))}
      </div>
      <div className="cards">
        {cardInHand.map((val, i) => <Card info={val} key={`${String(i)}`} />)}
      </div>
      <button type="submit">Surrender</button>
      <button type="submit" onClick={handleResource}>End Turn</button>
    </div>
  );
};

TwoDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSlots: PropTypes.func.isRequired,
  exampleData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TwoDEnv;
