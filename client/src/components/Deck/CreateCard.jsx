import React, { useState } from 'react';
import Upload from './Upload';
import './createCard.css';

const CreateCard = () => {
  const [cardImage, setCardImage] = useState('https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg');

  return (
    <div className="createCard">
      <div className="uploader">
        <Upload setCardImage={setCardImage} cardImage={cardImage} />
      </div>
      {cardImage !== '' && <img src={cardImage} alt="" width="300" />}
    </div>
  );
};

export default CreateCard;
