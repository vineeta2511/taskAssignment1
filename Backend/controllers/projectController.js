const paginatedResults = require('../middlewares/pagination');
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

        const { role, _id } = req.user;
        console.log('User Role:', role);

        if (role == 'mentor') {
            const project = new Project({
                title, requirements, timeline, startDate, endDate, documents, members, technologyStack,

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

            await transporter.sendMail(mailSend)

            res.status(201).json({ message: 'Project added Succesfully' });
        }
        else {
            return res.status(403).json({ message: 'Only mentor can add projects.' })
        }

    } catch (err) {
        console.log("Error1", err);
        res.status(500).json({ mesaage: 'Internal server error' })
    }
};

const listProjects = async (req, res) => {
    try {
        const { role, _id, email } = req.user;
        console.log("user")
        let query;

        if (role === 'mentor') {
            query = { createdBy: _id };
        }
        else if (role === 'employee') {
            query = { members: email }
        }
        
        const paginatedProjects = await paginatedResults(Project,req.query.search,req.query.sortFiels,req.query.sortOrder)(req,res);
        const projects = paginatedProjects.data;
        

        if (projects.length === 0) {
            let message;
            if (role === 'mentor') {
                message = 'You have not added any projects yet.';
            } else if (role === 'employee') {
                message = 'You are not assigned to any projects.';
            }
            return res.status(200).json({ message, projects });
        }
        res.paginationResults = {
            currentPage: paginatedProjects.currentPage,
            totalPages: paginatedProjects.totalPages,
            totalItems: paginatedProjects.totalItems,
            data: projects,
        };

        

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });

    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, requirements, timeline, startDate, endDate, documents, members, technologyStack } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(id,
            {
                title, requirements, timeline, startDate, endDate, documents, members, technologyStack
            },
            { new: true });
        if (!updatedProject) {
            res.status(404).json({ message: 'Project not found.' })
        }
        res.status(200).json({ message: 'Project updated successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' })
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            res.status(404).json({ message: 'Project no found.' })
        }
        res.status(200).json({ message: 'Project deleted succesfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server errror' })
    }
}



module.exports = { addProject, listProjects, updateProject, deleteProject };  
