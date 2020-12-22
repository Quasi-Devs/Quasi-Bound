import React from 'react';
import './2denv.css';

const TwoDEnv = () => {
  const text = '2D environment';
  const resource = [true, true, true, true, true, true, true, true, false, false, false, false];
  return (
    <div>
      {text}
      <div className="Resourceholder">
        {resource.map((val, i) => <div key={`${String(i)}`} style={{ backgroundColor: val ? 'blue' : null }} className="ResourcePoints">{}</div>)}
      </div>
      <div className="cards">
        placeholder for cards
      </div>
      <button type="submit">Surrender</button>
      <button type="submit">End Turn</button>
    </div>
  );
};

export default TwoDEnv;
