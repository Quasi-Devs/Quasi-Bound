import React from 'react';
import PropTypes from 'prop-types';

const EnemySlots = ({ val }) => (
  <div
    aria-hidden="true"
    className={val ? 'enemyPlaced' : 'enemySlots'}
  >
    {}
  </div>
);

EnemySlots.propTypes = {
  val: PropTypes.bool.isRequired,
};

export default EnemySlots;
