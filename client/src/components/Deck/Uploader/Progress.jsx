import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ progress }) => (
  <div className="progressBar">
    <div className="progress" style={{ width: `${progress}%` }} />
  </div>
);

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Progress;
