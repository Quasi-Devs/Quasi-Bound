import React from 'react';
import { Typography, Button, Card, Grid, Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Homepage.css';
import SidebarDrawer from './Drawer';
import clsx from 'clsx';

const useStyles = makeStyles({
  mainDiv: {
    position: 'relative',
    left: '10%',
    backgroundColor: '#5a6ad4',
    width: '80%',
    height: '500px',
    border: '1px solid gray',
    borderRadius: '5px',
    textAlign: 'center',
  },
  rightDiv: {
    height: '500px',
    display: 'inline',
    width: '50%',
    float: 'right',
    borderLeft: '3px solid gray',
  },
  leftDiv: {
    height: '500px',
    display: 'inline',
    width: '49%',
    float: 'left',
  },
  container: {
    textAlign: 'center',
  },
});

const Homepage = () => {
  const classes = useStyles();

  const name = 'Teamer Tibebu';
  const greeting = `Welcome, ${name}`;
  return (
    <div className={clsx(classes.container)}>
      <SidebarDrawer />
      <Typography variant="h2">{greeting}</Typography>
      <div className={clsx(classes.mainDiv)}>
        <div>
          <h1 className={clsx(classes.leftDiv)}>Discord Live Chat</h1>
        </div>
        <div>
          <h1 className={clsx(classes.rightDiv)}>My Stats</h1>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
