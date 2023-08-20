const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    avatar:{
        type: String
    },
    image:{
        image: String
    },
    about:{
        type: String,
        require: true
    },
    block: {
        blockedChat:{
            type: Array
        },
        blockedBy:{
            type: Array
        }
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;