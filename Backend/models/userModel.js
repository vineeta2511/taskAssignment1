const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['mentor', 'employee'],
        required: true,
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
