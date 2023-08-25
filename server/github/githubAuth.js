const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SEC = process.env.CLIENT_SEC;


router.get("/getAccessToken", async (req, res) => {
    console.log(req.query.code);

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SEC + "&code=" + req.query.code + "&state=chat-app&token_type=bearer";

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
            console.log(data);
            return res.json(data);
        })
        .catch(err => console.log(err));
});

router.post("/getUserData", async (req, res) => {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err));
});

module.exports = router;