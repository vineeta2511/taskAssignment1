const express = require('express');
const multer = require('multer');
const {addTech} = require('../controllers/techController');

const techRouter =  express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });

const upload = multer({storage});
techRouter.post('/addtech',upload.single('image'),addTech);

module.exports = {techRouter};

