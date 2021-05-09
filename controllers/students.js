const Students = require('../models/student');
const nodemailer = require('nodemailer');


module.exports.index = (req, res) => {
    res.render('students/index');
}

module.exports.contact = (req, res) => {
    res.render('students/contact');
}

module.exports.profile = (req, res) => {
    res.render('students/profile');
}

module.exports.mentors = (req, res) => {
    res.render('students/mentors');
}

module.exports.faculties = (req, res) => {
    res.render('students/faculties');
}

module.exports.sendContact = (req, res) => {
    const output = `
    <h5>You have a new query from your Mentee</h5>
    <h1>Name: ${req.body.name}</h1>
    <ul>  
    <li>Name: ${req.body.branch}</li>
    <li>Company: ${req.body.semester}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
    secure: false,
        auth: {
            user: '', // generated ethereal user
            pass: ''  // generated ethereal password
        }
      });

    let mailOptions = {
        from: `"Mentee Query" ${req.body.semail}`, // sender address
        to: `${req.body.memail}`, // list of receivers
        subject: `${req.body.subject}`, // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
        res.render('/');
    });
}