const schoolDetailsReducer = (state, action) => {
    switch (action.type) {
       case 'SET_DOMAIN_NAME':
         return {
           ...state,
           schoolDomainName: action.payload,
         };
       default:
         return state;
     }
   };
   
   export default schoolDetailsReducer;
   