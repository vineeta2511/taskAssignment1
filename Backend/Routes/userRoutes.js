const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, getUser, getUsrById, currentUser } = require('../controllers/userController');

const {decodeToken} = require("../middlewares/jwt")

userRouter.post('/signup', signupUser);
userRouter.get('/view', getUser);
userRouter.get('/viewbyid', getUsrById)
userRouter.post('/login', loginUser);
//userRouter.get('/current', decodeToken, currentUser);
  
module.exports = userRouter;
