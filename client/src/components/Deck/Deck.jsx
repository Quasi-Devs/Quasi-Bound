import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Container, Link, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';

import DeckHeader from './DeckHeader';
import CardsDisplay from './CardsDisplay';
import CreateCard from './CreateCard';
import Search from './Search';

const Deck = ({ match }) => (
  <div className="deckDisplay">
    {window.location.pathname.slice(0, 5) === '/deck' && <DeckHeader />}
    <Route path={`${match.path}/cards`} component={CardsDisplay} />
    <Route path={`${match.path}/createCard`} component={CreateCard} />
    <Route path={`${match.path}/search`} component={Search} />
  </div>
);

Deck.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Deck;
