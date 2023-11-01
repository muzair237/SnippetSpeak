import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getLogin = createAsyncThunk(
    "login/getLogin",
    async ({ loginInfo, navigate }) => {
        try {
            const response = await axios.post("http://localhost:3001/login", loginInfo, {
                headers: {
                },
            });
            if(response.auth) {
                localStorage.setItem("users", JSON.stringify(response.user));
                localStorage.setItem("auth", JSON.stringify(response.auth));
                navigate("/");
            } else {
                console.log(response.errors);
            }
            // Handle the response here
            console.log(response.data);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    }

)