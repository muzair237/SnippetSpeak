const express = require("express");
const verifyToken = require("../verifyToken")
const router = express.Router();
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.get("/",verifyToken,async (req, res) => {
    try {
        let data = await blogModel.find({});
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
