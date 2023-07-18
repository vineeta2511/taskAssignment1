const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    timeline: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    documents: [String],
    members: [String],
    technologyStack: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;