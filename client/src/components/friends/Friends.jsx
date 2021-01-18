import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import {
  List, Avatar, Button,
} from 'antd';
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles({
  userSearch: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  item: {
    width: '100%',
    marginRight: '20px',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'overflow',
    columnCount: '3',
  },
  friend: {
    margin: '10px',
    width: '300px',
    height: (window.innerHeight * 0.75),
    border: '3px solid blue',
    backgroundColor: '',
    overflow: 'scroll',
  },
  btngroup: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    color: 'white',
  },
});

const Friends = ({ setFriendProfile, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState('');
  const [search, setSearch] = useState([]);
  const [friends, setFriends] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get('/data/allUser')
      .then(({ data }) => {
        setSearch(data);
      })
      .catch((err) => console.warn(err));
  }, []);

  useEffect(async () => {
    if (user) {
      try {
        const { data: friendsData } = await axios.get(`/data/friends/${user.id}`);
        const friendStuff = [];
        friendsData.rows.map((val) => {
          friendStuff.push(val.id_friend);
          return null;
        });
        setFriends([...friendStuff]);
      } catch (err) {
        console.error(err);
      }
    }
  }, [user, update]);

  return (
    <div>
      <Card className={classes.main}>
        <div className={classes.friend}>
          <div className={classes.header}>
            <h1 className={classes.header}>Search for Friends</h1>
          </div>
          <div className={classes.userSearch}>
            <input placeholder="Search for users" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          {input
            ? (
              <List
                className={classes.main}
                itemLayout="horizontal"
                dataSource={search}
                renderItem={(profile) => {
                  if (profile.id !== user.id && !friends.includes(profile.id)
                  && profile.name_user.includes(input)) {
                    return (
                      <Card className={classes.item}>
                        <List.Item
                          actions={[
                            <div className={classes.btngroup}>
                              <Button
                                type="submit"
                                onClick={() => {
                                  setFriendProfile(profile);
                                  history.push('/friendProfile');
                                }}
                              >
                                View Profile
                              </Button>
                              <Button
                                type="submit"
                                onClick={async () => {
                                  try {
                                    await axios.post('/data/friends', { userID: user.id, friendID: profile.id });
                                    setUpdate(!update);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                follow
                              </Button>
                            </div>]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar src={profile.thumbnail} />
                        }
                            title={<p>{`${profile.name_user}  #${profile.id}`}</p>}
                          />
                        </List.Item>
                      </Card>
                    );
                  }
                  return null;
                }}
              />
            ) : null}
        </div>
        <div className={classes.friend}>
          <div className={classes.header}>
            <h1 className={classes.header}>Players in your area</h1>
          </div>
          <List
            className={classes.main}
            itemLayout="horizontal"
            dataSource={search}
            renderItem={(profile) => {
              if (profile.id !== user.id && !friends.includes(profile.id)
              && user.area === profile.area) {
                return (
                  <Card className={classes.item}>
                    <List.Item
                      actions={[
                        <div className={classes.btngroup}>
                          <Button
                            type="submit"
                            onClick={() => {
                              setFriendProfile(profile);
                              history.push('/friendProfile');
                            }}
                          >
                            View Profile
                          </Button>
                          <Button
                            type="submit"
                            onClick={async () => {
                              try {
                                await axios.post('/data/friends', { userID: user.id, friendID: profile.id });
                                setUpdate(!update);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            follow
                          </Button>
                        </div>]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src={profile.thumbnail} />
                        }
                        title={<p>{`${profile.name_user}  #${profile.id}`}</p>}
                      />
                    </List.Item>
                  </Card>
                );
              }
              return null;
            }}
          />
        </div>
        <div className={classes.friend}>
          <div className={classes.header}>
            <h1 className={classes.header}>Following</h1>
          </div>
          <List
            className={classes.main}
            itemLayout="horizontal"
            dataSource={search}
            renderItem={(profile) => {
              if (friends.includes(profile.id)) {
                return (
                  <Card className={classes.item}>

                    <List.Item
                      actions={[
                        <div className={classes.btngroup}>
                          <Button
                            type="submit"
                            onClick={() => {
                              setFriendProfile(profile);
                              history.push('/friendProfile');
                            }}
                          >
                            View Profile
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={async () => {
                              try {
                                await axios.put('/data/friends', { friendID: profile.id, userID: user.id });
                                setUpdate(!update);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            Unfollow
                          </Button>
                        </div>]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src={profile.thumbnail} />
                        }
                        title={<p>{`${profile.name_user}  #${profile.id}`}</p>}
                      />
                    </List.Item>
                  </Card>
                );
              }
              return null;
            }}
          />
        </div>
      </Card>
    </div>
  );
};

Friends.propTypes = {
  setFriendProfile: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name_user: PropTypes.string,
    id: PropTypes.number,
    area: PropTypes.string,
  }).isRequired,
};

export default Friends;
