import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
// import cards from '../../../../cardSampleData.json';
import Card from './Card';
import './search.css';

const Search = () => {
  const [subset, setSubset] = useState([]);
  const [query, setQuery] = useState('');

  const searchCards = () => {
    const results = subset.filter((card) => {
      const regex = new RegExp(query.toLowerCase());
      return regex.test(card.title.toLowerCase());
    });
    setSubset(results);
  };

  useEffect(async () => {
    const { data: cardData } = await axios.get('/data/cards');
    setSubset(cardData.rows);
  }, []);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            searchCards();
          }
        }}
      />
      <button type="submit" onClick={searchCards}>Search</button>
      <button type="button" onClick={() => setSubset(subset)}>Reset</button>
      <Grid container direction="row" justify="space-around" alignItems="center" md={5}>
        {subset.map((card) => <Card key={card} card={card} />)}
      </Grid>
    </div>
  );
};

export default Search;
