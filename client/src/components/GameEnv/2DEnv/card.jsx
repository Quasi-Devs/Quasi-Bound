import React, { useState } from 'react';
import './2denv.css';

const Card = () => {
  const [hover, setHover] = useState(false);
  const handleHover = () => setHover(!hover);
  return (
    <div className={hover ? 'hover' : 'card'} onMouseLeave={handleHover} onMouseOver={handleHover} onFocus={() => {}}>
      card
    </div>
  );
};

export default Card;
