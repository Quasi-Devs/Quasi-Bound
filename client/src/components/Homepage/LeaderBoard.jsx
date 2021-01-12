import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from 'axios';

const useStyles = makeStyles({
  header: {
    borderBottom: '1px solid gray',
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
    overflow: 'scroll',
  },
  userDesc: {
    positon: 'relative',
    left: 0,
  },
  selectedUser: {
    color: 'red',
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
      <h1 className={clsx(classes.header)}>LeaderBoard:</h1>
      <div className={classes.userDesc}>
        {users.map((leader, i) => (
          <h1 key={String(i)} className={(user.name_user === leader.name_user) ? classes.selectedUser : 'none'}>
            {`
          ${i + 1}:
          
          ${leader.name_user}

          ELO:
          ${leader.count_rating || 0}`}
          </h1>
        ))}
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
