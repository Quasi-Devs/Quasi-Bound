import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  /**
   * @profileContainer is the container that holds card information
   */
  profileContainer: {
    padding: '5%',
    columns: '2 500px',
  },
  /**
   * @imgContainer supplies the style properties for the profile
   * Thumbnail.
   */
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  /**
   * Container contains margin styles
   */
  container: {
    margin: '5%',
  },
  /**
   * DescriptionContainer holds the styles for the description
   */
  descriptionContainer: {
    margin: '3%',
    opacity: '80%',
    backgroundColor: '#3F51B5',
    color: 'white',
    bottom: '50%',
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'bottom',
    fontFamily: 'sans-serif',
  },
  /**
   * Styles for the cardHeader of username
   */
  cardHeader: {
    backgroundColor: '#3F51B5',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
  /**
   * Stats descriptions for stats card component.
   */
  description: {
    margin: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  underHead: {
    margin: '3%',
    backgroundColor: '#3F51B5',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
  statsContainer: {
    height: '400px',
  },
}));

const Profile = ({ user, setUser }) => {
  const classes = useStyles();
  const [editing, isEditing] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => axios.get('/data/user').then(({ data }) => setUser(data)), [update]);

  useEffect(() => {
    setNewDescription(user.description);
  }, [user]);

  return (
    <div>
      {user ? (
        <div className={classes.profileContainer}>
          <Card className={classes.statsContainer}>
            <Card className={classes.cardHeader}>
              <h1>{`${user.name_user} #${user.id}`}</h1>
            </Card>
            <h1 className={classes.underHead}>My Stats:</h1>
            <h4 className={classes.description}>{`Games Won: ${user.total_win || 0}`}</h4>
            <h4 className={classes.description}>{`Games Lost: ${user.total_games - user.total_win}`}</h4>
            <h4 className={classes.description}>{`Total Games: ${user.total_games || 0}`}</h4>
            <h4 className={classes.description}>{`Score (ELO): ${user.count_rating || 0} LP`}</h4>
          </Card>
          <div className={classes.imgContainer}>
            <img
              src={user.thumbnail}
              alt="thumbnail"
              width="255"
              height="255"
            />
          </div>
          <div>
            <Card>
              <h1 className={classes.descriptionContainer}>
                About:
                <button type="submit" onClick={() => { isEditing(true); }}>Edit</button>
              </h1>
              <h4 className={classes.description}>
                {!editing ? user.description
                  : (
                    <div>
                      <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                      <button
                        type="submit"
                        onClick={async () => {
                          try {
                            await axios.get(`/data/desc/${user.id}`, { params: { description: newDescription } });
                            setUpdate(!update);
                            isEditing(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
              </h4>
            </Card>
          </div>
        </div>
      ) : 'Loading...'}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Profile;
