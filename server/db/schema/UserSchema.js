import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: email,
        require: true,
        unique: true
    },
    password:{
        type: password,
        require: true
    }
});

module.exports = mongoose.model("users", UserSchema);