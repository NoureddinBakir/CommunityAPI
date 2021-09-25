const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = mongoose.Schema({
    communityName: {
        type: String,
        required: true
    },
    info :{
        created: {
            type: Date,
            default: Date.now,
            required: false
        },
        location: [{
            type: String,
            required: true
        }],
        description: {
            type: String,
            required: true
        }
    },
    admins: [{
            type: Schema.Types.ObjectId,
            required: false
        }]
});

module.exports = mongoose.model('Community', CommunitySchema);