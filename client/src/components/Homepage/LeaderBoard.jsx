import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  List, Avatar,
} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const useStyles = makeStyles({
  header: {
    borderBottom: '1px solid gray',
    backgroundColor: '#2f3136',
    color: 'white',
    position: 'sticky',
    top: '10px',
  },
  headercontainer: {
    zIndex: 1,
    position: 'sticky',
    top: 0,
  },
  rightDiv: {
    position: 'relative',
    top: '5%',
    height: '450px',
    display: 'inline',
    width: '60%',
    float: 'right',
    marginRight: '10px',
    border: '2px solid gray',
    backgroundColor: 'white',
    boxShadow: '3px 3px 1px 1px black',
    overflow: 'scroll',
  },
  userDesc: {
    positon: 'absolute',
    left: '10%',
  },
  selectedUser: {
    color: 'red',
  },
  userinfo: {
    position: 'absolute',
    left: '30%',
  },
  item: {
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});

const LeaderBoard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get('/data/allUser')
      .then(({ data }) => {
        setUsers([...data].sort((a, b) => {
          if (a.count_rating > b.count_rating) {
            return -1;
          }
          if (a.count_rating < b.count_rating) {
            return 1;
          }
          return 0;
        }).slice(0, 10));
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={clsx(classes.rightDiv)}>
      <div className={clsx(classes.headercontainer)}>
        <h1 className={clsx(classes.header)}>LeaderBoard:</h1>
      </div>
      <div className={classes.userDesc}>
        <List
          className={classes.main}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(profile, i) => (
            <Card className={classes.item}>
              <List.Item
                actions={[
                  <div className={classes.btngroup}>
                    <h2 key={String(i)} className={(user.name_user === profile.name_user) ? classes.selectedUser : 'none'}>
                      {`
                          ELO:
                          ${profile.count_rating || 0}`}
                    </h2>
                  </div>]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={profile.thumbnail} />
                        }
                  title={<h2 className={classes.userinfo}>{`${i + 1}:  ${profile.name_user}  #${profile.id}`}</h2>}
                />
              </List.Item>
            </Card>
          )}
        />
      </div>
    </div>
  );
};

LeaderBoard.propTypes = {
  user: PropTypes.shape({
    name_user: PropTypes.string,
    id: PropTypes.number,
    area: PropTypes.string,
    description: PropTypes.string,
    total_win: PropTypes.number,
    total_games: PropTypes.number,
    count_rating: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default LeaderBoard;
