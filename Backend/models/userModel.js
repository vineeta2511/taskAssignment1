const mongoose = require('mongoose');

const empSchema = mongoose.Schema({

    email: {
        type: String,
        require: [true, 'Enter your EMAIL'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Enter your PASSWORD']
    },
    role: {
        type: String,
        enum: ['mentor','employee'],
        required: [true, 'SELECT your ROLE']
    },

},
    { timestamps: true })

module.exports = mongoose.model("User_info:", empSchema)