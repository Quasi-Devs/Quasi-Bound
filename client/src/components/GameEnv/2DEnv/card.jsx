import React, { useState } from 'react';
import './2denv.css';

const Card = () => {
  const [hover, setHover] = useState(false);
  const handleHover = () => setHover(!hover);
  return (
    <div aria-hidden="true" className={hover ? 'hover' : 'card'} onClick={handleHover}>
      card
    </div>
  );
};

export default Card;
