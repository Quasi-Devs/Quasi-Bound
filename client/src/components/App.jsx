import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';

import SplashPage from './Splashpage';
import Homepage from './Homepage/Homepage';
import Rules from './Homepage/Rules';
import Profile from './Profile/Profile';
import Deck from './Deck/Deck';
import PlayHub from './PlayHub/PlayHub';
import GameEnv from './GameEnv/GameEnv';
import Login from './Login';

const App = () => {
  const [user, setUser] = useState(false);
  const [nav, setNav] = useState(true);
  useEffect(() => axios.get('/data/user').then(({ data }) => setUser(data)), []);
  return (
    <div className="root">
      <BrowserRouter>
        {(window.location.pathname !== '/game' && nav) ? <Navbar user={user} /> : null}
        <Switch>
          <Route exact path="/">
            <SplashPage user={user} />
          </Route>
          <Route path="/home">
            <Homepage user={user} setNav={setNav} />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/deck">
            <Deck user={user} />
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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
