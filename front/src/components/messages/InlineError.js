import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ message }) => {
  return (
    <span style={{ color: '#a55856' }}>{message}</span>
  )
};

InlineError.prototype = {
  message: PropTypes.string.isRequired,
}

export default InlineError;


