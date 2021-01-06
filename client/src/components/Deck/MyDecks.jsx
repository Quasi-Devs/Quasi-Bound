import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const MyDecks = ({ user }) => {
  const [decks, setDecks] = useState([]);
  useLayoutEffect(() => {
    if (user) {
      console.info(user);
      setDecks(user);
    }
  }, [user]);

  return (
    <div>
      {decks.name_user}
    </div>
  );
};

MyDecks.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default MyDecks;
