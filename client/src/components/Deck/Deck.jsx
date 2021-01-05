import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Container, Link, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';

import DeckHeader from './DeckHeader';
import CardsDisplay from './CardsDisplay';
import CreateCard from './CreateCard';
import Search from './Search';

const Deck = ({ user }) => (
  <div className="deckDisplay">
    {window.location.pathname.slice(0, 5) === '/deck' && <DeckHeader />}
    <Route path="/deck/cards">
      <CardsDisplay />
    </Route>
    <Route path="/deck/createCard">
      <CreateCard />
    </Route>
    <Route path="/deck/search">
      <Search user={user} />
    </Route>
  </div>
);

Deck.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default Deck;
