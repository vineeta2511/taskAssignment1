const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({

    email: {
        type: String,
        require: [true, 'Enter your EMAIL'],
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

},
    { timestamps: true });
    


const User = mongoose.model("User", empSchema);

module.exports = User;