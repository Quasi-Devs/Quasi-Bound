import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import './myDecks.css';

const MyDecks = ({ user }) => {
  const [decks, setDecks] = useState([]);
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
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {decks.map((deck) => (
          <div key={deck.id} className="deckCover">
            <Typography variant="h4">
              {deck.title}
            </Typography>
          </div>
        ))}
      </Grid>
    </div>
  );
};

MyDecks.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default MyDecks;
