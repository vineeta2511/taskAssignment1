const { addProjects, listProjectsByRole, updateProjectById, deleteProjectById } = require('./projectServices')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vvineeta2511@gmail.com',
        pass: 'noprolhinjlueqwb',
    },
});


const addProjectController = async (req, res) => {
    try {

        const { role } = req.user;
        console.log('User Role:', role);

        if (role == 'mentor') {
            const projectData = req.body;
            const project = await addProjects(projectData);

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

            res.status(201).json({ Message: 'Project added Succesfully' });
        }
        else {
            return res.status(403).json({ Message: 'Only mentor can add projects.' })
        }
  
    } catch (error) {
        console.log("Error in adding a project.", error);
        res.status(500).json({ ErrorMessage: 'Internal server error' })
    }
};

const listProjectsController = async (req, res) => {
    try {
        const { role, _id, email } = req.user;
        console.log("user")

        const projects = await listProjectsByRole(role, _id, email);

        if (projects.length === 0) {
            let Message;
            if (role === 'mentor') {
                Message = 'You have not added any projects yet.';
            } else if (role === 'employee') {
                Message = 'You are not assigned to any projects.';
            }
            return res.status(200).json({ Message, projects });
        }
        res.status(200).json({ projects });

    }
    catch (error) {
        console.error("Error in listing Projects", error);
        res.status(500).json({ Message: 'Internal server error' });

    }
}

const updateProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const projectData = req.body;

        const updatedProject = await updateProjectById.findByIdAndUpdate(id, projectData);
        if (!updatedProject) {
            res.status(404).json({ Message: 'Project not found.' })
        }
        res.status(200).json({ Message: 'Project updated successfully' });

    } catch (error) {
        console.log("Error In updating in projects", error);
        res.status(500).json({ Message: 'Internal server error.' })
    }
};

const deleteProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await deleteProjectById(id);
        if (!deletedProject) {
            res.status(404).json({ Message: 'Project no found.' })
        }
        res.status(200).json({ Message: 'Project deleted succesfully' });
    }
    catch (error) {
        res.status(500).json({ Message: 'Internal server errror' })
    }
}



module.exports = { addProjectController,listProjectsController,updateProjectController,deleteProjectController };  
