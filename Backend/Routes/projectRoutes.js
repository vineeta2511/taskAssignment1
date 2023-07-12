const express = require('express');
const { addProject, listProjects } = require('../controllers/projectController');


const projectRouter = express.Router();

projectRouter.post('/addproject',addProject);
projectRouter.get('/projects',listProjects)

module.exports = projectRouter;