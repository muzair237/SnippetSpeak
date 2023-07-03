const express = require("express");
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const key = 'blog';
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require("../db/Schemas/userSchema");
router.use(express.json());

router.post("/", [
    body("usernameorEmail").notEmpty().withMessage(" Invalid Username or Email."),
    body("password").notEmpty().withMessage(" Password must be at least 6 characters long.")
], async (req, res) => {
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    }
    try {
        const { usernameorEmail, password } = req.body;
        let user;
        if (isValidEmail(usernameorEmail)) {
            user = await userModel.findOne({ email: usernameorEmail });
        } else {
            user = await userModel.findOne({ username: usernameorEmail });
        }
        if (!user) {
            return res.status(400).json({ errors: "Invalid username or email." });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ errors: "Invalid password." });
        } else {
            user = user.toObject();
            delete user.password;
            Jwt.sign({ user }, key, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something Went Wrong!" });
                } else {
                    res.send({ user, auth: token });
                }
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: "Server error." });
    }
})
module.exports = router;