import React from 'react';
import {
  Typography,
  Button,
  Card,
  Grid,
  Container,
  Divider,
  Box,
} from '@material-ui/core';
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
    boxShadow: '3px 3px 3px 6px lightgrey',
  },
  rightDiv: {
    position: 'relative',
    top: '5%',
    height: '450px',
    display: 'inline',
    width: '67%',
    float: 'right',
    marginRight: '10px',
    border: '2px solid gray',
    backgroundColor: 'white',
    boxShadow: '3px 3px 1px 1px black',
  },
  leftDiv: {
    position: 'relative',
    top: '5%',
    height: '450px',
    display: 'inline',
    width: '30%',
    float: 'left',
    border: '2px solid gray',
    marginLeft: '10px',
    backgroundColor: 'white',
    boxShadow: '3px 3px 1px 1px black',
  },
  container: {
    textAlign: 'center',
  },
  header: {
    borderBottom: '1px solid gray',
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
        <div className={clsx(classes.leftDiv)}>
          <h1 className={clsx(classes.header)}>Discord Live Chat</h1>
        </div>
        <Box borderLeft={1} />
        <div className={clsx(classes.rightDiv)}>
          <h1 className={clsx(classes.header)}>My Stats</h1>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
