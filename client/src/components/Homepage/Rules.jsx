import React, { useState } from 'react';
import('./Rules.css');
import { Typography, Button, Card, Grid, Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SidebarDrawer from './Drawer';
import { rules } from './rules.json';

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
  const [showDrawer, setShowDrawer] = useState();
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <SidebarDrawer />
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1">Rules</Typography>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="mainContainer"
        >
          {rules.map((rule, i) => (
            <Grid item className="gridItem" key={i}>
              {rule}
            </Grid>
          ))}
        </Grid>
        {accepted ? null : (
          <Button
            variant="contained"
            color="secondary"
            className="acceptAndProceed"
            onClick={() => {
              setAccepted(true);

              setShowDrawer(true);
              history.push('/home');
            }}
          >
            Accept & Proceed
          </Button>
        )}
      </Grid>
    </div>
  );
};

// export default Rules;
export default withStyles(styles)(Rules);
