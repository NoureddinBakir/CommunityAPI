const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const AdminsSchema = mongoose.Schema({
    contactId:{
        type: Number,
        required: true
    },
    groups:[{
        type: Schema.Types.ObjectId,
        required: false
    }],
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    number: {
        type: String,
        required: false
    },
    role: [{
        type: Schema.Types.ObjectId,
        required: false
    }],
    password:{
        type: String,
        required: false
    },
    personalInfo: {
        dob: {
            type: Date,
            required: false
        },
        accessibility: [{
            type: String,
            required: false
        }]
    },
    managedAdmins: [{
        contactId: {
            type: Schema.Types.ObjectId,
            required: false
        }
    }]
});

module.exports = mongoose.model('Admin', AdminsSchema);