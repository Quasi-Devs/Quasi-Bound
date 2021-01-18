import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';

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
    marginTop: '40px',
    padding: '10px',
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
    backgroundColor: '#3F51B5',
    color: 'white',
    bottom: '50%',
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'bottom',
  },
  /**
   * Styles for the cardHeader of username
   */
  buttonEdit: {
    marginTop: '6px',
    marginLeft: '10px',
  },

  cardHeader: {
    backgroundColor: '#3F51B5',
    display: 'flex',
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    marginTop: '10px',
  },
  /**
   * Stats descriptions for stats card component.
   */
  description: {
    margin: '5%',
    display: 'flex',
    fontSize: '150%',
    overflow: 'scroll',
  },
  stat: {
    margin: '5%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '150%',
  },
  underHead: {
    margin: '3%',
    backgroundColor: '#3F51B5',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
  statsContainer: {
    height: '450px',
  },
}));

const Profile = ({ user, setUser }) => {
  const classes = useStyles();
  const [editing, isEditing] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => axios.get('/data/user').then(({ data }) => setUser(data)).catch((err) => console.warn(err)), [update]);

  useEffect(() => {
    setNewDescription(user.description);
  }, [user]);

  return (
    <div>
      {user ? (
        <div className={classes.profileContainer}>
          <Card className={classes.statsContainer}>
            <Card className={classes.cardHeader}>
              <h1 className={classes.cardText}>{`${user.name_user} #${user.id}`}</h1>
            </Card>
            <h1 className={classes.underHead}>My Stats:</h1>
            <h4 className={classes.stat}>{`Games Won: ${user.total_win || 0}`}</h4>
            <h4 className={classes.stat}>{`Games Lost: ${user.total_games - user.total_win}`}</h4>
            <h4 className={classes.stat}>{`Total Games: ${user.total_games || 0}`}</h4>
            <h4 className={classes.stat}>{`Score (ELO): ${user.count_rating || 0} LP`}</h4>
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
                <Button type="submit" className={classes.buttonEdit} onClick={() => { isEditing(true); }}>Edit</Button>
              </h1>
              <h4 className={classes.description}>
                {!editing ? user.description
                  : (
                    <div>
                      <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                      <Button
                        variant="contained"
                        color="primary"
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
                      </Button>
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
  setUser: PropTypes.func.isRequired,
};

export default Profile;
