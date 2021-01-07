import React, { useState, useLayoutEffect } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const CardsDisplay = ({ user }) => {
  // const [userId, setUserId] = useState(user ? user.id : null);
  const [myCards, setMyCards] = useState([]);
  const [myDecks, setMyDecks] = useState([]);

  const clickCard = (e) => {
    let element = e.target;
    while (!element.dataset.card) {
      element = element.parentElement;
    }
    const card = JSON.parse(element.dataset.card);
    console.info(card);
    axios.post('/data/addCard', { cardId: card.id, deckId: myDecks[0].id, cardCount: myDecks[0].count_card }).catch();
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: cardData } = await axios.get(`/data/userCards/${user.id}`);
        const { data: deckData } = await axios.get(`/data/deck/${user.id}`);
        console.info(deckData);
        setMyDecks(deckData);
        setMyCards(cardData);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {myCards.map((card) => <Card key={card} card={card} onClick={clickCard} />)}
      </Grid>
    </div>
  );
};

CardsDisplay.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default CardsDisplay;
