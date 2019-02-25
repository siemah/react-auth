import api from '../api';

export const userLoggedIn = user => ({
  type: "USER_LOGGED_IN",
  user,
})

export const login = credentials => dispatch => 
  api.user.login(credentials).then(user => {
    localStorage.jwt = user.token;
    dispatch(userLoggedIn(user));
  }) 
