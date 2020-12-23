import React from 'react';
import { Typography, Button, Card, Grid, Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Homepage.css';
import SidebarDrawer from './Drawer';

const Homepage = () => {
  const name = 'Teamer Tibebu';
  const greeting = `Welcome, ${name}`;
  return (
    <div>
      <SidebarDrawer />
      <Typography variant="h2">{greeting}</Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        className="mainContainer"
      >
        <Grid item>Grid Item 1</Grid>
        <Grid item>Grid Item 2</Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
