import React, { useState } from 'react';
import './playhub.css';
import { Redirect } from 'react-router-dom';
import { Modal, Snackbar, Button } from '@material-ui/core';
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
  pvf: {
    width: '30%',
    height: '30%',
    paddingBottom: '5%',
  },
});

const socket = io();

const PlayHub = ({ user }) => {
  const classes = useStyles();
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
        <h1 className="header">Find a Match</h1>
        <div className={classes.userSearch}>
          <img className={classes.pvf} src="https://image.flaticon.com/icons/png/128/3069/3069052.png" alt="playervfriend" />
        </div>
        <div className={classes.userSearch}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // className="button"
            onClick={() => {
              if (!user.id) {
                setError(true);
              } else {
                handleModal();
                socket.emit('Queue', user.id);
              }
            }}
          >
            Find a Match
          </Button>
        </div>
        <div className={classes.userSearchButton}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              if (!user.id) {
                setError(true);
              } else {
                axios.get('/data/addEnemy')
                  .then(() => setGoOn(true))
                  .catch((err) => console.warn(err));
              }
            }}
          >
            Start A Match Against Bot
          </Button>
        </div>
        <Modal open={Open}>
          <div className={classes.modalStyle}>
            <h1>Finding A Match</h1>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                handleModal();
                socket.emit('DeQueue', user.id);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
      <div className="create">
        <h1 className="header">Create a Match</h1>
        <div className={classes.userSearch}>
          <img src="https://image.flaticon.com/icons/png/128/2619/2619029.png" alt="playervfriend" />
        </div>
        <div className={classes.userSearch}>
          <h3>Search for player (ID can be found in profile)</h3>
        </div>
        <div className={classes.userSearch}>
          <input placeholder="#(replace with user ID)" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className={classes.userSearchButton}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              if (!user.id) {
                setError(true);
              } else {
                handleInvite();
                socket.emit('Invite', input, user.id, user.name_user);
              }
            }}
          >
            Invite User
          </Button>
        </div>
        <Modal open={Invite}>
          <div className={classes.modalStyle}>
            <h1>Waiting for player</h1>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                handleInvite();
              }}
            >
              Cancel
            </Button>
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
