import React, { useState } from 'react';
import './createCard.css';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
}));

const CreateCard = () => {
  const classes = useStyles();
  const [cardImage, setCardImage] = useState('https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg');
  const [title, setTitle] = useState('d');
  const [stats, setStats] = useState({});
  return (
    <div className="createCard">
      <div className="uploader">
        <Upload setCardImage={setCardImage} setTitle={setTitle} title={title} setStats={setStats} />
      </div>
      <div>
        {Object.keys(stats).length ? (
          <div>
            <Card color="secondary">
              <div className={classes.cardHeader}>
                <h1>{title}</h1>
                <h1 className={classes.resourcePoints}>{stats.point_resource}</h1>
              </div>
              <div className={classes.cardStatsContainer}>
                {cardImage !== '' && <img src={cardImage} className={classes.cardImage} id="image" alt="" width="200" height="200" />}
                <div className={classes.cardStats}>
                  {
                    stats.is_character && (
                      <div>
                        <h3>{`ATTACK: ${stats.point_attack}`}</h3>
                        <h3>{`HEALTH: ${stats.point_health}`}</h3>
                        <h3>{`ARMOR: ${stats.point_armor}`}</h3>
                      </div>
                    )
                  }
                </div>
              </div>
              <Card>
                <div className={classes.cardDesc}>
                  <h5>{stats.is_character ? `character ${stats.size.label}` : 'ability'}</h5>
                  <h4>{stats.description}</h4>
                </div>
              </Card>
            </Card>
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
