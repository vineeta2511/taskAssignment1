const express = require('express');
const projectRouter = express.Router();
const {addProjectController,listProjectsController,updateProjectController,deleteProjectController } = require('../controllers/project/projectController');
const verifyToken = require('../middlewares/validateTokenHandler');

const paginatedResults = require('../middlewares/pagination');
const Project = require('../models/projectModel');

projectRouter.use(verifyToken);
projectRouter.post('/addproject', addProjectController);
projectRouter.get('/projects', listProjectsController)
projectRouter.put("/update/:id", updateProjectController)
projectRouter.delete("/delete/:id", deleteProjectController)

module.exports = projectRouter;       