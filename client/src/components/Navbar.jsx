import React from 'react';
// import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';

const Navbar = () => {
  const text = 'navbar';
  return (
    <AppBar position="static">
      <Toolbar>
        <div>{text}</div>
        <button type="button">Google Translate</button>
        <button type="button">Play</button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
