const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please tell us your name'],

    },
    phoneNumber:{
        type:Number,
        require:[true, "Please provide phone number"]
    },
    secret: {
        type: String,
        require: [true, 'Please provide your secret key'],
        unique: true,
        },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    active: {
        type: Boolean,
        default: true,
        select: false,

    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword,
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User
