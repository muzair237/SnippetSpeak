const express = require("express");
const { body, validationResult } = require('express-validator');
const verifyToken = require("../verifyToken")
const router = express.Router();
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.post("/",verifyToken, [
    body("title").isLength({ max: 50 }).withMessage("Title exceeded 50 characters."),
    body("description").isLength({ max: 325 }).withMessage(" Only 325 Charcters are Allowed in Description."),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
        let data = await blogModel(req.body);
        data = await data.save();
        res.send({ data: data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
