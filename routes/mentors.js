const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const {isLoggedIn} = require('../middleware')
const catchAsync = require('../utils/catchAsync');

app.get('/', (req, res) => {
    res.render('mentor/index')
})

app.get('/new', (req, res) => {
    res.render('mentor/new')
})

app.post('/new', async(req, res) => {
    const mentor = new Mentor(req.body)
    await mentor.save()
    res.send(req.body)
})