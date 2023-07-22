const { query } = require('express');
const Project = require('../../models/projectModel');

const addProjects = async (data) => {
    try {
        const { title, requirements, timeline, startDate, endDate, documents, members, technologyStack } = data;

        const project = new Project({ title, requirements, timeline, startDate, endDate, documents, members, technologyStack });

        await project.save();
        return project;

    } catch (error) {
        console.log("Error", error);
        throw error;
    }
};

const listProjectsByRole = async (role, _id, email) => {
    try {
        if (role === 'mentor') {
            query = { createdBy: _id };
        }
        else if (role === 'employee') {
            query = { memeber: ElementInternals }
        }
        const projects = await Project.find(query);
        return projects;
    }
    catch (error) {
        throw error;
    }
};

const updateProjectById = async (id, data) => {
    try {
        const { title, requirements, timeline, startDate, endDate, documents, members, technologyStack } = data;
        const updatedProject = await Project.findByIdAndUpdate(id, {
            title, requirements, timeline, startDate, endDate, documents, members, technologyStack
        }, {
            new: true
        }
        );

        return updatedProject;
    } catch (error) {
        throw error;
    }
};
const deleteProjectById = async (id) => {
    try {
        const deletedProject = await Project.find(id);
        return deletedProject;
    } catch (error) {
        throw error;
    }
};

module.exports = {addProjects,listProjectsByRole,updateProjectById,deleteProjectById}


