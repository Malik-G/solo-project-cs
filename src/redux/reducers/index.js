import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import userReducer from './userReducer';
import portfolioReducer from './portfolioReducer';
import watchListReducer from './watchListReducer';
import communityReducer from './communityReducer';
//import memberUsernameReducer from './memberUsernameReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga


// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // contains a value of 'login' or 'registration' to control which screen is shown
  communityReducer,
  portfolioReducer, // contains a SQL result from the /api/portfolio GET request
  userReducer, // contains an id and username if someone is logged in
  watchListReducer,
  //memberUsernameReducer
});

export default rootReducer;
