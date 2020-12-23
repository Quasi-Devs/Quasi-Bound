import React from 'react';
import './playhub.css';

const PlayHub = () => {
  const text = 'play hub';
  return (
    <div className="main">
      <div className="find">
        <h1 className="header">{`left ${text}`}</h1>
        <h1>Img slot</h1>
        <button type="submit" className="button">Find Match</button>
      </div>
      <div className="create">
        <h1 className="header">{`right ${text}`}</h1>
        <h1>Img slot</h1>
        <input placeholder="room name" />
        <div>
          <input placeholder="user" />
          <button type="submit">Search User</button>
        </div>
        <button type="submit" className="button">Create</button>
      </div>
    </div>
  );
};

export default PlayHub;
