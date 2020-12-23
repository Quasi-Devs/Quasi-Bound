import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
  const user = 'user';
  return (
    <div className="root">
      <BrowserRouter>
        {window.location.pathname !== '/game' && <Navbar />}
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
            <GameEnv />
          </Route>
          {/* <Route path="/deck/createCard" component={CreateCard} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
