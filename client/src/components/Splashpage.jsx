import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import background from '../models/cards.png';

const useStyles = makeStyles(() => ({
  cardContainer: {
    padding: '2%',
  },
  cardHeader: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jumbotron: {
    backgroundImage: `url(${background})`,
    backgroundColor: 'black',
    backgroundSize: '100%',
    opacity: '70%',
    width: '100%',
    height: window.innerHeight * 0.7,
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
            {'Quasi-Bound is a 3D table-top card game that allows anyone to'
            + ' create their own cards based on a'
            + ' self-taught image recognition AI which will determine the best stats of that image.'
            + ' Upload any image and our algorithim will do the rest.'
            + ' '
            + 'It all starts with a picture.'}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
