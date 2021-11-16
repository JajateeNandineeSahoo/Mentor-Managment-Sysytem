const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    registrationNumber: {
        type: Number,
        unique: true
    },
    rollNumber: {
        type: String,
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor' 
    },
    faculty: [{
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
    }]
});

module.exports = mongoose.model('Student', StudentSchema);