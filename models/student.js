const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    registrationNumber: Number,
    rollNumber: String,
    branch: String,
    email: String,
    phoneNumber: Number
});

module.exports = mongoose.model('Student', StudentSchema);