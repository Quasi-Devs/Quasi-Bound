import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import cards from '../../../../cardSampleData.json';
import Card from './Card';
import './search.css';

const Search = () => {
  const [allCards, setAllCards] = useState(cards);

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {allCards.map((card, i) => <Card key={card + i} card={card} />)}
    </Grid>
  );
};

export default Search;
