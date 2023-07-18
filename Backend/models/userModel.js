const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter your name"],
    },
    email: {
        type: String,
        required: [true, 'Enter your EMAIL'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter your PASSWORD']
    },
    role: {
        type: String,
        enum: ['mentor', 'employee'],
        required: [true, 'SELECT your ROLE']
    },
    resetOtp: {
        type: String,
        default: null
    },
    resetOtpExpiration: {
        type: Date,
        default: null
    },


},
    { timestamps: true });



module.exports = mongoose.model("User", empSchema);
