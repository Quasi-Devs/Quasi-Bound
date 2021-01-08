import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
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
      <Card className="main">
        <div className="find">
          <div className={classes.userSearch}>
            <input placeholder="Search for users" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          {input ? search.map((profile) => {
            if (profile.id !== user.id && !friends.includes(profile.id)) {
              return (
                <div>
                  {(profile.name_user.toLowerCase().includes(input.toLowerCase()))
                    ? (
                      <div>
                        <h1>{`${profile.name_user} #${profile.id}`}</h1>
                        <button
                          type="submit"
                          onClick={() => {
                            setFriendProfile(profile);
                            history.push('/friendProfile');
                          }}
                        >
                          View Profile
                        </button>
                        <button
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
                        </button>
                      </div>
                    ) : null}
                </div>
              );
            }
            return null;
          }) : null}
        </div>
        <div className="create">
          <h1>Following</h1>
          {
            search.map((profile) => {
              if (friends.includes(profile.id)) {
                return (
                  <div>
                    <h1>{`${profile.name_user} #${profile.id}`}</h1>
                    <button
                      type="submit"
                      onClick={() => {
                        setFriendProfile(profile);
                        history.push('/friendProfile');
                      }}
                    >
                      View Profile
                    </button>
                    <button
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
                    </button>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
      </Card>
    </div>
  );
};

Friends.propTypes = {
  setFriendProfile: PropTypes.func.isRequired,
  user: PropTypes.bool.isRequired,
};

export default Friends;