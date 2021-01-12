import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SidebarDrawer from './Homepage/Drawer';

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

const Navbar = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.container}>
        <button
          type="button"
          className={classes.button}
          id="google_translate_element"
          label="translate button"
        />
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
          onClick={() => {
            history.push('/playhub');
          }}
        >
          Play
        </Button>
        {!user ? (
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.profileButton}
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        ) : (
          <SidebarDrawer name={classes.button} />
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default Navbar;
