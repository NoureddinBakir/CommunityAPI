const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const ChatsSchema = mongoose.Schema({
    members:[{
        type: Schema.Types.ObjectId,
        required: true
    }],
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        default: ""
    }
});

module.exports = mongoose.model('Chats', ChatsSchema);