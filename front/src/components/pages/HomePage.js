import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { logout } from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => {
  return (
    <div>
      <h1>Home page</h1>
      { 
        isAuthenticated ?
          <button onClick={logout}>logout</button> :
          <>
            <Link to='/login'>Login</Link> or 
            <Link to='/signup'>signup</Link>
          </>
      }
    </div>
  )
}

HomePage.propTypes = {
  isAutheenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.user.token,
  }
};

export default connect(mapStateToProps, { logout })(HomePage);