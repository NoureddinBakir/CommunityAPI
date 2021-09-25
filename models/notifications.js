const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const NotificationsSchema = mongoose.Schema({
    created:{
        type: Date,
        default: Date.now(),
        required: false
    },
    start:{
        type: Date,
        required: false,
    },
    end:{
        type: Date,
        required: false,
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    info:{
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        image:{
            type: String,
            required: false
        }
    },
    recipientGroup:[{
        type: Schema.Types.ObjectId,
        required: false
    }]
});

module.exports = mongoose.model('Notifications', NotificationsSchema);