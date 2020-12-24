import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import './2denv.css';

const TwoDEnv = ({ slots, setSlots }) => {
  const [resource, setResource] = useState([
    true, false, false, false, false, false, false, false, false, false, false, false]);
  const [count, setCount] = useState(0);
  const cardInHand = [{}, {}, {}, {}, {}];

  const handleResource = () => {
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
};

export default TwoDEnv;
