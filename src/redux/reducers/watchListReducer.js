const watchListReducer = (state = [], action) => {
   switch (action.type) {
     case 'WATCH_LIST':
       return action.payload;
     default:
       return state;
   }
 };
 
 export default watchListReducer;