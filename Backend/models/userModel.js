const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
username:{
    type:String,
    required : [true,"Enter your name"],
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

},
    { timestamps: true });
    


module.exports = mongoose.model("User", empSchema);
