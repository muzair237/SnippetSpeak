const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken")
const userModel = require("../db/Schemas/userSchema");
router.use(express.json());

router.get("/:id",verifyToken,async (req, res) => {
    try {
        let data = await userModel.findById(req.params.id);
        res.send(data.fullname);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
