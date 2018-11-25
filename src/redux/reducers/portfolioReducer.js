const portfolioReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PORTFOLIO':
      return action.payload;
   case 'USER_PORTFOLIO':
      return action.payload;
    default:
      return state;
  }
};

export default portfolioReducer;