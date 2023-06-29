var jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SEC = process.env.JWT_SEC;

const fetchUser = (req, res, next) =>{
    // Get the user from jwt token and add id to req object
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    };

    try {
        const data = jwt.verify(token, JWT_SEC);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ errors: "Please authenticate using a valid token" });    
    };
};

module.exports = fetchUser;