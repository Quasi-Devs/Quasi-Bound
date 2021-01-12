import React from 'react';
import { Card } from '@material-ui/core';
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

const friendProfile = ({ friend }) => {
  const classes = useStyles();
  return (
    <div>
      {friend ? (
        <div className={classes.profileContainer}>
          <Card className={classes.statsContainer}>
            <Card className={classes.cardHeader}>
              <h1>{`${friend.name_user} #${friend.id}`}</h1>
            </Card>
            <h1 className={classes.underHead}>My Stats:</h1>
            <h4 className={classes.description}>{`Games Won: ${friend.total_win || 0}`}</h4>
            <h4 className={classes.description}>{`Games Lost: ${friend.total_games - friend.total_win}`}</h4>
            <h4 className={classes.description}>{`Total Games: ${friend.total_games || 0}`}</h4>
            <h4 className={classes.description}>{`Score (ELO): ${friend.count_rating || 0} LP`}</h4>
          </Card>
          <div className={classes.imgContainer}>
            <img
              src={friend.thumbnail}
              alt="thumbnail"
              width="255"
              height="255"
            />
          </div>
          <div>
            <Card>
              <h1 className={classes.descriptionContainer}>About:</h1>
              <h4 className={classes.description}>
                {friend.description}
              </h4>
            </Card>
          </div>
        </div>
      ) : 'Loading...'}
    </div>
  );
};

friendProfile.propTypes = {
  friend: PropTypes.shape({
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

export default friendProfile;
