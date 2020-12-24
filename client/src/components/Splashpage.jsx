import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardContainer: {
    padding: '5%',
  },
  cardHeader: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jumbotron: {
    backgroundImage: 'url(https://c8.alamy.com/comp/T9BXN2/cards-of-game-magic-the-gathering-magic-can-be-played-by-two-or-more-players-in-various-rule-formats-T9BXN2.jpg)',
    opacity: '70%',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  descriptionContainer: {
    padding: '3%',
    opacity: '80%',
    backgroundColor: 'black',
    color: 'white',
    bottom: '50%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'end',
    verticalAlign: 'bottom',
    fontFamily: 'sans-serif',
  },
}));

const SplashPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <Card>
        <CardMedia>
          <h1 className={classes.cardHeader}>Quasi Bound</h1>
        </CardMedia>
      </Card>
      <div className={classes.jumbotron}>
        <div>
          <h3 className={classes.descriptionContainer}>
            Quasi-Bound is a 3d card game experience that will allow someone to
            create their own cards based on a
            self-taught image recognition AI which will determine the stats based on that image.
            they will have the ability to upload an image of their preference and
            our algorithim will do the rest.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
