const express = require('express');
const projectRouter = express.Router();
const { addProject,listProjects, updateProject, deleteProject } = require('../controllers/projectController');
const { decodeToken } = require('../middlewares/validateTokenHandler');

const paginatedResults = require('../middlewares/pagination');
const Project = require('../models/projectModel');

projectRouter.use(decodeToken);
projectRouter.post('/addproject',addProject);
projectRouter.get('/projects',paginatedResults(Project),listProjects)
projectRouter.put("/update/:id",updateProject)
projectRouter.delete("/delete/:id",deleteProject)

module.exports = projectRouter;       