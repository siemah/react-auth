import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css'

import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

/**
 * check is user is logged before then dispatch 
 * a userLoggedIn action
 */
if( localStorage.jwt ) {
  let user = { token: localStorage.jwt };
  store.dispatch( userLoggedIn( user ) );
}

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App /> 
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
