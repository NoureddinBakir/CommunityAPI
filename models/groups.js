const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const GroupsSchema = mongoose.Schema({
    communityId:{
        type: Schema.Types.ObjectId,
        required: false
    },
    groupName:{
        type: String,
        required: true,
    },
    groupInfo:{
        created: {
            type: Date,
            default: Date.now(),
            required: false
        },
        description: {
            type: String,
            required: true
        }
    },
    posts:[{
        type: Schema.Types.ObjectId,
        required: false
    }]
});

module.exports = mongoose.model('Groups', GroupsSchema);