const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Students = require('../models/student');
const students = require('../controllers/students')
const {isLoggedIn} = require('../middleware')

router.route("/")
    .get(isLoggedIn, students.index);

router.route("/contact")
    .get(isLoggedIn, students.contact)
    .post(isLoggedIn, students.sendContact);

router.route("/profile")
    .get(isLoggedIn, students.profile);

router.route("/mentors")
    .get(isLoggedIn, students.mentors);

router.route("/faculties")
    .get(isLoggedIn, students.faculties);

module.exports = router;
