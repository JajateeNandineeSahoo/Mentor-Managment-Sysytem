const express = require('express');
const router = express.Router();
const Faculty = require('../models/faculty');
const {isLoggedIn} = require('../middleware')
const catchAsync = require('../utils/catchAsync');

app.get('/', (req, res) => {
    res.render('faculty/index')
})

app.get('/new', (req, res) => {
    res.render('faculty/new')
})

app.post('/new', async(req, res) => {
    const faculty = new Faculty(req.body)
    await faculty.save()
    res.send(req.body)
})