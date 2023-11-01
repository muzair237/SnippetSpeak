import { combineReducers } from "redux";
import blogsReducer from "./Blogs/reducer"
import authReducer from "./Authentication/reducer"


const rootReducer = ({
    Blogs: blogsReducer,
    Auth: authReducer
}) 

export default rootReducer;