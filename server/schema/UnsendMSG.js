const mongoose = require('mongoose');
const { Schema } = mongoose;

const UnsendMSG = new Schema({
    senderId: {
        type: String
    },
    reciverId: {
        type: String
    },
    message: {
        type: String
    }
});

const collectedMSG = mongoose.model("UnsendMessages", UnsendMSG);
module.exports = collectedMSG;