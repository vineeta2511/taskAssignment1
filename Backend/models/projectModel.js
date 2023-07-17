const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
    },
    requirements: {
        type: String,
        require: true,
    },
    timeline: {
        type: String,
        require: true,
    },
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
    documents: [String],
    members: [String],
    technologyStack: [String],
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;