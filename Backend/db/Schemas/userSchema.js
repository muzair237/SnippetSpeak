const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String
    },
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
});

module.exports = new mongoose.model("users",userSchema);
