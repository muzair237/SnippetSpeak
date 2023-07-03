const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken")
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.get("/:key",verifyToken, async (req, res) => {
    const key = req.params.key;
    const regex = new RegExp(key, "i");
    const data = await blogModel.find({
        $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } }
        ]
    });
    res.send(data);
});

module.exports = router;
