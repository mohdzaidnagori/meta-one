// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './userslice'

// export const store = configureStore({
//     reducer:{
//         user:userReducer
//     }
// })

import { createSlice } from "@reduxjs/toolkit"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import logger from "redux-logger";



const initialState = {
    notes:[]
}

export const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
        create:{
            reducer:(state,action) => {
                state.notes.push(action.payload)
            }
        },
        DeleteNote: (state) => {
            state.notes.splice(0, state.length);
        },

       
    }
})
export const { create: AddNote,DeleteNote } = notesSlice.actions;
const reducer = {
    notes: notesSlice.reducer,

};
const middleware = [...getDefaultMiddleware()];
export default configureStore({
  reducer,
  middleware
});