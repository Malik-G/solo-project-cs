const communityReducer = (state = [], action) => {
   switch (action.type) {
     case 'COMMUNITY':
       return action.payload;
     default:
       return state;
   }
 };
 
 export default communityReducer;