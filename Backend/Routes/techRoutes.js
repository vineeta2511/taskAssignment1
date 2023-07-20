const express = require('express');
const techRouter = express.Router();
const multer = require('multer');
const { addTech, getTech, updateTech, deleteTech } = require('../controllers/techController');

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
techRouter.post('/addtech', upload.single('image'), addTech);
techRouter.get('/viewtech',paginatedResults(Technology), getTech);
techRouter.put('/updatetech/:id', upload.single('image'), updateTech);
techRouter.delete('/deltech/:id', deleteTech);
module.exports = techRouter;

