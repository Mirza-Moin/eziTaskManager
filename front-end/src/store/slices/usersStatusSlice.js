import { createSlice } from "@reduxjs/toolkit";
import { usersStatus } from "../thunks/userThunk/usersStatus";

const usersStatusSlice = createSlice({
    name: "usersStatus",
    initialState:{
        users:[],
        feedbacks:[],
        isLoading: false,
        error: null
    },
    extraReducers(builder){
        builder.addCase(usersStatus.pending,(state,action)=>{
            state.isLoading = true
        });
        builder.addCase(usersStatus.fulfilled,(state,action)=>{
            state.isLoading = false
            state.users = action.payload.users
            state.feedbacks = action.payload.feedbacks
        });
        builder.addCase(usersStatus.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.error
        })
    }


})

export const usersStatusReducer = usersStatusSlice.reducer