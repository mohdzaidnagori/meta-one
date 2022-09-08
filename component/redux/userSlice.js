import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user',
    initialState: {
        user: null,
        pending: true,
        error: false,
      },
    reducers:{
          
            loginStart: (state) => {
              state.pending = true;
            },
            loginSuccess: (state, action) => {
              state.pending = false;
              state.user = action.payload;
            },
            loginFailure: (state) => {
              state.pending = false;
              state.error = true;
            },
          
            logout: (state) => {
            state.user =  null
            },

    }
})

export const {loginStart ,loginSuccess,loginFailure, logout} = userSlice.actions
export const selectUser = (state) => state.user.user;
export const loginPending = (state) => state.user.pending;
export const loginError = (state) => state.user.error;
export default userSlice.reducer;