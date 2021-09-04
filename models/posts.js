const mognoose = require('mongoose');

// Creating schema

const PostsSchema = mognoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mognoose.model('Posts', PostsSchema);