const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    likes:{
        type: Number,
        defaut: 0
    },
    authorID: {
        type: String
    },
    authorName: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model("blog",blogSchema);