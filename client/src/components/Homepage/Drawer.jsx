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

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerButton: {
    position: 'fixed',
    right: 0,
  },
  copyright: {
    position: 'absolute',
    bottom: '0px',
    left: '7%',
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
    ['Guide', '/rules'],
    ['Profile', '/profile'],
    ['Deck Builder', '/deck'],
    ['Log Out', '/'],
  ];
  const drawerMap = new Map(drawerItems);

  const handleIcons = (page) => {
    const icons = [
      ['Guide', <ListAltIcon className={clsx(classes.icon)} color="primary" />],
      [
        'Profile',
        <AccountBoxIcon className={clsx(classes.icon)} color="primary" />,
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
        acc = item[1];
      }
      return acc;
    }, []);
  };

  const listDrawerItems = () => (
    <div className={clsx(classes.list)} onClick={() => setDrawer(false)}>
      <List>
        {[...drawerMap].map((item) => (
          <div key={item[0]}>
            <Divider />
            <ListItem
              button
              key={item[0]}
              onClick={() => {
                history.push(item[1]);
              }}
            >
              {handleIcons(item[0])}
              <ListItemText primary={item[0]} />
            </ListItem>
          </div>
        ))}
      </List>
      <Typography className={clsx(classes.copyright)}>
        Copyright 2020 Quasi Bound
      </Typography>
    </div>
  );

  return (
    <React.Fragment>
      <Button
        className={clsx(classes.drawerButton)}
        onClick={() => setDrawer(true)}
      >
        {'Open Drawer'}
      </Button>
      <Drawer anchor={'right'} open={drawer} onClose={() => setDrawer(false)}>
        {listDrawerItems()}
      </Drawer>
    </React.Fragment>
  );
};

export default SidebarDrawer;
