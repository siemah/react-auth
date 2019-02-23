export const user = (state={}, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.user
      break;
  
    default:
      return state;
      break;
  }
}