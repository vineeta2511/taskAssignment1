const express = require('express');
const techRouter = express.Router();

const { getTechController,getTechByIdController,addTechController,updateTechController,deleteTechContoller } = require('../controllers/technology/techController');
const multer = require('multer');
const Technology = require('../models/techModel');
const paginatedResults = require('../middlewares/pagination')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

techRouter.post('/addtech', upload.single('image'), addTechController);

techRouter.get('/viewtech',paginatedResults(Technology), getTechController);
techRouter.get('/tech/:id', getTechByIdController);

techRouter.put('/updatetech/:id', upload.single('image'), updateTechController);
techRouter.delete('/deletetech/:id', deleteTechContoller);

module.exports = techRouter;

