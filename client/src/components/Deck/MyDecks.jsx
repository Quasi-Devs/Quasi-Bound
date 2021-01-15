import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card/Card';
import './myDecks.css';

const MyDecks = ({
  user, setUser, displayMode, setDisplayMode, decks, setDecks,
  allDeckCards, setAllDeckCards, loaded, sortCards,
}) => {
  const [displayDecks, setDisplayDecks] = useState(decks);
  const [deckCards, setDeckCards] = useState();
  const [cardsList, setCardsList] = useState([]);
  const [title, setTitle] = useState('');
  const [inputShow, setInputShow] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [cardToRemove, setCardToRemove] = useState({});
  const [buttonPosition, setButtonPosition] = useState();
  const [defaultDeck, setDefaultDeck] = useState();
  const [trigger, setTrigger] = useState(false);
  const useStyles = makeStyles({
    removeButton: {
      position: 'relative',
      top: buttonPosition,
    },
  });
  const classes = useStyles();
  const history = useHistory();

  const createDeck = () => {
    if (inputShow) {
      axios.post('/data/deck', { title, userId: user.id })
        .then(() => {
          setInputShow(false);
          setTrigger(!trigger);
          setTitle('');
        })
        .catch((err) => console.warn(err));
    } else {
      setInputShow(true);
    }
  };

  const getDeckCards = (deck) => {
    // const cards = allDeckCards[deck.id];
    // setDeckCards(cards);
    // const list = cards.map((card) => card.title);
    // setCardsList(list);
    setDisplayDecks([deck]);
    const cards = allDeckCards[deck.id];
    if (cardToRemove.id) {
      for (let i = 0; i < cards.length; i += 1) {
        if (cards[i].id === cardToRemove.id) {
          cards.splice(i, 1);
        }
      }
    }
    cards.sort(sortCards);
    const newDeckCardList = {};
    const newDeckList = [];
    Object.keys(allDeckCards).forEach((deckId) => {
      if (deckId === deck.id) {
        newDeckCardList[deckId] = cards;
      } else {
        newDeckCardList[deckId] = allDeckCards[deckId];
      }
    });
    setAllDeckCards(newDeckCardList);
    setDeckCards(cards);
    decks.forEach((d) => {
      if (d.id === deck.id) {
        newDeckList.push({ id: d.id, count_card: cards.length, title: d.title });
        setDisplayDecks([{ id: d.id, count_card: cards.length, title: d.title }]);
      } else {
        newDeckList.push(d);
      }
    });
    setDecks(newDeckList);
    const list = cards.map((card) => card.title);
    setCardsList(list);
  };

  const editDeck = (e) => {
    let element = e.target;
    while (!element.dataset.deck) {
      element = element.parentElement;
    }
    const deck = JSON.parse(element.dataset.deck);
    getDeckCards(deck);
    setDisplayMode(`${deck.id}`);
  };

  const quitEdit = () => {
    setDisplayMode('browse');
    setDeckCards();
    setCardsList([]);
    setTrigger(!trigger);
  };

  const addCards = () => {
    history.push('/deck/cards');
  };

  const cancelRemove = () => {
    setButtonVisible(false);
    setCardToRemove({});
  };

  const removeCard = () => {
    axios.delete('/data/deckCard', {
      data: {
        cardId: cardToRemove.id,
        deckId: displayDecks[0].id,
        cardCount: displayDecks[0].count_card,
      },
    })
      .then(() => {
        cancelRemove();
        getDeckCards(displayDecks[0]);
      })
      .catch((err) => console.warn(err));
  };

  const showButton = (e) => {
    setButtonVisible(true);
    let element = e.target;
    while (!element.dataset.card) {
      element = element.parentElement;
    }
    const card = JSON.parse(element.dataset.card);
    console.info(card);
    setButtonPosition(element.offsetTop - 302);
    setCardToRemove(card);
    // getDeckCards(displayDecks[0]);
  };

  const setDefault = () => {
    axios.put('/data/defaultDeck', { userId: user.id, deckId: displayDecks[0].id })
      .then(() => setDefaultDeck(displayDecks[0].title))
      .then(() => {
        const updateUser = {};
        Object.keys(user).forEach((key) => {
          if (key === 'default_deck') {
            updateUser.default_deck = displayDecks[0].id;
          } else {
            updateUser[key] = user[key];
          }
        });
        setUser(updateUser);
      })
      .catch((err) => console.warn(err));
  };

  useLayoutEffect(() => {
    if (user.id && decks) {
      if (displayMode === 'browse') {
        setDisplayDecks(decks);
        decks.forEach((deck) => {
          if (deck.id === user.default_deck) {
            setDefaultDeck(deck.title);
          }
        });
      } else {
        const [myDeck] = decks.filter((deck) => `${deck.id}` === displayMode);
        setDeckCards(allDeckCards[myDeck.id]);
      }
    }
  }, [user, decks, trigger]);

  return (
    <div>
      {!loaded ? <h1>Loading...</h1> : null}
      {inputShow && (
        <input value={title} placeholder="Deck Title" onChange={(e) => setTitle(e.target.value)} />
      )}
      <button type="button" onClick={createDeck}>Create Deck</button>
      <h2>{`Default Deck: ${defaultDeck || 'none'}`}</h2>
      {cardsList.length > 0
        ? (
          <div className="cardsList">
            {cardsList.map((name, i) => <div key={String(i)}>{name}</div>)}
          </div>
        ) : null}
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {displayDecks.map((deck) => (
          <div key={deck.id} className="deckCover" data-deck={JSON.stringify(deck)} onClick={editDeck}>
            <Typography variant="h4">
              {deck.title}
            </Typography>
            <Typography variant="h4">
              {deck.count_card}
            </Typography>
          </div>
        ))}
      </Grid>
      {deckCards
        ? (
          <div className="deckCards">
            <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
              {deckCards.map((card, i) => (
                <Card
                  key={String(i)}
                  info={card}
                  onClick={showButton}
                />
              ))}
            </Grid>
            {buttonVisible
              ? (
                <div className={classes.removeButton}>
                  <button type="button" onClick={removeCard}>{`Remove ${cardToRemove.title}`}</button>
                  <button type="button" onClick={cancelRemove}>Cancel</button>
                </div>
              ) : null}
            <div id="buttonsContainer">
              <div>
                <button type="button" onClick={setDefault}>Set Deck as Default</button>
              </div>
              <div>
                <button type="button" onClick={addCards}>Add Cards</button>
                <button type="button" onClick={quitEdit}>Done</button>
              </div>
            </div>
          </div>
        )
        : null}
    </div>
  );
};

MyDecks.propTypes = {
  user: PropTypes.shape().isRequired,
  setUser: PropTypes.func.isRequired,
  setDisplayMode: PropTypes.func.isRequired,
  displayMode: PropTypes.string.isRequired,
  decks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setDecks: PropTypes.func.isRequired,
  allDeckCards: PropTypes.PropTypes.shape().isRequired,
  setAllDeckCards: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  sortCards: PropTypes.func.isRequired,
};

export default MyDecks;
