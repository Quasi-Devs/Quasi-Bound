import React from 'react';
import { Link } from 'react-router-dom';
import { Container, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SearchIcon from '@material-ui/icons/Search';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

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
});

const DeckHeader = () => {
  const classes = useStyles();
  const paths = [
    { path: '/deck/createCard', icon: <LibraryAddIcon /> },
    { path: '/deck/search', icon: <SearchIcon /> },
    { path: '/deck/cards', icon: <ViewModuleIcon /> },
  ];

  return (
    <div className={classes.header} id="deckHeader">
      <Container className={classes.buttonContainer}>
        <List className={classes.buttonList}>
          {paths.map(({ path, icon }) => (
            <Link to={path} key={path}>
              <ListItem button className={classes.links}>
                {icon}
              </ListItem>
            </Link>
          ))}
          <span>Deck Builder</span>
        </List>
      </Container>
    </div>
  );
};

export default DeckHeader;
