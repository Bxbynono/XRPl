const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please tell us your name'],

    },
    cid:{
        type:Number,
        unique:true,
        require:[true, "Please provide cid"]
    },
    event: {
        type: String,
        require: [true, 'Please provide your event'],
        },
    date: {
        type: String,
        required: [true, 'Please provide a date'],
    },
    course: {
        type: String,
        required: [true, 'Please provide a course'],
    },
    points:{
        type:String
    }
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student
