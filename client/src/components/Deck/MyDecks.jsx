import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import './myDecks.css';

const MyDecks = ({ user, displayMode, setDisplayMode }) => {
  const [decks, setDecks] = useState([]);
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
    axios.get(`/data/deckCards/${deck.id}`)
      .then(({ data }) => {
        data.sort((a, b) => {
          if (a.point_resource > b.point_resource) {
            return 1;
          }
          if (a.point_resource < b.point_resource) {
            return -1;
          }
          if (a.point_health > b.point_health) {
            return 1;
          }
          if (a.point_health < b.point_health) {
            return -1;
          }
          if (a.point_attack > b.point_attack) {
            return 1;
          }
          if (a.point_attack < b.point_attack) {
            return -1;
          }
          if (a.point_armor > b.point_armor) {
            return 1;
          }
          if (a.point_armor < b.point_armor) {
            return -1;
          }
          return 0;
        });
        setDeckCards(data);
        const list = data.map((card) => card.title);
        setCardsList(list);
        setDecks([deck]);
      })
      .catch((err) => console.warn(err));
  };

  const editDeck = (e) => {
    let element = e.target;
    while (!element.dataset.deck) {
      element = element.parentElement;
    }
    const deck = JSON.parse(element.dataset.deck);
    getDeckCards(deck);
    setDisplayMode(deck.id);
  };

  const quitEdit = () => {
    setDeckCards();
    setCardsList([]);
    setDisplayMode('browse');
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
        deckId: decks[0].id,
        cardCount: decks[0].count_card,
      },
    })
      .then(() => {
        cancelRemove();
        getDeckCards(decks[0]);
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
    setButtonPosition(element.offsetTop - 302);
    setCardToRemove(card);
    getDeckCards(decks[0]);
  };

  const setDefault = () => {
    axios.put('/data/defaultDeck', { userId: user.id, deckId: decks[0].id })
      .then(() => setDefaultDeck(decks[0].title))
      .catch((err) => console.warn(err));
  };

  useLayoutEffect(() => {
    if (user) {
      if (displayMode === 'browse') {
        axios.get(`/data/decks/${user.id}`)
          .then(({ data }) => {
            data.forEach((deck) => {
              if (deck.id === user.default_deck) {
                setDefaultDeck(deck.title);
              }
            });
            setDecks(data);
          })
          .catch((err) => console.warn(err));
      } else {
        axios.get(`/data/decks/${user.id}`)
          .then(({ data }) => {
            const [myDeck] = data.filter((deck) => deck.id === displayMode);
            getDeckCards(myDeck);
          })
          .catch((err) => console.warn(err));
      }
    }
  }, [user, trigger]);

  return (
    <div>
      {inputShow && (
        <input value={title} placeholder="Deck Title" onChange={(e) => setTitle(e.target.value)} />
      )}
      <button type="button" onClick={createDeck}>Create Deck</button>
      <h2>{`Default Deck: ${defaultDeck || 'none'}`}</h2>
      {cardsList.length > 0
        ? (
          <div className="cardsList">
            {cardsList.map((name) => <div>{name}</div>)}
          </div>
        ) : null}
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {decks.map((deck) => (
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
              {deckCards.map((card) => <Card key={card.id} card={card} onClick={showButton} />)}
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
  setDisplayMode: PropTypes.func.isRequired,
  displayMode: PropTypes.string.isRequired,
};

export default MyDecks;
