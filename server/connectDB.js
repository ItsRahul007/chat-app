const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/chat-app";

function connectMongo(){
    mongoose.connect(url);
    console.log("mongo connected successfully");
};

module.exports = connectMongo;