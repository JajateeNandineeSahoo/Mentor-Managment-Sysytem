const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Student = require('../models/student');
const User = require('../models/user')
const {isLoggedIn} = require('../middleware')
const catchAsync = require('../utils/catchAsync');

router.get('/', isLoggedIn, async (req, res) => {
    const currentUsername = req.user.username
    const student = await Student.findOne({ registrationNumber: currentUsername })
    res.render('students/index', { student })
})

router.get('/create', isLoggedIn, (req, res) => {
    res.render('students/create')
})

router.post('/create', isLoggedIn, catchAsync(async (req, res) => {
    const student = new Student(req.body)
    await student.save()
    res.send(student)
}))

router.get('/edit', isLoggedIn, async(req, res) => {
    const registrationNumber = req.user.username
    const student = await Student.findOne({registrationNumber})
    res.render('students/edit', { student })
})

router.put('/edit', isLoggedIn, async(req, res) => {
    try {
        const username = req.user.username
        const registrationNumber = username
        const body = req.body
        const student = await Student.findOne({ registrationNumber })
        if(student.registrationNumber != body.registrationNumber) {
            const newStudent = await Student.findOneAndUpdate({registrationNumber}, {...req.body})
            const newUser = await User.findOneAndUpdate({username}, {username: body.registrationNumber})
            res.redirect('/students')
        } else {
            const newStudent = await Student.findOneAndUpdate({registrationNumber}, {...req.body})
            res.redirect('/students')
        }
    } catch(e) {
        console.log(e)
    }
})

router.delete('/profile', isLoggedIn, async(req, res) => {
    const registrationNumber = req.user.username
    const student = await Student.findOneAndDelete(registrationNumber)
    console.log("Deleted Sucessfully", student)
})

router.get('/contact', isLoggedIn, (req, res) => {
    res.render('students/contact')
})

router.post('/contact', isLoggedIn, (req, res)=> {
    res.send(req.body)
})

router.get('/profile', isLoggedIn, async (req, res) => {
    const currentUsername = req.user.username
    const student = await Student.findOne({ registrationNumber: currentUsername })
    res.render('students/profile', { student })
})

router.get('/mentors', isLoggedIn, (req, res) => {
    res.render('students/mentors')
})

router.get('/faculties', isLoggedIn, (req, res) => {
    res.render('students/faculties')
})

module.exports = router;
