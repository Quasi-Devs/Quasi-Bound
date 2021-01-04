import React, { useState, useLayoutEffect } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
// import cards from '../../../../cardSampleData.json';
import Card from './Card';
import './search.css';

const Search = () => {
  const [cards, setCards] = useState();
  const [subset, setSubset] = useState([]);
  // const [query, setQuery] = useState('');

  const searchCards = (query) => {
    const results = cards.filter((card) => {
      const regex = new RegExp(query.toLowerCase());
      return regex.test(card.title.toLowerCase());
    });
    setSubset(results);
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
      {/* <button type="submit" onClick={searchCards}>Search</button>
      <button type="button" onClick={() => setSubset(cards)}>Reset</button> */}
      <Grid container direction="row" justify="space-around" alignItems="center" md={5}>
        {subset.map((card) => <Card key={card} card={card} />)}
      </Grid>
    </div>
  );
};

export default Search;
