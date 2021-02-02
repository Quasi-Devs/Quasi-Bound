import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5%',
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a href="/auth">
        <Button
          variant="contained"
          color="primary"
          type="button"
        >
          <img src="https://img.icons8.com/fluent/48/000000/discord-new-logo.png" alt="" />
          Discord Login
        </Button>
      </a>
      <a href="/auth/google">
        <Button
          variant="contained"
          color="primary"
          type="button"
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
          Google Login
        </Button>
      </a>
    </div>
  );
};
export default Login;
