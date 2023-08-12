const mongoose = require('mongoose');
const { Schema } = mongoose;

const pendingDelete = new Schema({
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
    }
});

const DeleteMSG = mongoose.model("MessageDelete", pendingDelete);
module.exports = DeleteMSG;