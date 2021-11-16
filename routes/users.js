const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Student = require('../models/student')
const flash = require('connect-flash');


router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const {email, username, password} = req.body
        const registrationNumber = username
        const student = await Student.findOne({ registrationNumber })  
        if(student) {
            const user = new User( { email, username })
            const registeredUser = await User.register(user, password)
            req.login(registeredUser, err => {
                if (err) 
                    return next(err);
                req.flash('success', 'Welcome to Mentor Management System!');
                res.redirect('/students');
            })
        } else {
            res.send('Invalid Username')
        }
    } catch(e) {
        res.send('Error')
        req.flash('error', e.message);
        res.redirect('/register');
    } 
    
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect('/students')
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "See You Soon!");
    res.redirect('/');
})

module.exports = router;