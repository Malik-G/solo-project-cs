const portfolioReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PORTFOLIO':
      return action.payload;
    case 'ALL_PORTFOLIOS':
      return action.payload;
    default:
      return state;
  }
};

export default portfolioReducer;