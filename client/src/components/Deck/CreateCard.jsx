import React, { useState } from 'react';
import './createCard.css';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Upload from './Upload';

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
  const [Lore, setLore] = useState('');
  const [stats, setStats] = useState({});

  const createCard = async () => {
    stats.description += ` ${Lore}`;
    console.info(stats);
    await axios.post('/data/cards', stats);
  };

  return (
    <div className="createCard">
      <div className="uploader">
        <Upload
          setCardImage={setCardImage}
          Lore={Lore}
          setLore={setLore}
          setTitle={setTitle}
          title={title}
          setStats={setStats}
        />
      </div>
      <div>
        {Object.keys(stats).length ? (
          <div>
            <Card color="secondary">
              <div className={classes.cardHeader}>
                <h1>{title}</h1>
                <h1 className={classes.resourcePoints}>{stats.rp}</h1>
              </div>
              <div className={classes.cardStatsContainer}>
                {cardImage !== '' && <img src={cardImage} className={classes.cardImage} id="image" alt="" width="200" height="200" />}
                <div className={classes.cardStats}>
                  {
                    stats.isCharacter && (
                      <div>
                        <h3>{`ATTACK: ${stats.attack}`}</h3>
                        <h3>{`HEALTH: ${stats.health}`}</h3>
                        <h3>{`ARMOR: ${stats.armor}`}</h3>
                      </div>
                    )
                  }
                </div>
              </div>
              <Card>
                <div className={classes.cardDesc}>
                  <h5>{stats.isCharacter ? `character ${stats.size}` : 'ability'}</h5>
                  <h4>{`${stats.description} ${Lore}`}</h4>
                </div>
              </Card>
            </Card>
            <Button onClick={createCard} className={classes.button}>Create Card</Button>
          </div>
        )
          : (
            <div>
              <h1>{title}</h1>
              {cardImage !== '' && <img src={cardImage} id="image" alt="" width="300" />}
            </div>
          )}
      </div>
    </div>
  );
};

export default CreateCard;
