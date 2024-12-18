const mongoose = require('mongoose');

// define pernson schema
const pernsonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,

    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required:true
    },
    mobile: {
        type: String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required: true
    },
    address:{
        type: String

    },
    salary:{
        type: Number,
        required:true
    },
    username:{
        type: String,
        required:true
    },

    password:{
        type: String,
        required:true
    }
});

// create person model

const Person = mongoose.model('Person', pernsonSchema);
module.exports = Person;