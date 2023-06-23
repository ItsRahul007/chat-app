const express = require("express");
const UserSchema = require("../schema/UserSchema");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Creating a new user using: POST "/auth/signup" NO LOGIN REQUIRED
router.post("/signup", [
    // Checking the validations
        body('email', "Enter a valid email").isEmail(),
        body("name", "Name length should be min 3").isLength({ min: 3 }),
        body("password", "Password length should be min 8").isLength({ min: 8 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        // If errors then sending status 400 and array of errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };
        res.send(req.body);
        // TODO: store the values in db
    });

module.exports = router;