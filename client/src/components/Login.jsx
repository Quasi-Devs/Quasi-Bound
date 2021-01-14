import React from 'react';
import { Button } from '@material-ui/core';

const Login = () => (
  <div className="root">
    <a href="/auth">
      <Button
        variant="contained"
        color="primary"
        type="button"
        // className={classes.profileButton}
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
        // className={classes.profileButton}
      >
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
        Google Login
      </Button>
    </a>
  </div>
);

export default Login;
