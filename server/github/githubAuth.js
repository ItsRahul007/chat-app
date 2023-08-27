const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SEC = process.env.CLIENT_SEC;
const UserSchema = require("../schema/UserSchema");


router.get("/getAccessToken", async (req, res) => {
    // Adding the necessary parameaters
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SEC + "&code=" + req.query.code;

    // Returning the the goted reasults
    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({errors: "Some server error occerd"});
        });
});

// Getting the user data and sending responce according to the email existence
router.post("/getUserData", async (req, res) => {
    try {
        const responce = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                "Authorization": req.get("Authorization")
            }
        });

        const data = responce.json();
        if (!data.email) return res.json({ errors: "We can't get your email address. Please try to login with another option" });

        // If the email already exist then just sending email for login else sending the data for creating a new user
        const isEmailExist = await UserSchema.find({email: data.email});
        if(isEmailExist) res.json({email: data.email})
        else res.json({"newUser": data});

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;