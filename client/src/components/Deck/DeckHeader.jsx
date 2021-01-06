import React, { useState, useLayoutEffect } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SearchIcon from '@material-ui/icons/Search';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import img from './DeckIcon.png';

const useStyles = makeStyles({
  header: {
    position: 'relative',
    marginTop: '1vw',
    marginBottom: '1vw',
    border: 'solid black 2px',
    backgroundColor: 'lightGrey',
    fontSize: '30px',
  },
  buttonContainer: {
    padding: '0',
  },
  buttonList: {
    display: 'flex',
    textAlign: 'center',
  },
  links: {
    padding: '5px',
  },
  deckIcon: {
    width: '24px',
    height: '24px',
    filter: 'invert(12%) sepia(100%) saturate(5603%) hue-rotate(245deg) brightness(79%) contrast(147%)',
  },
});

const DeckHeader = () => {
  const [header, setHeader] = useState();
  const [trigger, setTrigger] = useState(true);
  const classes = useStyles();
  const paths = [
    { path: '/deck/myDecks', icon: <img className={classes.deckIcon} src={img} alt="" />, title: 'My Decks' },
    { path: '/deck/createCard', icon: <LibraryAddIcon />, title: 'Create Card' },
    { path: '/deck/search', icon: <SearchIcon />, title: 'Search for Cards' },
    { path: '/deck/cards', icon: <ViewModuleIcon />, title: 'My Cards' },
  ];

  useLayoutEffect(() => {
    let headerSet = false;
    paths.forEach(({ path, title }) => {
      if (path === window.location.pathname) {
        setHeader(title);
        headerSet = true;
      }
    });
    if (!headerSet) {
      setHeader('My Decks');
    }
  }, [trigger]);

  return (
    <div className={classes.header} id="deckHeader">
      <Container className={classes.buttonContainer}>
        <List className={classes.buttonList}>
          {paths.map(({ path, icon, title }) => (
            <Link to={path} key={path}>
              <ListItem
                button
                className={classes.links}
                data-title={title}
                onClick={() => setTrigger(!trigger)}
              >
                {icon}
              </ListItem>
            </Link>
          ))}
          <span>{header}</span>
        </List>
      </Container>
    </div>
  );
};

export default DeckHeader;
