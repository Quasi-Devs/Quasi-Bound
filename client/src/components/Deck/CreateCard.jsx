import React, { useState } from 'react';
import './createCard.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Upload from './Upload';
import Card from '../Card/Card';
import loadingGif from '../GameEnv/loadingGif.gif';

const useStyles = makeStyles(() => ({

  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardStatsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardStats: {
    color: 'white',
    backgroundColor: 'silver',
  },
  cardImage: {
    borderRadius: '50%',
  },
  cardDesc: {
    textAlign: 'center',
  },
  resourcePoints: {
    marginLeft: '20%',
    padding: '10px',
    backgroundColor: 'gray',
    color: 'white',
  },
  button: {
    marginLeft: '5%',
    display: 'flex',
    flexFlow: 'row wrap',
    overflowWrap: 'inherit',
  },
}));

const CreateCard = () => {
  const classes = useStyles();
  const [cardImage, setCardImage] = useState('');
  const [title, setTitle] = useState('');
  const [stats, setStats] = useState({});

  const createCard = async () => {
    await axios.post('/data/cards', stats);
  };

  const reset = () => {
    setCardImage('');
    setTitle('');
    setStats({});
  };

  const whatToRender = () => {
    if (!Object.keys(stats).length && !cardImage) {
      return (
        <div className="uploader">
          <Upload
            setCardImage={setCardImage}
            setTitle={setTitle}
            title={title}
            setStats={setStats}
          />
        </div>
      );
    }
    if (!Object.keys(stats).length && cardImage) {
      return (
        <div className="images">
          <img src={loadingGif} className="loading" alt="" width="200" />
          <img src={cardImage} id="image" alt="" width="300" />
        </div>
      );
    }
    return (
      <div className="cardResult">
        <Card info={stats} />
        <div className="buttons">
          <Button variant="contained" color="primary" onClick={createCard} className={classes.button}>Create Card</Button>
          <Button variant="contained" color="primary" onClick={reset} className={classes.button}>Upload New Card</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="createCard">
      {whatToRender()}
    </div>
  );
};

export default CreateCard;
