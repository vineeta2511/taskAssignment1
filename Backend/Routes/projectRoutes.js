const express = require('express');
const { addProject,listProjects } = require('../controllers/projectController');
const { decodeToken } = require('../middlewares/jwt');
const projectRouter = express.Router();

projectRouter.use(decodeToken);
projectRouter.post('/addproject',decodeToken,addProject);
projectRouter.get('/projects',listProjects)

module.exports = projectRouter;    