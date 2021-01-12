import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const CardsDisplay = ({
  user, displayMode, myCards, myDecks,
}) => {
  // const [userId, setUserId] = useState(user ? user.id : null);
  // const [myCards, setMyCards] = useState([]);
  // const [myDecks, setMyDecks] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  const [cardToAdd, setCardToAdd] = useState({});
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState();
  const [addedMessage, setAddedMessage] = useState(false);
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
    axios.get(`/data/deckCards/${displayMode}`)
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
        const list = data.map((card) => card.title);
        setCardsList(list);
      })
      .catch((err) => console.warn(err));
  };

  const addCard = () => {
    const [editingDeck] = myDecks.filter((deck) => deck.id === displayMode);
    axios.post('/data/addCard', {
      cardId: cardToAdd.id,
      deckId: editingDeck.id,
      cardCount: editingDeck.count_card,
    }).then(() => {
      setAddedMessage(true);
      setTrigger(!trigger);
      getCardsList();
    }).catch((err) => console.warn(err));
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
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    setTimeout(() => setAddedMessage(false), 1500);
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
            {cardsList.map((name) => <div>{name}</div>)}
          </div>
        ) : null}
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {myCards.map((card) => <Card key={card} card={card} onClick={clickCard} />)}
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
  displayMode: PropTypes.number.isRequired,
  myCards: PropTypes.arrayOf().isRequired,
  myDecks: PropTypes.arrayOf().isRequired,
};

export default CardsDisplay;
