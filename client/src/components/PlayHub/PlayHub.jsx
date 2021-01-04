import React, { useState } from 'react';
import './playhub.css';
import { Link, Redirect } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io.connect('', {
  transports: ['websocket'],
});
const PlayHub = ({ user }) => {
  const text = 'play hub';
  const [Open, setOpen] = useState(false);
  const [GoOn, setGoOn] = useState(false);
  const handleModal = () => setOpen(!Open);
  if (user) {
    socket.on(`${user.id}`, () => {
      setGoOn(true);
    });
  }
  return (
    <div className="main">
      {GoOn ? <Redirect to="/game" /> : null}
      <div className="find">
        <h1 className="header">{`left ${text}`}</h1>
        <h1>Img slot</h1>
        <button
          type="submit"
          className="button"
          onClick={() => {
            handleModal();
            socket.emit('Queue', user.id);
          }}
        >
          Find Match
        </button>
        <Modal open={Open}>
          <div>
            <h1>Finding A Match</h1>
            <button
              type="submit"
              onClick={() => {
                handleModal();
                socket.emit('DeQueue', user.id);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
      <div className="create">
        <h1 className="header">{`right ${text}`}</h1>
        <h1>Img slot</h1>
        <div>
          <input placeholder="user" />
          <button type="submit">Search User</button>
        </div>
        <Link to="/game"><button type="submit" className="button">Create</button></Link>
      </div>
    </div>
  );
};
PlayHub.propTypes = {
  user: PropTypes.element.isRequired,
};
export default PlayHub;
