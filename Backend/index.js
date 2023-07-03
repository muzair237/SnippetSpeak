const express = require("express");
require("./db/config");
const cors = require('cors')
const app = express();
app.use(cors());

app.use("/signup",require('./routes/signup'));
app.use("/login",require('./routes/login'));
app.use("/createBlog",require('./routes/createBlog'));
app.use("/getBlog",require('./routes/getBlog'));
app.use("/updateLikes",require('./routes/updateLikes'));
app.use("/decLikes",require('./routes/decLikes'));
app.use("/getDataByID",require('./routes/getDataByID'));
app.use("/getBlogByID",require('./routes/getBlogByID'));
app.use("/getTotalLikes",require('./routes/getTotalLikes'));
app.use("/deleteBlog",require('./routes/deleteBlog'));
app.use("/updateBlog",require('./routes/updateBlog.js'));
app.use("/getDataforUpdation",require('./routes/getDataforUpdation.js'));
app.use("/search",require('./routes/search.js'));

app.listen(3001);