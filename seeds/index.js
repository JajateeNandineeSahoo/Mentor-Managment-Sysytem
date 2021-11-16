const students = require('./students')
const faculties = require('./faculties')
const mentors = require('./mentors')
const Student = require('../models/student')
const Faculty = require('../models/faculty')
const Mentor = require('../models/mentor')
const mongoose = require('mongoose')
const student = require('../models/student')

mongoose.connect('mongodb://localhost:27017/mentor-management-system', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const importMentorData = async() => {
//     try {
//         await Mentor.deleteMany({});
//         await Mentor.insertMany(mentors);
//     } catch(e) {
//         console.log("Error with mentor data import", e.message)
//     }
// }

// const importStudentData = async() => {
//     try {
//         await Student.deleteMany({})
//         for(let i = 0; i < 69; i++) {
//             const random = Math.floor(Math.random() * 14)
//             const student = new Student({
//                 name: students[i].name,
//                 registrationNumber: students[i].registrationNumber,
//                 rollNumber: students[i].rollNumber,
//                 branch: students[i].branch,
//                 year: students[i].year,
//                 email: students[i].email,
//                 phoneNumber: students[i].phoneNumber,
//                 street: students[i].street,
//                 landmark: students[i].landmark,
//                 city: students[i].city,
//                 state: students[i].state,
//                 country: students[i].country,
//                 mentor: mentors[random]
//             })
//         await student.save()
//         }
//     } catch(e) {
//         console.log("Error with data import",e.message);
//     }
// }

const importStudentData = async() => {
    try {
        await Student.deleteMany({});
        await Faculty.deleteMany({});
        await Mentor.deleteMany({});
        await Student.insertMany(students);
        await Faculty.insertMany(faculties);
        await Mentor.insertMany(mentors);
        console.log("Data Imported Sucessfully!!!");
    } catch(e) {
        console.log("Error with data import",e.message);
    }
}

importStudentData().then(() => {
    mongoose.connection.close();
})