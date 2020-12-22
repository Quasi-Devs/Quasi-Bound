import React from 'react';
import Card from './card';
import './2denv.css';

const TwoDEnv = () => {
  const resource = [true, true, true, true, true, true, true, false, false, false, false, false];
  const cardInHand = [{}, {}, {}, {}, {}];
  return (
    <div className="main">
      <div className="Resourceholder">
        {resource.map((val, i) => <div key={`${String(i)}`} style={{ backgroundColor: val ? 'blue' : null }} className="ResourcePoints">{}</div>)}
      </div>
      <div className="cards">
        {cardInHand.map((val, i) => <Card key={`${String(i)}`} />)}
      </div>
      <button type="submit">Surrender</button>
      <button type="submit">End Turn</button>
    </div>
  );
};

export default TwoDEnv;
