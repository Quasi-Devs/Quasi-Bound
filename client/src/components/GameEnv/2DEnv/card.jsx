/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './2denv.css';

const Card = () => {
  const [hover, setHover] = useState(false);
  const handleHover = () => setHover(!hover);
  return (
    <div className={hover ? 'hover' : 'card'} onClick={handleHover}>
      card
    </div>
  );
};

export default Card;
