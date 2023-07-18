const express = require('express');
const { addProject,listProjects, updateProject, deleteProject } = require('../controllers/projectController');
const { decodeToken } = require('../middlewares/jwt');
const projectRouter = express.Router();

projectRouter.use(decodeToken);
projectRouter.post('/addproject',addProject);
projectRouter.get('/projects',listProjects)
projectRouter.put("/update/:id",updateProject)
projectRouter.delete("/delete/:id",deleteProject)

module.exports = projectRouter;       