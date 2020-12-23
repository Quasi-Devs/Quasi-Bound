/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
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
    });
    setResource([...resource]);
  };

  return (
    <div className="main">
      <div className="Resourceholder">
        {resource.map((val, i) => <div key={`${String(i)}`} style={{ backgroundColor: val ? 'blue' : null }} className="ResourcePoints">{}</div>)}
      </div>
      <div className="placements">
        {slots.map((val, i) => (
          <div
            onClick={() => {
              slots[i] = !val;
              setSlots([...slots]);
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
