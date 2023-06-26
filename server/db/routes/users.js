const express = require("express");
const UserSchema = require("../schema/UserSchema");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/fetchUser");
var jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SEC = process.env.JWT_SEC;

// ROUT: 1 Creating a new user using: POST "/auth/signup" NO LOGIN REQUIRED
router.post("/signup", [
    // Checking the validations
    body('email', "Enter a valid email").isEmail(),
    body("name", "Name length should be min 3").isLength({ min: 3 }),
    body("password", "Password length should be min 8").isLength({ min: 8 })
],
    async (req, res) => {
        const errors = validationResult(req);
        // If errors then sending status 400 and array of errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };

        try {

            // If the given email alerady exist
            const isEmailExist = await UserSchema.findOne({ email: req.body.email });
            if (isEmailExist) {
                return res.status(400).json({ errors: "A user with this email already exist" });
            };

            const salt = await bcrypt.genSalt(10);
            // hashing password and adding salt with it
            const secPas = await bcrypt.hash(req.body.password, salt);
            console.log(secPas);

            //store the values in db
            const user = await UserSchema.create({
                name: req.body.name,
                email: req.body.email,
                password: secPas
            });

            const data = {
                user: {
                    id: user.id
                }
            };

            // Creating and sending an authentication token in responce
            const authToken = jwt.sign(data, JWT_SEC);
            res.json({ authToken });

        } catch (error) {
            res.json({ error });
            console.log(error);
        }
    }
);


// ROUT: 2 Login a new user using: POST "/auth/login" NO LOGIN REQUIRED
router.post("/login", [
    // Checking the validations
    body('email', "Enter a valid email").isEmail(),
    body("password", "Password can't be blanck").exists()
],
    async (req, res) => {

        const errors = validationResult(req);
        // If errors then sending status 400 and array of errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };

        const { email, password } = req.body;

        try {
            let user = await UserSchema.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: "Sorry no user exist with this email." });
            };

            // Comparing the given password and stored password
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ errors: "Wrong password." });
            };

            const data = {
                user: {
                    id: user.id
                }
            };

            // Creating and sending an authentication token in responce
            const authToken = jwt.sign(data, JWT_SEC);
            res.json({ authToken });
        }
        catch (error) {
            res.json({ error });
            console.log(error);
        }
    }
);


// ROUT: 3 Get login user details using: POST "/auth/getuser" LOGIN REQUIRED
router.post("/getuser", fetchUser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await UserSchema.findById(userId).select("-password");
            res.send(user);
        }
        catch (error) {
            res.json({ error });
            console.log(error);
        }
    }
);

module.exports = router;