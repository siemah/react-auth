import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmedMessage from '../messages/ConfirmedMessage';
import { Link } from 'react-router-dom';

const DashboardPage = ({ isConfirmed }) => {
  return (
    <div>
      {
        !isConfirmed && <ConfirmedMessage />
      }
      <Link to='/'>Home</Link>
    </div>
  )
}

DashboardPage.prototype = {
  isConfirmed: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    isConfirmed: !!state.user.isConfirmed
  }
}

export default connect(mapStateToProps)(DashboardPage);
