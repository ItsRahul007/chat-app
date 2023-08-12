const mongoose = require('mongoose');
const { Schema } = mongoose;

const pendingUpdate = new Schema({
    reciverId: {
        type: String,
        require: true
    },
    senderId: {
        type: String,
        require: true
    },
    msgId: {
        type: String,
        require: true
    },
    newContent: {
        type: String,
        require: true
    }
});

const UpdateMSG = mongoose.model("MessageUpdate", pendingUpdate);
module.exports = UpdateMSG;