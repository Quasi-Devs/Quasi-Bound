import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  /**
   * @profileContainer is the container that holds card information
   */
  profileContainer: {
    padding: '5%',
    columns: '2 150px',
  },
  /**
   * @imgContainer supplies the style properties for the profile
   * Thumbnail.
   */
  imgContainer: {
    positon: 'absolute',
    right: 0,
    marginTop: '144px',
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
    height: '394px',
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.profileContainer}>
        <Card className={classes.statsContainer}>
          <Card className={classes.cardHeader}>
            <h1>Dan Bobish</h1>
          </Card>
          <h1 className={classes.underHead}>My Stats:</h1>
          <h4 className={classes.description}>
            Games Won: 5
          </h4>
          <h4 className={classes.description}>
            Games Lost: 122
          </h4>
          <h4 className={classes.description}>
            Total Games: 127
          </h4>
          <h4 className={classes.description}>
            Score (ELO): -5 LP
          </h4>
        </Card>
        <div className={classes.imgContainer}>
          <img src="https://lh3.googleusercontent.com/ogw/ADGmqu9MRmV9th8CboJblJP0PiUDHGVVMKHE5tnQV3sqZg=s192-c-mo" alt="thumbnail" />
        </div>
        <div>
          <Card>
            <h1 className={classes.descriptionContainer}>Test</h1>
            <h4 className={classes.description}>
              Daniel Emerson Bobish is a retired American
              mixed martial artist and professional wrestler.
              He was competing in the Super Heavyweight division.
              He is a former King of the Cage Super Heavyweight
            </h4>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
