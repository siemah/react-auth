import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const HomePage = ({ isAuthenticated }) => {
  return (
    <div>
      <h1>Home page</h1>
      { 
        isAuthenticated ?
          <button >logout</button> :
          <Link to='/login'>Login</Link>
      }
    </div>
  )
}

HomePage.propTypes = {
  isAutheenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.user.token
  }
};

export default connect(mapStateToProps)(HomePage);