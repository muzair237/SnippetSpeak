import { createSlice } from "@reduxjs/toolkit";
import { getAllBlogs } from "./thunk";

const initialState = {
    blogs:[],
    loading:false,
    errorMsg: ""
}

const blogSlice = createSlice({
    name: "Blog",
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(getAllBlogs.pending,(state,action)=>{
            state.loading = true;
            state.blogs = [];
            state.errorMsg = ""
        })
        .addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.loading = false;
            state.blogs = action.payload;
            state.errorMsg = ""
        })
        .addCase(getAllBlogs.rejected,(state,action)=>{
            state.loading = false;
            state.blogs = [];
            state.errorMsg = action.payload
        })
    }
})

export default blogSlice.reducer;