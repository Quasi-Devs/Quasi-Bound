import React, { useState, useLayoutEffect } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
// import cards from '../../../../cardSampleData.json';
import Card from './Card';
import './search.css';

const Search = ({ user }) => {
  const [cards, setCards] = useState();
  const [subset, setSubset] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState();
  const [cardToSave, setCardToSave] = useState({});
  const useStyles = makeStyles({
    saveButton: {
      position: 'relative',
      top: buttonPosition,
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
    setButtonPosition(element.offsetTop);
    setCardToSave(card);
  };

  const saveCard = () => {
    axios.post('/data/saveCard', { userId: user.id, card: cardToSave })
      .catch();
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      const { data: cardData } = await axios.get('/data/cards');
      setCards(cardData.rows);
      setSubset(cardData.rows);
    };
    fetchData();
  }, []);

  return (
    <div>
      <input
        // value={query}
        placeholder=""
        onChange={(e) => searchCards(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchCards();
          }
        }}
      />
      <div className="allCards">
        <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
          {subset.map((card) => <Card key={card.id} card={card} onClick={showButton} />)}
        </Grid>
        {buttonVisible
          ? (
            <button onClick={saveCard} type="button" className={classes.saveButton}>
              {`Save ${cardToSave.title}`}
            </button>
          )
          : null}
      </div>
    </div>
  );
};

Search.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default Search;
