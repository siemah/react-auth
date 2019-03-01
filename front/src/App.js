import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types'
// Components Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage'; 
import ConfirmationPage from './components/pages/ConfirmationPage'; 

//Routes Components()HOC
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = ({ location }) => {
  return (
    <div className="ui container">
      <Route location={location} exact path='/'  component={HomePage} />
      <GuestRoute location={location} path='/login' exact component={LoginPage} />
      <GuestRoute location={location} path='/signup' exact component={SignupPage} />
      <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
      <UserRoute location={location} path='/confirmation/:token' exact component={ConfirmationPage} />
    </div>
  )
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
}

export default App;