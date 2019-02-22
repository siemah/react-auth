import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';

export default function App() {
  return (
    <div>
      <Route path='/' exact component={HomePage} />
      <Route path='/login' exact component={LoginPage} />
    </div>
  )
}
