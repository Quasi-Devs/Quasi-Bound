import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';

import SplashPage from './Splashpage';
import Homepage from './Homepage/Homepage';
import Rules from './Homepage/Rules';
import Profile from './Profile/Profile';
import Deck from './Deck/Deck';
import DeckHeader from './Deck/DeckHeader';
import PlayHub from './PlayHub/PlayHub';
import GameEnv from './GameEnv/GameEnv';

const App = () => {
  const [user, setUser] = useState(null);
  const [nav, setNav] = useState(true);
  useEffect(() => axios.get('/data/user').then(({ data }) => setUser(data)), []);
  console.info('here', window.location.pathname, 'here');
  return (
    <div className="root">
      <BrowserRouter>
        {(window.location.pathname !== '/game' && nav) ? <Navbar user={user} /> : null}
        {window.location.pathname.slice(0, 5) === '/deck' && <DeckHeader />}
        <Switch>
          <Route exact path="/">
            <SplashPage user={user} />
          </Route>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/deck" component={Deck} />
          <Route path="/playhub">
            <PlayHub />
          </Route>
          <Route path="/game">
            <GameEnv setNav={setNav} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
