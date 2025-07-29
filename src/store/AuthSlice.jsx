import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    userData : null
}

export const Auth = createSlice({
    name : 'Auth',
    initialState,
    reducers :
    {
        login : (state,action)=>
        {
          state.isAuthenticated = true,
          state.userData = action.payload  
        },
        logout : (state,action)=>
        {
           state.isAuthenticated = false,
           state.userData = null
        }
    }
     
})


export default Auth.reducer;
export const {login,logout} = Auth.actions;
