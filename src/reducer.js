export const initialState ={
    user:null,
    name:null,
    isNewUser:false,
    email:null
};

export const actionTypes={
    SET_USER :"SET_USER",
};

const reducer =(state,action) =>{
   console.log(action);
   switch(action.type){
       case actionTypes.SET_USER:
           return{
               ...state,
               user:action.user,
               name:action.name,
               email:action.email,
               isNewUser:action.isNewUser,
           };

           default:
               return state;
   }
};

export default reducer;