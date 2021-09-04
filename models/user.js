const mognoose = require('mongoose');

// Creating schema

const UserSchema = mognoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        max: 6
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mognoose.model('User', UserSchema);