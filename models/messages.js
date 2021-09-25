const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const MessagesSchema = mongoose.Schema({
    chatId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
    },
    sender:{
        type: Schema.Types.ObjectId,
        required: false
    },
    sent:{
        type: Date,
        default: Date.now(),
        required: false
    }
});

module.exports = mongoose.model('Messages', MessagesSchema);