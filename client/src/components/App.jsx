import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { io } from 'socket.io-client';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

import SplashPage from './Splashpage';
import Homepage from './Homepage/Homepage';
import Rules from './Homepage/Rules';
import Profile from './Profile/Profile';
import Deck from './Deck/Deck';
import PlayHub from './PlayHub/PlayHub';
import GameEnv from './GameEnv/GameEnv';
import Login from './Login';
import Friends from './friends/Friends';
import FriendProfile from './friends/FriendProfile';
import rotate from '../models/phone-rotate.png';
import './app.css';

const socket = io();
const key = 'f64c20cfef0d9aca4db81064e3e01800';

const useStyles = makeStyles({
  alertFormat: {
    position: 'absolute',
    top: '0',
  },
  root: {
    backgroundImage: 'url(https://i.imgur.com/0ITKs6M.jpg)',
  },
  footer: {
    backgroundColor: '#5a6ad4',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
  mobilealert: {
    position: 'absolute',
    border: '2px solid black',
    zIndex: 1,
    backgroundColor: 'white',
    opacity: '80%',
    margin: '10%',
    marginTop: '30%',
  },
});

const App = () => {
  const [user, setUser] = useState({});
  const [nav, setNav] = useState(true);
  const [invitee, setInvitee] = useState('');
  const [enemyId, setEnemyId] = useState();
  const [open, setOpen] = useState(false);
  const [friendProfile, setFriendProfile] = useState({});
  const classes = useStyles();

  socket.on(`${user.id} Accept?`, (id, name) => {
    setEnemyId(id);
    setOpen(true);
    setInvitee(name);
  });
  socket.on(`${user.id} Proceed`, () => {
    window.location.href = '/game';
  });

  const { Footer } = Layout;

  useEffect(() => {
    axios.get('/data/user')
      .then(({ data }) => {
        if (data === null) {
          setUser({});
        } else {
          setUser(data);
        }
      })
      .catch((err) => console.warn(err));
    axios.get('https://api.ipify.org')
      .then(({ data }) => axios.get(`http://api.ipstack.com/${data}?access_key=${key}`))
      .then(({ data }) => axios.get(`/data/area/${data.city}`))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className={classes.root}>
      { window.innerWidth < window.innerHeight && (
      <div className={classes.mobilealert}>
        <img src={rotate} alt="phone-rotate-indicator" width={window.innerWidth * 0.8} height={window.innerHeight / 2} />
      </div>
      ) }
      <Snackbar
        open={open}
        className={classes.alertFormat}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
      >
        <Alert severity="info">
          <h2>{`${invitee} has invited you. Join Game?`}</h2>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              socket.emit('Accept', enemyId, user.id);
            }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => setOpen(false)}
          >
            Decline
          </Button>
        </Alert>
      </Snackbar>
      <BrowserRouter>
        {(window.location.pathname !== '/game' && nav) ? <Navbar user={user} /> : null}
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/home">
            <Homepage user={user} setNav={setNav} />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/profile">
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route path="/deck">
            <Deck user={user} setUser={setUser} />
          </Route>
          <Route path="/playhub">
            <PlayHub user={user} />
          </Route>
          <Route path="/game">
            <GameEnv setNav={setNav} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/friends">
            <Friends setFriendProfile={setFriendProfile} user={user} />
          </Route>
          <Route path="/friendProfile">
            <FriendProfile friend={friendProfile} />
          </Route>
        </Switch>
      </BrowserRouter>
      {(window.location.pathname !== '/game' && nav) ? <Footer><span className={classes.footer}>© QuasiBound - QuasiDevs 2021</span></Footer> : null}
    </div>
  );
};

export default App;
