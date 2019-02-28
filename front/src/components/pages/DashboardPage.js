import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmedMessage from '../messages/ConfirmedMessage';
import { Link } from 'react-router-dom';

const DashboardPage = ({ confirmed }) => {
  return (
    <div>
      {
        !confirmed && <ConfirmedMessage />
      }
      <Link to='/'>Home</Link>
    </div>
  )
}

DashboardPage.propTypes = {
  confirmed: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    confirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps)(DashboardPage);
