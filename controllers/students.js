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
    <li>Branch: ${req.body.branch}</li>
    <li>Semester: ${req.body.sem}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message: ${req.body.msg}</h3>
    `;

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: 'googlysahoo9', // generated ethereal user
            pass: 'Gg8280080602@'  // generated ethereal password
        }
      });

    let mailOptions = {
        from: `${req.body.semail}`, // sender address
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
      
        res.render('/students');
    });
}