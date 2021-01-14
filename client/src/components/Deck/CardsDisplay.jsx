import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const CardsDisplay = ({
  user, displayMode, myCards, myDecks, setMyDecks, allDeckCards, setAllDeckCards, sortCards,
}) => {
  // const [userId, setUserId] = useState(user ? user.id : null);
  // const [myCards, setMyCards] = useState([]);
  // const [myDecks, setMyDecks] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  const [cardToAdd, setCardToAdd] = useState({});
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState();
  const [addedMessage, setAddedMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const history = useHistory();
  const useStyles = makeStyles({
    addButton: {
      position: 'relative',
      top: buttonPosition,
    },
    savedCards: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });
  const classes = useStyles();

  const getCardsList = () => {
    const cards = allDeckCards[displayMode];
    if (cardToAdd.id) {
      cards.push(cardToAdd);
    }
    cards.sort(sortCards);
    const newDeckCardList = {};
    const newDeckList = [];
    Object.keys(allDeckCards).forEach((deckId) => {
      if (deckId === displayMode) {
        newDeckCardList[deckId] = cards;
      } else {
        newDeckCardList[deckId] = allDeckCards[deckId];
      }
    });
    setAllDeckCards(newDeckCardList);
    myDecks.forEach((deck) => {
      if (`${deck.id}` === displayMode) {
        newDeckList.push({ id: deck.id, count_card: cards.length, title: deck.title });
      } else {
        newDeckList.push(deck);
      }
    });
    setMyDecks(newDeckList);
    const list = cards.map((card) => card.title);
    setCardsList(list);
  };

  const addCard = () => {
    const [editingDeck] = myDecks.filter((deck) => `${deck.id}` === displayMode);
    if (editingDeck.count_card < 30) {
      axios.post('/data/addCard', {
        cardId: cardToAdd.id,
        deckId: editingDeck.id,
        cardCount: editingDeck.count_card,
      }).then(() => {
        setAddedMessage(true);
        setTrigger(!trigger);
        getCardsList();
      }).catch((err) => console.warn(err));
    } else {
      setFailureMessage(true);
      setTrigger(!trigger);
    }
  };

  const clickCard = (e) => {
    if (displayMode !== 'browse') {
      setButtonVisible(true);
      let element = e.target;
      while (!element.dataset.card) {
        element = element.parentElement;
      }
      setCardToAdd(JSON.parse(element.dataset.card));
      setButtonPosition(element.offsetTop);
    }
  };

  const quitEdit = () => {
    history.push('/deck');
  };

  const renderButton = () => {
    if (buttonVisible) {
      return (
        <div className={classes.addButton}>
          <button onClick={addCard} type="button">
            {`Add ${cardToAdd.title}`}
          </button>
          {addedMessage
            ? <span>{`Added ${cardToAdd.title}`}</span>
            : null}
          {failureMessage
            ? <span>Deck is Full</span>
            : null}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    setTimeout(() => setAddedMessage(false), 1500);
    setTimeout(() => setFailureMessage(false), 1500);
  }, [trigger]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (user) {
        if (displayMode !== 'browse') {
          getCardsList();
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className={classes.savedCards}>
      {cardsList.length > 0
        ? (
          <div className="cardsList">
            {cardsList.map((name, i) => <div key={String(i)}>{name}</div>)}
          </div>
        ) : null}
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {myCards.map((card, i) => <Card key={String(i)} card={card} onClick={clickCard} />)}
      </Grid>
      {displayMode !== 'browse' ? renderButton() : null}
      {displayMode !== 'browse'
        ? (
          <div>
            <div id="buttonsContainer">
              {/* <button type="button" onClick={addCards}>Add Cards</button> */}
              <button type="button" onClick={quitEdit}>Quit</button>
            </div>
          </div>
        ) : null}
    </div>
  );
};

CardsDisplay.propTypes = {
  user: PropTypes.shape().isRequired,
  displayMode: PropTypes.string.isRequired,
  myCards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  myDecks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setMyDecks: PropTypes.func.isRequired,
  allDeckCards: PropTypes.PropTypes.shape().isRequired,
  setAllDeckCards: PropTypes.func.isRequired,
  sortCards: PropTypes.func.isRequired,
};

export default CardsDisplay;
