import React, { useState, useLayoutEffect } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const CardsDisplay = ({ user }) => {
  // const [userId, setUserId] = useState(user ? user.id : null);
  const [myCards, setMyCards] = useState([]);
  useLayoutEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: cardData } = await axios.get(`/data/userCards/${user.id}`);
        setMyCards(cardData);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <Grid container direction="row" justify="space-around" alignItems="center" md={8}>
        {myCards.map((card) => <Card key={card} card={card} />)}
      </Grid>
    </div>
  );
};

CardsDisplay.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default CardsDisplay;
