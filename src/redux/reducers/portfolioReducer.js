import { combineReducers } from 'redux';

const portfolioReducer = (state = [], action) => {
  switch (action.type) {
    case 'PORTFOLIO':
      return action.payload;
    default:
      return state;
  }
};

const memberUsernameReducer = (state = [], action) => {
   switch (action.type) {
     case 'MEMBER_USERNAME':
       return action.payload;
     default:
       return state;
   }
 };

 export default combineReducers({
   portfolioReducer,
   memberUsernameReducer,
 });
 
 //export default portfolioReducer
