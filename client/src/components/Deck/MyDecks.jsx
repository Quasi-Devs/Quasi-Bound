import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import Card from './Card';
import './myDecks.css';

const MyDecks = ({ user }) => {
  const [decks, setDecks] = useState([]);
  const [deckCards, setDeckCards] = useState([]);
  // const [cardsList, setCardsList] = useState([]);
  const [title, setTitle] = useState('');
  const [inputShow, setInputShow] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const createDeck = () => {
    if (inputShow) {
      axios.post('/data/deck', { title, userId: user.id })
        .then(() => {
          setInputShow(false);
          setTrigger(!trigger);
          setTitle('');
        })
        .catch();
    } else {
      setInputShow(true);
    }
  };

  const editDeck = (e) => {
    console.info('clicked');
    let element = e.target;
    while (!element.dataset.id) {
      element = element.parentElement;
    }
    axios.get(`/data/deck/${element.dataset.id}`)
      .then(({ data }) => {
        setDeckCards(data);
        data.map((card, i, list) => {
          console.info(list);
          return card.title;
        });
      })
      .catch();
  };

  const showButton = () => {
    console.info('clicked');
  };

  useLayoutEffect(() => {
    if (user) {
      axios.get(`/data/deck/${user.id}`)
        .then(({ data }) => setDecks(data))
        .catch();
    }
  }, [user, trigger]);

  return (
    <div>
      {inputShow && (
        <input value={title} placeholder="Deck Title" onChange={(e) => setTitle(e.target.value)} />
      )}
      <button type="button" onClick={createDeck}>Create Deck</button>
      <div className="cardsList">
        cards list
      </div>
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {decks.map((deck) => (
          <div key={deck.id} className="deckCover" data-id={deck.id} onClick={editDeck}>
            <Typography variant="h4">
              {deck.title}
            </Typography>
          </div>
        ))}
      </Grid>
      {deckCards.length > 0
        ? (
          <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
            {deckCards.map((card) => <Card key={card.id} card={card} onClick={showButton} />)}
          </Grid>
        )
        : null}
    </div>
  );
};

MyDecks.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default MyDecks;
