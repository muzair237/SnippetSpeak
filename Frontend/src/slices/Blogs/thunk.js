import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBlogs = createAsyncThunk(
    "blogs/getAllBlogs",
    async () => {
        try {
            return await axios.get("http://localhost:3001/getBlog", {
                headers: {
                    Authorization: `${JSON.parse(localStorage.getItem("auth"))}`,
                },
            });

            // Handle the response here
            console.log(response.data);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }

    }
)