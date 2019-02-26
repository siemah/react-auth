import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={
    props => !isAuthenticated ? <Component {...props} /> : <Redirect to='/dashboard' />
    } />
  )

GuestRoute.prototype = {
  isAuthenticated: PropTypes.bool.isRequired,
  component:PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(GuestRoute); 