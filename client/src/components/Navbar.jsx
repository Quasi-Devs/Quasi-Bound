import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

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

const Navbar = ({ user = { session: '' } }) => {
  const classes = useStyles();
  const text = 'navbar';

  const history = useHistory();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.container}>
        <div>{text}</div>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="button"
          onClick={() => {
            history.push('/home');
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="button"
        >
          Google Translate
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="button"
          onClick={() => {
            history.push('/game');
          }}
        >
          Play
        </Button>
        {!user.session ? (
          <Link to="/auth">
            <Button
              variant="contained"
              color="primary"
              type="button"
              className={classes.profileButton}
            >
              Login
            </Button>
          </Link>
        ) : (
          <Link to="/profile" className={classes.profileButton}>
            <Button variant="contained" color="primary" type="button">
              Profile
            </Button>
          </Link>
        )}
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="button"
          onClick={() => {
            history.push('/rules');
          }}
        >
          Guide
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="button"
          onClick={() => {
            history.push('/deck');
          }}
        >
          Deck Builder
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  user: PropTypes.element.isRequired,
};

export default Navbar;
