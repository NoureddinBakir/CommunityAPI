const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema

const ContactsSchema = mongoose.Schema({
    contactId:{
        type: Number,
        required: false
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
        required: true
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
    managedContacts: [{
        contactId: {
            type: Schema.Types.ObjectId,
            required: false
        }
    }]
});

module.exports = mongoose.model('Contact', ContactsSchema);