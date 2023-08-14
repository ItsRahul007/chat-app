const mongoose = require('mongoose');
const { Schema } = mongoose;

const UnsendMSG = new Schema({
    senderId: {
        type: String,
        require: true
    },
    reciverId: {
        type: String,
        require: true
    },
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    msgId: {
        type: String,
        require: true
    }
});

const collectedMSG = mongoose.model("UnsendMessages", UnsendMSG);
module.exports = collectedMSG;