import React from 'react';
// import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  profileButton: {
    marginRight: '5%',
    position: 'absolute',
    right: 0,
    display: 'flex',
    flexFlow: 'row wrap',
    overflowWrap: 'inherit',
  },
  button: {
    marginLeft: '5%',
    display: 'flex',
    flexFlow: 'row wrap',
    overflowWrap: 'inherit',
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
}));

const Navbar = ({ user = { session: 'd' } }) => {
  const classes = useStyles();
  const text = 'navbar';
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.container}>
        <div>{text}</div>
        <Button variant="contained" className={classes.button} color="primary" type="button">Google Translate</Button>
        <Button variant="contained" className={classes.button} color="primary" type="button">Play</Button>
        {!user.session ? (<Button variant="contained" color="primary" type="button" className={classes.profileButton}>Login</Button>)
          : (<Button variant="contained" color="primary" type="button" className={classes.profileButton} onClick={() => { window.location.href = '/profile'; }}>Profile</Button>)}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  user: PropTypes.element.isRequired,
};

export default Navbar;
