const mongoose = require("mongoose");
require("dotenv").config({ path: `.env.local`, override: true });

function connectMongo(){
    mongoose.connect(process.env.MONGO_URL);
    console.log("mongo connected successfully");
};

module.exports = connectMongo;