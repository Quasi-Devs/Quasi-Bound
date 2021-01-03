import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Homepage.css';
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
  discord: {
    position: 'relative',
  },
});

const Homepage = ({ user }) => {
  const classes = useStyles();
  let greeting;
  if (user !== null) {
    greeting = `Welcome, ${user.name_user}`;
  }
  return (
    <div className={clsx(classes.container)}>
      {/* <SidebarDrawer /> */}
      <Typography variant="h2">{greeting}</Typography>
      <div className={clsx(classes.mainDiv)}>
        <iframe
          src="https://e.widgetbot.io/channels/791403283356975145/791403283356975149"
          height="450"
          width="450"
          className={clsx(classes.leftDiv)}
          title="iframe"
          mentions="true"
        />
        <Box borderLeft={1} />
        <div className={clsx(classes.rightDiv)}>
          <h1 className={clsx(classes.header)}>My Stats</h1>
        </div>
      </div>
    </div>
  );
};

Homepage.propTypes = {
  user: PropTypes.shape({
    name_user: PropTypes.string.isRequired,
  }).isRequired,
};

export default Homepage;
