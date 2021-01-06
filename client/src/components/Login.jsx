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
        Google Login
      </Button>
    </a>
  </div>
);

export default Login;
