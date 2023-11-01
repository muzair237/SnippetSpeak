import { createSlice } from "@reduxjs/toolkit";
import { getLogin } from "./thunk";

const initialState = {
    user: {},
    loading: false,
    errorMsg: ""
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getLogin.pending, (state, action) => {
                state.loading = true;
                state.user = {};
                state.errorMsg = ""
            })
            .addCase(getLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.errorMsg = ""
            })
            .addCase(getLogin.rejected, (state, action) => {
                state.loading = false;
                state.user = {};
                state.errorMsg = action.payload
            })
    }
})

export default authSlice.reducer;