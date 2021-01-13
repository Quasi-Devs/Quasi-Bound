import React, { useState } from 'react';
import './playhub.css';
import { Redirect } from 'react-router-dom';
import { Modal, Snackbar } from '@material-ui/core';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  userSearch: {
    display: 'flex',
    justifyContent: 'center',
  },
  userSearchButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  modalStyle: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  alertFormat: {
    position: 'absolute',
    top: '0',
  },
});

const socket = io();

const PlayHub = ({ user }) => {
  const classes = useStyles();
  const text = 'play hub';
  const [Invite, setInvite] = useState(false);
  const [Open, setOpen] = useState(false);
  const [Error, setError] = useState(false);
  const [GoOn, setGoOn] = useState(false);
  const [input, setInput] = useState('');
  const handleModal = () => setOpen(!Open);
  const handleInvite = () => setInvite(!Invite);
  if (user) {
    socket.on(`${user.id}`, () => {
      setGoOn(true);
    });
  }
  return (
    <div className="main">
      <Snackbar
        open={Error}
        className={classes.alertFormat}
        autoHideDuration={6000}
        onClose={() => setError(!Error)}
      >
        <Alert severity="info">
          <h2>sign in to continue</h2>
          <button type="submit" onClick={() => setError(false)}>Okay</button>
        </Alert>
      </Snackbar>
      {GoOn ? <Redirect to="/game" /> : null}
      <div className="find">
        <h1 className="header">{`left ${text}`}</h1>
        <h1>Img slot</h1>
        <button
          type="submit"
          className="button"
          onClick={() => {
            if (!user.id) {
              setError(true);
            } else {
              handleModal();
              socket.emit('Queue', user.id);
            }
          }}
        >
          Finding A Match Against Player
        </button>
        <button
          type="submit"
          onClick={() => {
            if (!user.id) {
              setError(true);
            } else {
              axios.get('/data/addEnemy')
                .then(() => setGoOn(true));
            }
          }}
        >
          Start A Match Against Bot
        </button>
        <Modal open={Open}>
          <div className={classes.modalStyle}>
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
        <div className={classes.userSearch}>
          <h3>Search for player (ID can be found in profile)</h3>
        </div>
        <div className={classes.userSearch}>
          <input placeholder="#(replace with user ID)" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className={classes.userSearchButton}>
          <button
            type="submit"
            onClick={() => {
              if (!user.id) {
                setError(true);
              } else {
                handleInvite();
                console.info('Invite', input, user.id, user.name_user);
                socket.emit('Invite', input, user.id, user.name_user);
              }
            }}
          >
            Invite User
          </button>
        </div>
        <Modal open={Invite}>
          <div className={classes.modalStyle}>
            <h1>Waiting for player</h1>
            <button
              type="submit"
              onClick={() => {
                handleInvite();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
PlayHub.propTypes = {
  user: PropTypes.shape({
    name_user: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
export default PlayHub;
