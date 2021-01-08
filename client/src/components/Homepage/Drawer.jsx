import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerButton: {
    position: 'absolute',
    top: '0.875rem',
    right: '0.5rem',
  },
  copyright: {
    color: 'grey',
  },
  icon: {
    marginRight: '10px',
  },
});

const SidebarDrawer = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const history = useHistory();
  const drawerItems = [
    ['Home', '/home'],
    ['Guide', '/rules'],
    ['Profile', '/profile'],
    ['Friends', '/friends'],
    ['Deck Builder', '/deck'],
    ['Log Out', '/'],
  ];
  const drawerMap = new Map(drawerItems);

  const handleIcons = (page) => {
    const icons = [
      ['Home', <HomeIcon className={clsx(classes.icon)} color="primary" />],
      ['Guide', <ListAltIcon className={clsx(classes.icon)} color="primary" />],
      [
        'Profile',
        <AccountBoxIcon className={clsx(classes.icon)} color="primary" />,
      ],
      [
        'Friends',
        <PeopleIcon className={clsx(classes.icon)} color="primary" />,
      ],
      [
        'Deck Builder',
        <ViewCarouselIcon className={clsx(classes.icon)} color="primary" />,
      ],
      [
        'Log Out',
        <ExitToAppIcon className={clsx(classes.icon)} color="primary" />,
      ],
    ];

    return icons.reduce((acc, item) => {
      if (item[0] === page) {
        return item[1];
      }
      return acc;
    }, <div>No Icon</div>);
  };

  const listDrawerItems = () => (
    <List
      className={clsx(classes.list)}
      onClick={() => setDrawer(false)}
      role="button"
    >
      {[...drawerMap].map((item) => (
        <div key={item.toString()}>
          <Divider />
          <ListItem
            button
            onClick={() => {
              if (item[0] === 'Log Out') {
                axios.get('/data/logout')
                  .then(() => {
                    window.location.reload();
                  });
              }
              history.push(item[1]);
            }}
          >
            {handleIcons(item[0])}
            <ListItemText primary={item[0]} />
          </ListItem>
        </div>
      ))}
      <div key="Copyright">
        <Divider />
        <ListItem>
          <Typography className={clsx(classes.copyright)}>
            Copyright 2020 Quasi Bound
          </Typography>
        </ListItem>
      </div>
    </List>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        type="button"
        className={clsx(classes.drawerButton)}
        onClick={() => setDrawer(true)}
      >
        <MenuIcon />
      </Button>
      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        {listDrawerItems()}
      </Drawer>
    </div>
  );
};

export default SidebarDrawer;
