const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const CustomGroupsSchema = mongoose.Schema({
    groupId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    groupName:{
        type: String,
        required: true,
    },
    groupType:{
        type: String,
        required: true
    },
    groupInfo:{
        created: {
            type: Date,
            default: Date.now(),
            required: true
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

module.exports = mongoose.model('CustomGroups', CustomGroupsSchema);