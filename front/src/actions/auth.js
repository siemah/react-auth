import api from '../api';

const userLoggedIn = user => ({
  type: "USER_LOGGED_IN",
  user,
})

export const login = credentials => dispatch => 
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user))) 
