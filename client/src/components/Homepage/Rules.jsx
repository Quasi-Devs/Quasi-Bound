import React, { useState } from 'react';
import('./Rules.css');
import { Typography, Button, Card, Grid, Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SidebarDrawer from './Drawer';

const styles = {
  root: {
    background: 'linear-gradient(45deg, green 30%, orange 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

const Rules = () => {
  const text = 'rules';
  const history = useHistory();
  const classes = styles;
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      {showDrawer ? <SidebarDrawer /> : null}
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1">Rules</Typography>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="mainContainer"
        >
          <Grid item className="gridItem">
            Each user will be given 1 resource at the beginning of their turn.
            Which will increment by 1 each turn.
          </Grid>
          <Grid item className="gridItem">
            The maximum number of resources a user can have is 10.
          </Grid>
          <Grid item className="gridItem">
            Each player will have a field in which they will be able to place a
            maximum of 5 cards on a field. A user will start with a deck of 30
            cards, and 5 cards in their hand.
          </Grid>
          <Grid item className="gridItem">
            The object of the game is to defeat the other user by bringing their
            health of 250 down to zero. The maximum health a card can have is
            100 and for damage would be 100.
          </Grid>
          <Grid item className="gridItem">
            Attribute count: 0-1
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          className="acceptAndProceed"
          onClick={() => {
            history.push('/home');
          }}
        >
          Accept & Proceed
        </Button>
      </Grid>
    </div>
  );
};

// export default Rules;
export default withStyles(styles)(Rules);
