import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
// import cards from '../../../../cardSampleData.json';
import loading from '../../models/ezgif-4-462b92d9253b.gif';
import Card from '../Card/Card';
import './search.css';

const Search = ({
  user, cards, myCards, setMyCards,
}) => {
  // const [cards, setCards] = useState();
  const [subset, setSubset] = useState(cards);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState();
  const [cardToSave, setCardToSave] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const useStyles = makeStyles({
    saveButton: {
      position: 'relative',
      top: buttonPosition,
    },
    searchBar: {
      marginLeft: '5%',
      marginBottom: '3%',
    },
  });
  const classes = useStyles();

  const searchCards = (query) => {
    const results = cards.filter((card) => {
      const regex = new RegExp(query.toLowerCase());
      return regex.test(card.title.toLowerCase());
    });
    setSubset(results);
  };

  const showButton = (e) => {
    setButtonVisible(true);
    let element = e.target;
    while (!element.dataset.card) {
      element = element.parentElement;
    }
    const card = JSON.parse(element.dataset.card);
    console.info(card);
    setButtonPosition(element.offsetTop);
    setCardToSave(card);
  };

  const saveCard = () => {
    setSavedMessage(false);
    axios.post('/data/saveCard', { userId: user.id, card: cardToSave })
      .then(() => {
        setSavedMessage(true);
        setTrigger(!trigger);
        setMyCards([...myCards, cardToSave]);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    setTimeout(() => setSavedMessage(false), 1500);
  }, [trigger]);

  useLayoutEffect(() => {
    setSubset(cards);
  }, [cards]);

  return (
    <div>
      <input
        className={classes.searchBar}
        // value={query}
        placeholder="Search For a Card:"
        onChange={(e) => searchCards(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchCards();
          }
        }}
      />
      <div className="allCards">
        <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
          {subset.length ? subset.map((card) => <Card key={card.id} info={card} onClick={showButton} />) : <img src={loading} alt="loading animation" />}
        </Grid>
        {buttonVisible
          ? (
            <div className={classes.saveButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveCard}
                type="button"
              >
                {`Save ${cardToSave.title}`}
              </Button>
              {savedMessage
                ? <span>{`Saved ${cardToSave.title}`}</span>
                : null}
            </div>
          )
          : null}
      </div>
    </div>
  );
};

Search.propTypes = {
  user: PropTypes.shape().isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  myCards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setMyCards: PropTypes.func.isRequired,
};

export default Search;
