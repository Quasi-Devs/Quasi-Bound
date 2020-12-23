import React from 'react';
import Upload from './Uploader/Upload';
import './createCard.css';

const CreateCard = () => (
  <div className="create">
    <div className="uploader">
      <Upload />
    </div>
  </div>
);

export default CreateCard;
