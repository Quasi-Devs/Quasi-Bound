import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Container, Link, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';

import DeckHeader from './DeckHeader';
import CardsDisplay from './CardsDisplay';
import CreateCard from './CreateCard';
import Search from './Search';
import MyDecks from './MyDecks';

const Deck = ({ user }) => (
  <BrowserRouter className="deckDisplay">
    {window.location.pathname.slice(0, 5) === '/deck' && <DeckHeader />}
    <Route path="/deck" render={() => <Redirect to="/deck/myDecks" />} />
    <Route path="/deck/myDecks">
      <MyDecks user={user} />
    </Route>
    <Route path="/deck/cards">
      <CardsDisplay user={user} />
    </Route>
    <Route path="/deck/createCard">
      <CreateCard />
    </Route>
    <Route path="/deck/search">
      <Search user={user} />
    </Route>
  </BrowserRouter>
);

Deck.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default Deck;
