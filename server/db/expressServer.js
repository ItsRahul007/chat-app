const express = require("express");
const connectMongo = require("./connectDB");
const app = express();
const port = 4000;
connectMongo();

function expressData(){
    //Avalible routes
    app.use("/users")
    
    app.listen(port, () => {
        console.log(`app listen on http://localhost:${port}`);
    });
}

module.exports = expressData;

// TODO: wrap this whole file inside an function and export it and run it on index.js file with nodemon.