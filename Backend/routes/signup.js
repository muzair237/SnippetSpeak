const express = require("express");
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const key = 'blog';
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require("../db/Schemas/userSchema");
router.use(express.json());

router.post("/", [
    body("fullname").isLength({ min: 3 }).withMessage("Invalid FullName."),
    body("username").isLength({ min: 4 }).withMessage(" Invalid Username."),
    body("email").isEmail().withMessage(" Invalid email address."),
    body("password").isLength({ min: 6 }).withMessage(" Password must be at least 6 characters long.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    }
    try {
        const { username, email } = req.body;
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username && existingUser.email === email) {
                return res.status(409).json({ errors: "A user with this 'Username' and 'Email' already exists" });
            } else if (existingUser.username === username) {
                return res.status(409).json({ errors: "A user with this username already exists" });
            } else if (existingUser.email === email) {
                return res.status(409).json({ errors: "A user with this email address already exists" });
            }
        }
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password,salt);
        let data = new userModel({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: secPass
        });
        data = await data.save();
        data = data.toObject();
        delete data.password;
        Jwt.sign({ data }, key, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                res.send({ result: "Something Went Wrong!" });
            } else {
                res.send({ data, auth: token });
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
