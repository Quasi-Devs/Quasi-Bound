/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import './2denv.css';

const TwoDEnv = ({ slots, setSlots }) => {
  const resource = [true, true, true, true, true, true, true, false, false, false, false, false];
  const cardInHand = [{}, {}, {}, {}, {}];
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
            className={val ? 'placed' : 'slots'}
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
      <button type="submit">End Turn</button>
    </div>
  );
};

TwoDEnv.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSlots: PropTypes.func.isRequired,
};

export default TwoDEnv;
