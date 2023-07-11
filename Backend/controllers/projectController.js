const Project = require('../models/projectModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vvineeta2511@gmail.com',
        pass: 'noprolhinjlueqwb',
    },
});


const addProject = async (req, res) => {
    try {
        const { title, requirements, timeline, startDate, endDate, documents, members, technologyStack } = req.body;
        if (req.user.role !== 'mentor') {
            res.status(403).json({ message: 'Only mentors can add projects.' })
        }
        const createdBy = req.user._id
        console.log(" project_titl", title)
        const project = new Project({
            title, requirements, timeline, startDate, endDate, documents, members, technologyStack, createdBy
        })
        await project.save();
        const mailSend = {
            from: "vvineeta2511@gmail.com",
            to: members.join(','),
            subject: 'New Project Added',
            html: `
            <h1> Project Details <h1>
            <p>Title:${title}</p>
            <p>Requirements:${requirements}</p>
            <p>timeline:${timeline}</p>
            <p>Start Date:${startDate}</p>
            <p>End Date:${endDate}</p>
            <p>Documents:${documents}</p>
            <p>Technology Stack: ${technologyStack.join(',')}</p>
            `,
        }

        await transporter.semdMail(mailSend)

        res.status(201).json({ message: 'Project added Succesfully' });
    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ mesaage: 'Internal server error' })
    }
};

const listProjects = async (req, res) => {
    try {


        let projects;
        if (req.user.role === 'mentor') {
            projects = await Project.find({ cretedBy: req.user._id });
        }
        else if (req.user.role === 'employee') {
            projects = await Project.find({ members: req.user.email });
        }
        res.status(200)
            .json({ projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}



module.exports = { addProject, listProjects };