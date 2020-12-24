import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';

import SplashPage from './Splashpage';
import Homepage from './Homepage/Homepage';
import Rules from './Homepage/Rules';
import Profile from './Profile/Profile';
import Deck from './Deck/Deck';
import PlayHub from './PlayHub/PlayHub';
import GameEnv from './GameEnv/GameEnv';

const App = () => {
  const user = 'user';
  // console.info(window.location);
  return (
    <div>
      <BrowserRouter>
        {window.location.pathname !== '/game' && <Navbar />}
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
          <Route path="/deck">
            <Deck />
          </Route>
          <Route path="/playhub">
            <PlayHub />
          </Route>
          <Route path="/game">
            <GameEnv />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
